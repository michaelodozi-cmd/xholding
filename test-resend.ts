const RESEND_API_KEY = "re_Ttu3WETo_E4weet9XH7vUpaa4iXDQJphr";
const SENDER_EMAIL = "noreply@thefidelityholding.com";

const targetEmail = process.argv[2];

if (!targetEmail) {
  console.error("❌ Please provide a target email address to send the test email to!");
  console.error("Usage: npx tsx test-resend.ts <your-email@domain.com>");
  process.exit(1);
}

console.log(`📧 Sending test email from ${SENDER_EMAIL} to ${targetEmail}...`);

async function testEmail() {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: `Fidelity Holdings <${SENDER_EMAIL}>`,
        to: [targetEmail],
        subject: "Test Notification - Fidelity Holdings",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1a202c;">
            <h2 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 10px; margin-top: 0;">Test Email Successful! 🎉</h2>
            <p>Hello,</p>
            <p>This is a test email sent from your updated configuration using <strong>${SENDER_EMAIL}</strong>.</p>
            <p>If you are receiving this, your Resend API key and domain configuration are working correctly!</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="font-size: 13px; color: #718096; text-align: center;">Fidelity Holdings Automated System</p>
          </div>
        `
      })
    });

    const resText = await response.text();
    console.log(`\nStatus Code: ${response.status}`);
    console.log(`Response Body: ${resText}`);

    if (response.ok) {
      console.log("\n✅ Email sent successfully!");
    } else {
      console.error("\n❌ Failed to send email. See error response above.");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

testEmail();
