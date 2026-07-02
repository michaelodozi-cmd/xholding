import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    });
  }

  try {
    // 1. Verify Webhook Secret
    const requestSecret = req.headers.get("x-webhook-secret");
    const configuredSecret = Deno.env.get("WEBHOOK_SECRET") || "Fedility Holdings-webhook-secret-2026";
    
    if (requestSecret !== configuredSecret) {
      console.warn("Unauthorized request received. Secret did not match.");
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 2. Parse Payload
    const payload = await req.json();
    console.log("Received Webhook Payload:", JSON.stringify(payload));

    const { type, record, old_record } = payload;
    if (!record) {
      return new Response(JSON.stringify({ success: true, message: "No record provided" }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    const txType = record.type; // 'deposit' | 'withdrawal'
    const amount = record.amount;
    const asset = record.asset;
    const status = record.status; // 'pending' | 'approved' | 'rejected'
    const userEmail = record.user_email;

    if (!userEmail) {
      console.warn("No user email in transaction record. Skipping email notification.");
      return new Response(JSON.stringify({ success: true, message: "No user email found" }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    let subject = "";
    let html = "";
    let shouldSend = false;

    const formattedAmount = `$${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    if (type === 'INSERT') {
      if (txType === 'withdrawal') {
        shouldSend = true;
        subject = "Withdrawal Request Pending - Fedility Holdings";
        html = `
          <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1a202c;">
            <h2 style="color: #ea580c; border-bottom: 2px solid #ea580c; padding-bottom: 10px; margin-top: 0;">Withdrawal Request Submitted</h2>
            <p>Hello,</p>
            <p>Your withdrawal request for <strong>${formattedAmount} (${asset})</strong> has been received and is currently <strong>pending approval</strong>.</p>
            <p>Transaction details:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
              <tr style="background-color: #f7fafc;"><td style="padding: 10px; border: 1px solid #edf2f7; font-weight: bold; width: 40%;">Amount:</td><td style="padding: 10px; border: 1px solid #edf2f7;">${formattedAmount}</td></tr>
              <tr><td style="padding: 10px; border: 1px solid #edf2f7; font-weight: bold;">Asset:</td><td style="padding: 10px; border: 1px solid #edf2f7;">${asset}</td></tr>
              <tr style="background-color: #f7fafc;"><td style="padding: 10px; border: 1px solid #edf2f7; font-weight: bold;">Status:</td><td style="padding: 10px; border: 1px solid #edf2f7; color: #d97706; font-weight: bold;">PENDING APPROVAL</td></tr>
              <tr><td style="padding: 10px; border: 1px solid #edf2f7; font-weight: bold;">Time:</td><td style="padding: 10px; border: 1px solid #edf2f7;">${new Date().toUTCString()}</td></tr>
            </table>
            <p style="margin-bottom: 25px;">You will receive another email once your request has been processed.</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin-bottom: 20px;" />
            <p style="font-size: 13px; color: #718096; text-align: center; margin: 0;">This is an automated message from Fedility Holdings. Please do not reply directly to this email.</p>
          </div>
        `;
      } else if (txType === 'deposit') {
        shouldSend = true;
        if (['PROFIT', 'BONUS', 'ADJUSTMENT'].includes(asset)) {
          // Admin balance operation
          const actionName = asset === 'PROFIT' ? 'Profit Added' : asset === 'BONUS' ? 'Bonus Credited' : 'Account Balance Adjusted';
          subject = `${actionName} - Fedility Holdings`;
          html = `
            <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1a202c;">
              <h2 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 10px; margin-top: 0;">${actionName}</h2>
              <p>Hello,</p>
              <p>Your account has been credited with a new ${asset.toLowerCase()}.</p>
              <p>Details:</p>
              <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
                <tr style="background-color: #f7fafc;"><td style="padding: 10px; border: 1px solid #edf2f7; font-weight: bold; width: 40%;">Category:</td><td style="padding: 10px; border: 1px solid #edf2f7;">${asset}</td></tr>
                <tr><td style="padding: 10px; border: 1px solid #edf2f7; font-weight: bold;">Amount:</td><td style="padding: 10px; border: 1px solid #edf2f7; font-weight: bold; color: #10b981;">${formattedAmount}</td></tr>
                <tr style="background-color: #f7fafc;"><td style="padding: 10px; border: 1px solid #edf2f7; font-weight: bold;">Status:</td><td style="padding: 10px; border: 1px solid #edf2f7; color: #10b981; font-weight: bold;">APPROVED</td></tr>
                <tr><td style="padding: 10px; border: 1px solid #edf2f7; font-weight: bold;">Time:</td><td style="padding: 10px; border: 1px solid #edf2f7;">${new Date().toUTCString()}</td></tr>
              </table>
              <p style="margin-bottom: 25px;">The funds are immediately available in your balance.</p>
              <hr style="border: 0; border-top: 1px solid #e2e8f0; margin-bottom: 20px;" />
              <p style="font-size: 13px; color: #718096; text-align: center; margin: 0;">This is an automated message from Fedility Holdings. Please do not reply directly to this email.</p>
            </div>
          `;
        } else {
          // Standard crypto deposit
          subject = "Deposit Request Received - Fedility Holdings";
          html = `
            <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1a202c;">
              <h2 style="color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-top: 0;">Deposit Request Received</h2>
              <p>Hello,</p>
              <p>Your deposit request of <strong>${formattedAmount} (${asset})</strong> has been received and is currently <strong>pending verification</strong>.</p>
              <p>Transaction details:</p>
              <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
                <tr style="background-color: #f7fafc;"><td style="padding: 10px; border: 1px solid #edf2f7; font-weight: bold; width: 40%;">Amount:</td><td style="padding: 10px; border: 1px solid #edf2f7;">${formattedAmount}</td></tr>
                <tr><td style="padding: 10px; border: 1px solid #edf2f7; font-weight: bold;">Asset:</td><td style="padding: 10px; border: 1px solid #edf2f7;">${asset}</td></tr>
                <tr style="background-color: #f7fafc;"><td style="padding: 10px; border: 1px solid #edf2f7; font-weight: bold;">Status:</td><td style="padding: 10px; border: 1px solid #edf2f7; color: #d97706; font-weight: bold;">PENDING VERIFICATION</td></tr>
                <tr><td style="padding: 10px; border: 1px solid #edf2f7; font-weight: bold;">Time:</td><td style="padding: 10px; border: 1px solid #edf2f7;">${new Date().toUTCString()}</td></tr>
              </table>
              <p style="margin-bottom: 25px;">Once our team verifies the on-chain transaction hash, your account balance will be credited.</p>
              <hr style="border: 0; border-top: 1px solid #e2e8f0; margin-bottom: 20px;" />
              <p style="font-size: 13px; color: #718096; text-align: center; margin: 0;">This is an automated message from Fedility Holdings. Please do not reply directly to this email.</p>
            </div>
          `;
        }
      }
    } else if (type === 'UPDATE') {
      const oldStatus = old_record?.status;
      const newStatus = status;

      // Status change email (approved or rejected)
      if (oldStatus !== newStatus && (newStatus === 'approved' || newStatus === 'rejected')) {
        shouldSend = true;
        const capitalizedType = txType.charAt(0).toUpperCase() + txType.slice(1);
        const isApproved = newStatus === 'approved';
        const statusColor = isApproved ? "#10b981" : "#ef4444";
        const headerColor = isApproved ? "#10b981" : "#ef4444";
        
        subject = `${capitalizedType} Request ${isApproved ? 'Approved' : 'Rejected'} - Fedility Holdings`;
        html = `
          <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1a202c;">
            <h2 style="color: ${headerColor}; border-bottom: 2px solid ${headerColor}; padding-bottom: 10px; margin-top: 0;">${capitalizedType} Request ${isApproved ? 'Approved' : 'Rejected'}</h2>
            <p>Hello,</p>
            <p>Your <strong>${txType}</strong> request for <strong>${formattedAmount} (${asset})</strong> has been <strong>${newStatus}</strong>.</p>
            <p>Transaction details:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
              <tr style="background-color: #f7fafc;"><td style="padding: 10px; border: 1px solid #edf2f7; font-weight: bold; width: 40%;">Transaction Type:</td><td style="padding: 10px; border: 1px solid #edf2f7;">${capitalizedType}</td></tr>
              <tr><td style="padding: 10px; border: 1px solid #edf2f7; font-weight: bold;">Amount:</td><td style="padding: 10px; border: 1px solid #edf2f7;">${formattedAmount}</td></tr>
              <tr style="background-color: #f7fafc;"><td style="padding: 10px; border: 1px solid #edf2f7; font-weight: bold;">Asset:</td><td style="padding: 10px; border: 1px solid #edf2f7;">${asset}</td></tr>
              <tr><td style="padding: 10px; border: 1px solid #edf2f7; font-weight: bold;">Status:</td><td style="padding: 10px; border: 1px solid #edf2f7; color: ${statusColor}; font-weight: bold; text-transform: uppercase;">${newStatus}</td></tr>
              <tr style="background-color: #f7fafc;"><td style="padding: 10px; border: 1px solid #edf2f7; font-weight: bold;">Time:</td><td style="padding: 10px; border: 1px solid #edf2f7;">${new Date().toUTCString()}</td></tr>
            </table>
            <p style="margin-bottom: 25px;">
              ${isApproved 
                ? `The transaction was successfully executed and processed.` 
                : `If this was a withdrawal, your funds have been refunded to your account balance.`}
            </p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin-bottom: 20px;" />
            <p style="font-size: 13px; color: #718096; text-align: center; margin: 0;">This is an automated message from Fedility Holdings. Please do not reply directly to this email.</p>
          </div>
        `;
      }
    }

    // 3. Send via Resend or log to console
    if (shouldSend) {
      const resendApiKey = Deno.env.get("RESEND_API_KEY");
      const senderEmail = Deno.env.get("SENDER_EMAIL") || "onboarding@resend.dev";
      
      console.log(`Preparing notification email for ${userEmail} regarding: ${subject}`);
      
      if (!resendApiKey) {
        console.log("=== RESEND_API_KEY not set. Outputting email details to stdout ===");
        console.log(`To: ${userEmail}`);
        console.log(`Subject: ${subject}`);
        console.log(`HTML Body:\n${html}`);
        console.log("==================================================================");
      } else {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: `Fedility Holdings <${senderEmail}>`,
            to: [userEmail],
            subject: subject,
            html: html
          })
        });

        const resText = await response.text();
        console.log(`Resend response status: ${response.status}. Body: ${resText}`);
        if (!response.ok) {
          throw new Error(`Resend API request failed: ${resText}`);
        }
      }
    }

    return new Response(JSON.stringify({ success: true, emailed: shouldSend }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("Error running email edge function:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
});
