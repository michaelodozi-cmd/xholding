import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { 
  Users, DollarSign, Wallet, ShieldAlert, CheckCircle, XCircle, 
  Trash2, Ban, Edit, Settings, Activity, Search, Power, Clock,
  TrendingUp, Plus, ImageIcon, ToggleLeft, ToggleRight, Eye, X as XIcon, Menu, Copy, Sliders
} from "lucide-react";
import { useCryptoStore } from "../lib/crypto-store";
import { useTransactionStore } from "../lib/transaction-store";
import BalanceOpsTab from "../components/admin/BalanceOpsTab";
import UserPlansTab from "../components/admin/UserPlansTab";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../components/ui/dialog";

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate({ from: '/admin' });
  const [isChecking, setIsChecking] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate({ to: '/login' });
          return;
        }
        
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
          
        if (error || !profile || profile.role !== 'admin') {
          console.error("Access denied or profile error:", error);
          navigate({ to: '/dashboard' });
        } else {
          setIsChecking(false);
        }
      } catch (err) {
        console.error("Failed to check admin session:", err);
        navigate({ to: '/dashboard' });
      }
    };
    checkAdmin();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#13c74b] border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-gray-500 uppercase tracking-widest text-[11px] font-bold">Verifying Access...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-[#f0f4ff] font-['Inter'] flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-black border-b border-white/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-600/20 border border-red-500/50 flex items-center justify-center font-bold text-red-500 font-['Outfit'] text-sm">A</div>
          <span className="font-light text-lg tracking-[0.15em] text-white font-['Outfit'] uppercase">SuperAdmin</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white">
          {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen bg-black border-r border-white/5 p-6 z-50 flex flex-col transition-transform duration-300 w-64 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <Link to="/" className="hidden lg:flex items-center gap-3 mb-12">
          <div className="w-8 h-8 bg-red-600/20 border border-red-500/50 flex items-center justify-center font-bold text-red-500 font-['Outfit'] text-sm">A</div>
          <span className="font-light text-xl tracking-[0.15em] text-white font-['Outfit'] uppercase">SuperAdmin</span>
        </Link>
        <div className="flex flex-col gap-2 grow mt-4 lg:mt-0">
          <TabButton active={activeTab === 'overview'} onClick={() => {setActiveTab('overview'); setIsMobileMenuOpen(false);}} icon={Activity} label="Overview" />
          <TabButton active={activeTab === 'users'} onClick={() => {setActiveTab('users'); setIsMobileMenuOpen(false);}} icon={Users} label="Manage Users" />
          <TabButton active={activeTab === 'transactions'} onClick={() => {setActiveTab('transactions'); setIsMobileMenuOpen(false);}} icon={DollarSign} label="Transactions" />
          <TabButton active={activeTab === 'balance_ops'} onClick={() => {setActiveTab('balance_ops'); setIsMobileMenuOpen(false);}} icon={Sliders} label="Balance Ops" />
          <TabButton active={activeTab === 'wallets'} onClick={() => {setActiveTab('wallets'); setIsMobileMenuOpen(false);}} icon={Wallet} label="Platform Wallets" />
          <TabButton active={activeTab === 'plans'} onClick={() => {setActiveTab('plans'); setIsMobileMenuOpen(false);}} icon={TrendingUp} label="Investment Plans" />
          <TabButton active={activeTab === 'user_plans'} onClick={() => {setActiveTab('user_plans'); setIsMobileMenuOpen(false);}} icon={Users} label="Manage User Plans" />
          <TabButton active={activeTab === 'copy_trading'} onClick={() => {setActiveTab('copy_trading'); setIsMobileMenuOpen(false);}} icon={Copy} label="Copy Trading" />
          <TabButton active={activeTab === 'security'} onClick={() => {setActiveTab('security'); setIsMobileMenuOpen(false);}} icon={ShieldAlert} label="Security logs" />
        </div>
        <div className="mt-auto border-t border-white/5 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">SA</div>
              <div>
                <div className="text-[13px] font-medium text-white">System Admin</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">Level 5 Access</div>
              </div>
            </div>
            <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-2xl transition-colors" title="Logout">
              <Power className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12 w-full max-w-[1400px]">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'users' && <UsersTab />}
        {activeTab === 'transactions' && <TransactionsTab />}
        {activeTab === 'balance_ops' && <BalanceOpsTab />}
        {activeTab === 'wallets' && <WalletsTab />}
        {activeTab === 'plans' && <PlansTab />}
        {activeTab === 'user_plans' && <UserPlansTab />}
        {activeTab === 'copy_trading' && <CopyTradingTab />}
        {activeTab === 'security' && <SecurityTab />}
      </main>
    </div>
  );
}

// â”€â”€â”€ Investment Plans Tab â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

type Plan = {
  id: string;
  name: string;
  daily_roi: number;
  duration_days: number;
  min_amount: number;
  max_amount: number | null;
  is_active: boolean;
  image_url: string | null;
  description: string | null;
  created_at: string;
};

const EMPTY_PLAN: Omit<Plan, 'id' | 'created_at'> = {
  name: '',
  daily_roi: 1,
  duration_days: 30,
  min_amount: 100,
  max_amount: null,
  is_active: true,
  image_url: null,
  description: '',
};

function PlansTab() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [form, setForm] = useState({ ...EMPTY_PLAN });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchPlans = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('investment_plans')
      .select('*')
      .order('created_at', { ascending: true });
    if (data) setPlans(data as Plan[]);
    setLoading(false);
  };

  useEffect(() => { fetchPlans(); }, []);

  const openAdd = () => {
    setEditingPlan(null);
    setForm({ ...EMPTY_PLAN });
    setImageFile(null);
    setImagePreview(null);
    setError('');
    setIsModalOpen(true);
  };

  const openEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setForm({
      name: plan.name,
      daily_roi: plan.daily_roi,
      duration_days: plan.duration_days,
      min_amount: plan.min_amount,
      max_amount: plan.max_amount,
      is_active: plan.is_active,
      image_url: plan.image_url,
      description: plan.description,
    });
    setImageFile(null);
    setImagePreview(plan.image_url);
    setError('');
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const ext = file.name.split('.').pop();
    const path = `plan-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('plan-images').upload(path, file, { upsert: true });
    if (error) { setError('Image upload failed: ' + error.message); return null; }
    const { data } = supabase.storage.from('plan-images').getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSave = async () => {
    if (!form.name.trim()) { setError('Plan name is required.'); return; }
    if (form.daily_roi <= 0) { setError('Daily ROI must be greater than 0.'); return; }
    setSaving(true);
    setError('');

    let imageUrl = form.image_url;
    if (imageFile) {
      setUploading(true);
      imageUrl = await uploadImage(imageFile);
      setUploading(false);
      if (!imageUrl) { setSaving(false); return; }
    }

    const payload = {
      name: form.name.trim(),
      daily_roi: Number(form.daily_roi),
      duration_days: Number(form.duration_days),
      min_amount: Number(form.min_amount),
      max_amount: form.max_amount ? Number(form.max_amount) : null,
      is_active: form.is_active,
      image_url: imageUrl,
      description: form.description?.trim() || null,
    };

    if (editingPlan) {
      await supabase.from('investment_plans').update(payload).eq('id', editingPlan.id);
    } else {
      await supabase.from('investment_plans').insert(payload);
    }

    setSaving(false);
    setIsModalOpen(false);
    fetchPlans();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('investment_plans').delete().eq('id', id);
    fetchPlans();
  };

  const toggleActive = async (plan: Plan) => {
    await supabase.from('investment_plans').update({ is_active: !plan.is_active }).eq('id', plan.id);
    fetchPlans();
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl text-white font-light font-['Outfit']">Investment Plans</h1>
          <p className="text-[13px] text-gray-500 mt-1">Manage plans users can invest in, set ROI and upload plan images.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-6 py-3 bg-[#13c74b] text-[#070b14] text-[12px] font-bold uppercase tracking-widest rounded-2xl hover:bg-[#10a13c] transition-colors"
        >
          <Plus className="w-4 h-4" /> New Plan
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-500">Loading plans...</div>
      ) : plans.length === 0 ? (
        <div className="text-center py-16 border border-white/5 bg-[#131714] rounded-2xl">
          <TrendingUp className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500">No investment plans yet.</p>
          <button onClick={openAdd} className="mt-4 px-6 py-2 bg-[#13c74b] text-[#070b14] text-[12px] font-bold uppercase tracking-widest rounded-2xl hover:bg-[#10a13c]">
            Create First Plan
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {plans.map(plan => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onEdit={() => openEdit(plan)}
              onDelete={() => handleDelete(plan.id)}
              onToggle={() => toggleActive(plan)}
            />
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-[#131714] border border-white/5 text-white max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-['Outfit'] text-xl">
              {editingPlan ? 'Edit Plan' : 'New Investment Plan'}
            </DialogTitle>
            <DialogDescription className="text-gray-500 text-[12px]">
              Fill in the plan details. All fields except image and description are required.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Image Upload */}
            <div>
              <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-2 block">Plan Image</label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-black border border-white/5 rounded-2xl overflow-hidden flex items-center justify-center shrink-0">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-7 h-7 text-gray-600" />
                  )}
                </div>
                <label className="flex-1 cursor-pointer">
                  <div className="border border-dashed border-white/20 hover:border-[#13c74b]/50 rounded-2xl p-3 text-center transition-colors">
                    <p className="text-[12px] text-gray-400">Click to upload image</p>
                    <p className="text-[10px] text-gray-600 mt-1">PNG, JPG, WEBP â€“ max 5MB</p>
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1.5 block">Plan Name *</label>
              <input
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Gold Tier"
                className="w-full bg-black border border-white/5 p-3 rounded-2xl text-sm focus:outline-none focus:border-[#13c74b]/50 text-white"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1.5 block">Description</label>
              <textarea
                value={form.description || ''}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Short plan description..."
                rows={2}
                className="w-full bg-black border border-white/5 p-3 rounded-2xl text-sm focus:outline-none focus:border-[#13c74b]/50 text-white resize-none"
              />
            </div>

            {/* ROI + Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1.5 block">Daily ROI (%) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={form.daily_roi}
                  onChange={e => setForm(f => ({ ...f, daily_roi: Number(e.target.value) }))}
                  className="w-full bg-black border border-white/5 p-3 rounded-2xl text-sm focus:outline-none focus:border-[#13c74b]/50 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1.5 block">Duration (Days) *</label>
                <input
                  type="number"
                  min="1"
                  value={form.duration_days}
                  onChange={e => setForm(f => ({ ...f, duration_days: Number(e.target.value) }))}
                  className="w-full bg-black border border-white/5 p-3 rounded-2xl text-sm focus:outline-none focus:border-[#13c74b]/50 text-white font-mono"
                />
              </div>
            </div>

            {/* Min + Max */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1.5 block">Min Amount ($) *</label>
                <input
                  type="number"
                  min="0"
                  value={form.min_amount}
                  onChange={e => setForm(f => ({ ...f, min_amount: Number(e.target.value) }))}
                  className="w-full bg-black border border-white/5 p-3 rounded-2xl text-sm focus:outline-none focus:border-[#13c74b]/50 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1.5 block">Max Amount ($)</label>
                <input
                  type="number"
                  min="0"
                  value={form.max_amount ?? ''}
                  placeholder="No limit"
                  onChange={e => setForm(f => ({ ...f, max_amount: e.target.value ? Number(e.target.value) : null }))}
                  className="w-full bg-black border border-white/5 p-3 rounded-2xl text-sm focus:outline-none focus:border-[#13c74b]/50 text-white font-mono"
                />
              </div>
            </div>

            {/* Active Toggle */}
            <div className="flex items-center justify-between p-3 bg-black border border-white/5 rounded-2xl">
              <div>
                <div className="text-[13px] text-white font-medium">Active</div>
                <div className="text-[11px] text-gray-500">Visible to users on the platform</div>
              </div>
              <button
                type="button"
                onClick={() => setForm(f => ({ ...f, is_active: !f.is_active }))}
                className={`transition-colors ${form.is_active ? 'text-[#13c74b]' : 'text-gray-600'}`}
              >
                {form.is_active
                  ? <ToggleRight className="w-8 h-8" />
                  : <ToggleLeft className="w-8 h-8" />
                }
              </button>
            </div>

            {error && <p className="text-red-400 text-[12px] bg-red-500/10 border border-red-500/20 p-3 rounded-2xl">{error}</p>}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <button className="px-6 py-2 bg-transparent text-white hover:bg-white/5 rounded-full text-[12px] uppercase tracking-widest">Cancel</button>
            </DialogClose>
            <button
              onClick={handleSave}
              disabled={saving || uploading}
              className="px-6 py-2 bg-[#13c74b] text-black font-bold rounded-full hover:bg-[#10a13c] hover:bg-[#10a13c] disabled:opacity-50 transition-colors text-[12px] uppercase tracking-widest"
            >
              {uploading ? 'Uploading...' : saving ? 'Saving...' : editingPlan ? 'Update Plan' : 'Create Plan'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PlanCard({ plan, onEdit, onDelete, onToggle }: { plan: Plan; onEdit: () => void; onDelete: () => void; onToggle: () => void }) {
  const totalRoi = (plan.daily_roi * plan.duration_days).toFixed(1);

  return (
    <div className={`bg-[#131714] border ${plan.is_active ? 'border-[#13c74b]/30' : 'border-white/5'} rounded-2xl overflow-hidden group relative`}>
      {/* Image */}
      <div className="h-36 bg-black overflow-hidden relative">
        {plan.image_url ? (
          <img src={plan.image_url} alt={plan.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <TrendingUp className="w-10 h-10 text-gray-700" />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0f1c] to-transparent" />
        {/* Active badge */}
        <div className={`absolute top-3 right-3 px-2 py-0.5 rounded-2xl text-[9px] font-bold uppercase tracking-widest ${plan.is_active ? 'bg-[#13c74b]/20 text-[#13c74b] border border-[#13c74b]/30' : 'bg-white/5 text-gray-500 border border-white/5'}`}>
          {plan.is_active ? 'Active' : 'Inactive'}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-white font-['Outfit'] font-semibold text-lg leading-none mb-1">{plan.name}</h3>
        {plan.description && <p className="text-gray-500 text-[12px] mb-4 line-clamp-2">{plan.description}</p>}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-black border border-white/5 p-2.5 rounded-2xl text-center">
            <div className="text-[#13c74b] font-mono font-bold text-lg">{plan.daily_roi}%</div>
            <div className="text-[9px] text-gray-500 uppercase tracking-widest mt-0.5">Daily ROI</div>
          </div>
          <div className="bg-black border border-white/5 p-2.5 rounded-2xl text-center">
            <div className="text-white font-mono font-bold text-lg">{plan.duration_days}d</div>
            <div className="text-[9px] text-gray-500 uppercase tracking-widest mt-0.5">Duration</div>
          </div>
          <div className="bg-black border border-[#13c74b]/20 p-2.5 rounded-2xl text-center">
            <div className="text-[#13c74b] font-mono font-bold text-lg">{totalRoi}%</div>
            <div className="text-[9px] text-gray-500 uppercase tracking-widest mt-0.5">Total ROI</div>
          </div>
        </div>

        <div className="text-[11px] text-gray-500 mb-4">
          Min: <span className="text-white">${plan.min_amount.toLocaleString()}</span>
          {plan.max_amount && <> Â· Max: <span className="text-white">${plan.max_amount.toLocaleString()}</span></>}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white/5 hover:bg-white/10 text-white rounded-2xl text-[11px] uppercase tracking-widest font-bold transition-colors"
          >
            <Edit className="w-3.5 h-3.5" /> Edit
          </button>
          <button
            onClick={onToggle}
            title={plan.is_active ? 'Deactivate' : 'Activate'}
            className={`p-2 rounded-2xl transition-colors ${plan.is_active ? 'bg-orange-500/10 hover:bg-orange-500/20 text-orange-400' : 'bg-[#13c74b]/10 hover:bg-[#13c74b]/20 text-[#13c74b]'}`}
          >
            <Power className="w-4 h-4" />
          </button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="p-2 bg-red-900/20 hover:bg-red-900/40 text-red-500 rounded-2xl transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#131714] border border-white/5 text-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete "{plan.name}"?</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-400">
                  This will permanently remove this investment plan. Existing investments won't be affected.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-transparent border-white/5 text-white hover:bg-white/5">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete} className="bg-red-600 text-white hover:bg-red-700">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }: any) {
  return (
    <button 
      onClick={onClick} 
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors w-full text-left ${active ? 'bg-red-500/10 border-l-2 border-red-500 text-white' : 'text-gray-500 hover:text-white hover:bg-white/5 border-l-2 border-transparent'}`}
    >
      <Icon className={`w-5 h-5 ${active ? 'text-red-400' : ''}`} /> 
      <span className="text-[13px] font-medium tracking-wide">{label}</span>
    </button>
  );
}

function OverviewTab() {
  const [usersCount, setUsersCount] = useState(0);
  const [totalAUM, setTotalAUM] = useState(0);
  const { transactions } = useTransactionStore();

  useEffect(() => {
    const fetchStats = async () => {
      const { data: profiles } = await supabase.from('profiles').select('id, balance, role');
      const { data: investments } = await supabase.from('investments').select('amount, status');

      if (profiles) {
        setUsersCount(profiles.filter(p => p.role !== 'admin').length);
        const userBalances = profiles
          .filter(p => p.role !== 'admin')
          .reduce((acc, p) => acc + Number(p.balance || 0), 0);
        let investedAmount = 0;
        if (investments) {
          investedAmount = investments
            .filter(inv => inv.status === 'active')
            .reduce((acc, inv) => acc + Number(inv.amount || 0), 0);
        }
        setTotalAUM(userBalances + investedAmount);
      }
    };
    fetchStats();
  }, []);

  const pendingDeposits = transactions.filter(t => t.type === 'deposit' && t.status === 'pending');
  const pendingAmount = pendingDeposits.reduce((acc, t) => acc + Number(t.amount || 0), 0);
  const approvedDeposits = transactions.filter(t => t.type === 'deposit' && t.status === 'approved');
  const totalDepositedAmount = approvedDeposits.reduce((acc, t) => acc + Number(t.amount || 0), 0);

  const recentActivity = [...transactions]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 10);

  const formatTime = (timestamp: number) => {
    const mins = Math.floor((Date.now() - timestamp) / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
    return `${Math.floor(mins / 1440)}d ago`;
  };

  const getActivityLabel = (tx: any) => {
    const amt = `$${Number(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    const user = tx.userEmail || 'Unknown user';
    const asset = tx.asset || '';
    if (tx.type === 'deposit') return `Deposit of ${amt} ${asset} from ${user}`;
    if (tx.type === 'withdrawal') return `Withdrawal of ${amt} ${asset} by ${user}`;
    return `${tx.type} of ${amt} by ${user}`;
  };

  const getDotColor = (status: string) => {
    if (status === 'approved') return 'bg-[#13c74b]';
    if (status === 'pending') return 'bg-[#13c74b]';
    return 'bg-red-500';
  };

  const getBadgeStyle = (status: string) => {
    if (status === 'approved') return 'bg-[#13c74b]/10 text-[#13c74b]';
    if (status === 'pending') return 'bg-[#13c74b]/10 text-[#13c74b]';
    return 'bg-red-500/10 text-red-400';
  };

  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-2xl sm:text-3xl text-white font-light font-['Outfit'] mb-6 sm:mb-8">System Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <StatCard title="Total Users" value={usersCount.toString()} change="Registered accounts" />
        <StatCard
          title="Total AUM"
          value={`$${totalAUM.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          change="Managed by platform" color="text-[#13c74b]"
        />
        <StatCard
          title="Total Deposits"
          value={`$${totalDepositedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          change={`${approvedDeposits.length} approved`} color="text-[#13c74b]"
        />
        <StatCard title="Pending" value={pendingDeposits.length.toString()} change={`$${pendingAmount.toLocaleString()} pending`} color="text-[#13c74b]" />
      </div>

      {/* Recent Activity */}
      <div className="bg-[#131714] border border-white/5 rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[14px] text-white font-semibold uppercase tracking-widest">Recent Activity</h3>
          <span className="text-[11px] text-gray-500 uppercase tracking-widest">{recentActivity.length} events</span>
        </div>

        {recentActivity.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-[13px]">
            <Activity className="w-8 h-8 mx-auto mb-3 opacity-30" />
            No activity yet.
          </div>
        ) : (
          <div className="space-y-0">
            {recentActivity.map(tx => (
              <div key={tx.id} className="flex items-start gap-3 sm:gap-4 border-b border-white/5 py-3.5 last:border-0 last:pb-0 first:pt-0">
                <div className={`mt-[5px] w-2 h-2 rounded-full shrink-0 ${getDotColor(tx.status)}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-[13px] text-gray-200 wrap-break-word">{getActivityLabel(tx)}</span>
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-2xl ${getBadgeStyle(tx.status)}`}>
                      {tx.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-500 mt-0.5 uppercase tracking-wider">{tx.type}</div>
                </div>
                <div className="text-[11px] text-gray-500 whitespace-nowrap shrink-0 mt-0.5">
                  {formatTime(tx.timestamp)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



function StatCard({ title, value, change, color = "text-white" }: any) {
  return (
    <div className="bg-[#131714] border border-white/5 p-6 rounded-2xl">
      <div className="text-[11px] text-gray-500 uppercase tracking-widest font-semibold mb-2">{title}</div>
      <div className={`text-3xl font-light font-['Outfit'] mb-2 ${color}`}>{value}</div>
      <div className="text-[12px] text-gray-400">{change}</div>
    </div>
  );
}

function UsersTab() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();

    const channel = supabase
      .channel('profiles_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
        fetchUsers();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchUsers = async () => {
    const { data: profiles, error } = await supabase.from('profiles').select('*').order('role', { ascending: true });
    const { data: investments } = await supabase.from('investments').select('user_id, amount, daily_roi, created_at').eq('status', 'active');
    
    if (error) {
      console.error('Error fetching users:', error);
    }
    if (profiles) {
      const usersWithTotal = profiles.map(profile => {
        const userInvs = (investments || []).filter(inv => inv.user_id === profile.id);
        const roiEarned = userInvs.reduce((acc, inv) => {
          const daysPassed = Math.floor((Date.now() - new Date(inv.created_at).getTime()) / (1000 * 60 * 60 * 24));
          return acc + (inv.amount * inv.daily_roi * Math.max(0, daysPassed));
        }, 0);
        
        const totalBalance = Number(profile.balance || 0) + roiEarned + Number(profile.total_earned_referrals || 0);
        
        return {
          ...profile,
          totalBalance
        };
      });
      setUsers(usersWithTotal);
    }
    setLoading(false);
  };

  const makeAdmin = async (id: string) => {
    await supabase.from('profiles').update({ role: 'admin' }).eq('id', id);
    fetchUsers();
  };

  const handleEdit = async (id: string, newBalance: number) => {
    if (!isNaN(Number(newBalance))) {
      await supabase.from('profiles').update({ balance: Number(newBalance) }).eq('id', id);
      fetchUsers();
    }
  };

  const handleBan = async (id: string, newStatus: string) => {
    await supabase.from('profiles').update({ status: newStatus }).eq('id', id);
    fetchUsers();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('profiles').delete().eq('id', id);
    fetchUsers();
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header â€” stacks on mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl text-white font-light font-['Outfit']">User Management</h1>
        <div className="relative w-full sm:w-auto">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search email or ID..."
            className="w-full sm:w-64 bg-[#131714] border border-white/5 text-white pl-10 pr-4 py-2.5 rounded-2xl text-sm focus:outline-none focus:border-white/30"
          />
        </div>
      </div>

      {/* Table â€” horizontally scrollable on mobile */}
      <div className="bg-[#131714] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[640px] w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[11px] text-gray-500 uppercase tracking-widest">
                <th className="p-3 sm:p-4 font-semibold">User</th>
                <th className="p-3 sm:p-4 font-semibold">Balance</th>
                <th className="p-3 sm:p-4 font-semibold">Role</th>
                <th className="p-3 sm:p-4 font-semibold">Status</th>
                <th className="p-3 sm:p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">No users found.</td></tr>
              ) : (
                users.map(user => (
                  <UserRow
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    email={user.email}
                    balance={`$${Number(user.balance || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
                    totalBalance={`$${Number(user.totalBalance || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
                    rawBalance={Number(user.balance || 0)}
                    status={user.status || 'Active'}
                    role={user.role}
                    onMakeAdmin={() => makeAdmin(user.id)}
                    onEdit={(newBalance: number) => handleEdit(user.id, newBalance)}
                    onBan={() => handleBan(user.id, user.status || 'Active')}
                    onDelete={() => handleDelete(user.id)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function UserRow({ id, name, email, balance, totalBalance, rawBalance, status, role, onMakeAdmin, onEdit, onBan, onDelete }: any) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editBalance, setEditBalance] = useState(String(rawBalance));
  const [plansOpen, setPlansOpen] = useState(false);
  const [userPlans, setUserPlans] = useState<any[]>([]);
  const [userSubs, setUserSubs] = useState<any[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(false);

  useEffect(() => {
    setEditBalance(String(rawBalance));
  }, [rawBalance]);

  useEffect(() => {
    if (plansOpen) {
      const fetchPlans = async () => {
        setLoadingPlans(true);
        // Fetch standard investments
        const { data: p } = await supabase.from('investments').select('*, investment_plans(name)').eq('user_id', id).order('created_at', { ascending: false });
        setUserPlans(p || []);
        
        // Fetch copy trading subscriptions
        const { data: s } = await supabase.from('copy_trading_subscriptions').select('*, master_traders(name)').eq('user_id', id).order('created_at', { ascending: false });
        setUserSubs(s || []);
        
        setLoadingPlans(false);
      };
      fetchPlans();
    }
  }, [plansOpen, id]);

  const submitEdit = () => {
    onEdit(Number(editBalance));
    setIsEditOpen(false);
  };

  const handleWithdrawPlan = async (plan: any) => {
    if (plan.status !== 'active') return;
    await supabase.from('investments').update({ status: 'completed' }).eq('id', plan.id);
    const { data: profile } = await supabase.from('profiles').select('balance').eq('id', id).single();
    if (profile) {
      const newBal = Number(profile.balance || 0) + Number(plan.amount);
      await supabase.from('profiles').update({ balance: newBal }).eq('id', id);
      onEdit(newBal); // Optimistic UI update in parent table
    }
    // Refresh modal lists
    setUserPlans(userPlans.map(p => p.id === plan.id ? { ...p, status: 'completed' } : p));
  };

  const handleWithdrawSub = async (sub: any) => {
    if (sub.status !== 'active') return;
    await supabase.from('copy_trading_subscriptions').update({ status: 'withdrawn' }).eq('id', sub.id);
    const { data: profile } = await supabase.from('profiles').select('balance').eq('id', id).single();
    if (profile) {
      const newBal = Number(profile.balance || 0) + Number(sub.amount);
      await supabase.from('profiles').update({ balance: newBal }).eq('id', id);
      onEdit(newBal); 
    }
    setUserSubs(userSubs.map(s => s.id === sub.id ? { ...s, status: 'withdrawn' } : s));
  };

  return (
    <tr className="hover:bg-white/2 transition-colors">
      <td className="p-3 sm:p-4 max-w-[160px]">
        <div className="text-[13px] text-white font-medium truncate">{name || 'â€”'}</div>
        <div className="text-[11px] text-gray-500 truncate">{email}</div>
      </td>
      <td className="p-3 sm:p-4 text-[13px] font-mono whitespace-nowrap">
        <div className="text-white font-semibold">{totalBalance}</div>
        <div className="text-[10px] text-gray-500 mt-0.5" title="Base Wallet Balance">Wallet: {balance}</div>
      </td>
      <td className="p-3 sm:p-4">
        <span className={`px-2 py-1 rounded-2xl text-[10px] uppercase tracking-widest font-bold whitespace-nowrap ${role === 'admin' ? 'bg-purple-500/10 text-purple-400' : 'bg-gray-500/10 text-gray-400'}`}>
          {role}
        </span>
      </td>
      <td className="p-3 sm:p-4">
        <span className={`px-2 py-1 rounded-2xl text-[10px] uppercase tracking-widest font-bold whitespace-nowrap ${status === 'Active' ? 'bg-[#13c74b]/10 text-[#13c74b]' : status === 'Suspended' ? 'bg-red-500/10 text-red-500' : 'bg-[#13c74b]/10 text-[#13c74b]'}`}>
          {status}
        </span>
      </td>
      <td className="p-3 sm:p-4 text-right">
        <div className="flex justify-end gap-1.5 flex-wrap">

          {role !== 'admin' && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="px-3 py-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-2xl text-[11px] font-bold uppercase transition-colors mr-2">
                  Make Admin
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-[#131714] border border-white/5 text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Make {name} an Admin?</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-400">This will grant them full access to the admin dashboard.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-transparent border-white/5 text-white hover:bg-white/5">Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onMakeAdmin} className="bg-purple-500 text-white hover:bg-purple-600">Yes, Make Admin</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

        {/* View Plans Modal */}
        <Dialog open={plansOpen} onOpenChange={setPlansOpen}>
          <DialogTrigger asChild>
            <button className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-2xl transition-colors" title="View User Plans"><TrendingUp className="w-4 h-4" /></button>
          </DialogTrigger>
          <DialogContent className="bg-[#131714] border border-white/5 text-white max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Investments & Copy Trading for {name}</DialogTitle>
              <DialogDescription className="text-gray-400">View active plans and force withdrawals.</DialogDescription>
            </DialogHeader>
            <div className="py-2">
              {loadingPlans ? (
                <div className="text-center py-8 text-gray-500">Loading plans...</div>
              ) : (
                <div className="space-y-6">
                  {/* Standard Plans */}
                  <div>
                    <h3 className="text-[12px] font-bold text-white uppercase tracking-widest mb-3">Investment Plans</h3>
                    {userPlans.length === 0 ? <p className="text-gray-500 text-sm">No standard investments.</p> : (
                      <div className="space-y-2">
                        {userPlans.map(p => (
                          <div key={p.id} className="flex items-center justify-between bg-black border border-white/5 p-3 rounded-2xl">
                            <div>
                              <div className="text-sm font-semibold text-white">{p.investment_plans?.name || 'Unknown Plan'}</div>
                              <div className="text-xs text-gray-500 font-mono">${Number(p.amount).toLocaleString()}</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-2xl ${p.status === 'active' ? 'bg-[#13c74b]/10 text-[#13c74b]' : 'bg-gray-500/10 text-gray-400'}`}>{p.status}</span>
                              {p.status === 'active' && (
                                <button onClick={() => handleWithdrawPlan(p)} className="px-3 py-1 bg-red-500/10 text-red-400 text-xs rounded-2xl hover:bg-red-500/20 font-bold uppercase tracking-widest">Withdraw</button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Copy Trading */}
                  <div>
                    <h3 className="text-[12px] font-bold text-white uppercase tracking-widest mb-3">Copy Trading</h3>
                    {userSubs.length === 0 ? <p className="text-gray-500 text-sm">No copy trading subscriptions.</p> : (
                      <div className="space-y-2">
                        {userSubs.map(s => (
                          <div key={s.id} className="flex items-center justify-between bg-black border border-white/5 p-3 rounded-2xl">
                            <div>
                              <div className="text-sm font-semibold text-white">Copy: {s.master_traders?.name || 'Unknown Trader'}</div>
                              <div className="text-xs text-gray-500 font-mono">${Number(s.amount).toLocaleString()}</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-2xl ${s.status === 'active' ? 'bg-[#13c74b]/10 text-[#13c74b]' : 'bg-gray-500/10 text-gray-400'}`}>{s.status}</span>
                              {s.status === 'active' && (
                                <button onClick={() => handleWithdrawSub(s)} className="px-3 py-1 bg-red-500/10 text-red-400 text-xs rounded-2xl hover:bg-red-500/20 font-bold uppercase tracking-widest">Withdraw</button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogTrigger asChild>
            <button className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-colors" title="Edit Balance"><Edit className="w-4 h-4" /></button>
          </DialogTrigger>
          <DialogContent className="bg-[#131714] border border-white/5 text-white">
            <DialogHeader>
              <DialogTitle>Edit Balance for {name}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2 block">New Balance</label>
              <input type="number" value={editBalance} onChange={e => setEditBalance(e.target.value)} className="w-full bg-black border border-white/5 p-3 rounded-2xl text-sm focus:outline-none focus:border-[#13c74b]/50 text-white font-mono" />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <button className="px-6 py-2 bg-transparent text-white hover:bg-white/5 rounded-full">Cancel</button>
              </DialogClose>
              <button onClick={submitEdit} className="px-6 py-2 bg-[#13c74b] text-black font-bold rounded-full hover:bg-[#10a13c] hover:bg-[#10a13c] transition-colors">
                Save
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="p-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-2xl transition-colors" title={status === 'Suspended' ? 'Unban User' : 'Ban User'}><Ban className="w-4 h-4" /></button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-[#131714] border border-white/5 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>{status === 'Suspended' ? 'Unban' : 'Ban'} {name}?</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-400">
                Are you sure you want to {status === 'Suspended' ? 'unban' : 'ban'} this user?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-transparent border-white/5 text-white hover:bg-white/5">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onBan(status === 'Suspended' ? 'Active' : 'Suspended')} className="bg-orange-500 text-white hover:bg-orange-600">{status === 'Suspended' ? 'Unban' : 'Ban'}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="p-2 bg-red-900/20 hover:bg-red-900/40 text-red-600 rounded-2xl transition-colors" title="Delete User"><Trash2 className="w-4 h-4" /></button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-[#131714] border border-white/5 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete {name}?</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-400">
                WARNING: Are you sure you want to completely delete this user profile? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-transparent border-white/5 text-white hover:bg-white/5">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} className="bg-red-600 text-white hover:bg-red-700">Delete Permanently</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </div>
      </td>
    </tr>
  );
}

function TransactionsTab() {
  const { transactions } = useTransactionStore();
  const pendingTxs = transactions.filter(t => t.status === 'pending');

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl text-white font-light font-['Outfit']">Pending Approvals</h1>
      </div>
      
      <div className="space-y-4">
        {pendingTxs.length === 0 ? (
          <div className="text-center py-12 text-gray-500 border border-white/5 bg-[#131714] rounded-2xl">No pending transactions.</div>
        ) : (
          pendingTxs.map(tx => (
            <TransactionCard key={tx.id} tx={tx} />
          ))
        )}
      </div>
    </div>
  );
}

function TransactionCard({ tx }: { tx: any }) {
  const { updateStatus } = useTransactionStore();
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [usdValue, setUsdValue] = useState('');
  const [sentTxid, setSentTxid] = useState('');
  const [copied, setCopied] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Helper: fire a background push to the user's phone
  const sendPushToUser = async (title: string, body: string, tag: string) => {
    try {
      // Get the user_id from the transaction's user email
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', tx.userEmail)
        .single();
      if (!profile) return;

      await supabase.functions.invoke('send-push-notification', {
        body: { user_id: profile.id, title, body, tag },
      });
    } catch (err) {
      console.error('[Admin Push]', err);
    }
  };

  const handleApprove = async () => {
    const amt = `$${Number(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })} ${tx.asset || ''}`;
    if (tx.type === 'deposit') {
      updateStatus(tx.id, 'approved', tx.amount);
      await sendPushToUser(
        'âœ… Deposit Approved â€” Fedility Holding',
        `Your deposit of ${amt} has been credited to your account.`,
        'deposit-approved'
      );
    } else {
      if (sentTxid) {
        await supabase.from('transactions').update({ txid: sentTxid }).eq('id', tx.id);
      }
      updateStatus(tx.id, 'approved');
      await sendPushToUser(
        'ðŸ’¸ Withdrawal Sent â€” Fedility Holding',
        `Your withdrawal of ${amt} has been processed and sent.`,
        'withdrawal-approved'
      );
    }
    setIsApproveOpen(false);
  };

  const handleReject = async () => {
    const amt = `$${Number(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })} ${tx.asset || ''}`;
    updateStatus(tx.id, 'rejected');
    await sendPushToUser(
      `âŒ ${tx.type === 'deposit' ? 'Deposit' : 'Withdrawal'} Rejected â€” Fedility Holding`,
      `Your ${tx.type} of ${amt} was not approved. Please contact support.`,
      `${tx.type}-rejected`
    );
  };

  const handleCopy = (text: string) => {
    if (text) navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  const timeAgo = Math.floor((Date.now() - tx.timestamp) / 60000);
  const timeStr = timeAgo < 60 ? `${timeAgo} mins ago` : `${Math.floor(timeAgo/60)} hours ago`;

  return (
    <div className="relative">
    {/* Screenshot Lightbox */}
    {lightboxOpen && tx.screenshotUrl && (
      <div
        className="fixed inset-0 z-200 bg-black/90 flex items-center justify-center p-4"
        onClick={() => setLightboxOpen(false)}
      >
        <button
          className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
          onClick={() => setLightboxOpen(false)}
        >
          <XIcon className="w-5 h-5" />
        </button>
        <img
          src={tx.screenshotUrl}
          alt="Deposit proof"
          className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
          onClick={e => e.stopPropagation()}
        />
      </div>
    )}

    <div className="bg-[#131714] border border-[#13c74b]/30 rounded-2xl overflow-hidden">
      {/* Screenshot strip - visible only for deposits with a screenshot */}
      {tx.screenshotUrl && tx.type === 'deposit' && (
        <div
          className="relative h-32 bg-black overflow-hidden cursor-pointer group"
          onClick={() => setLightboxOpen(true)}
        >
          <img
            src={tx.screenshotUrl}
            alt="Deposit proof screenshot"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-2 left-3 flex items-center gap-1.5 text-[10px] text-white/70 font-bold uppercase tracking-widest">
            <Eye className="w-3 h-3" /> Deposit Proof - Click to enlarge
          </div>
        </div>
      )}

      <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <div className="text-[10px] text-[#13c74b] uppercase tracking-widest font-bold mb-2">{tx.type} Pending</div>
        <div className="flex items-center gap-4 mb-2">
          <span className="text-2xl text-white font-light">{tx.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 6})}</span>
          <span className="text-[11px] font-bold tracking-widest bg-white/10 px-2 py-1 uppercase rounded-2xl text-gray-300">{tx.asset}</span>
        </div>
        <div className="text-[13px] text-gray-400 mb-1">From: <span className="text-white font-medium">{tx.userEmail}</span></div>
        <div className="text-[13px] text-gray-400">TXID: <span className="font-mono text-white text-[12px]">{tx.txid || 'N/A'}</span></div>
        {!tx.screenshotUrl && tx.type === 'deposit' && (
          <div className="mt-2 text-[11px] text-orange-400/70 flex items-center gap-1">
            <ImageIcon className="w-3 h-3" /> No screenshot submitted
          </div>
        )}
        <div className="text-[11px] text-gray-500 mt-3 flex items-center gap-2"><Clock className="w-3 h-3" /> Submitted {timeStr}</div>
      </div>
      <div className="flex flex-col gap-3">
        <Dialog open={isApproveOpen} onOpenChange={setIsApproveOpen}>
          <DialogTrigger asChild>
            <button className="px-8 py-3 bg-[#13c74b] hover:bg-[#10a13c] text-[#070b14] font-bold text-[12px] uppercase tracking-widest rounded-2xl transition-colors flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" /> Approve
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#131714] border border-white/5 text-white p-0 overflow-hidden max-w-md">
            <div className="h-1.5 w-full bg-linear-to-r from-[#13c74b] to-[#00f5c8]" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#13c74b]/15 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-[#13c74b]" />
                </div>
                <div>
                  <h2 className="text-lg font-['Outfit'] font-semibold text-white capitalize">Approve {tx.type}</h2>
                  <p className="text-[12px] text-gray-500 uppercase tracking-widest">{tx.type === 'deposit' ? 'Credit user balance' : 'Send funds to user'}</p>
                </div>
              </div>

              <div className="bg-black border border-white/5 rounded-2xl p-4 mb-5 space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-gray-500 uppercase tracking-widest">Amount</span>
                  <span className="text-white font-mono font-semibold">{tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} {tx.asset}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-gray-500 uppercase tracking-widest">User</span>
                  <span className="text-[13px] text-gray-300 truncate max-w-[200px]">{tx.userEmail}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-gray-500 uppercase tracking-widest">TXID</span>
                  <span className="text-[12px] text-gray-400 font-mono">{tx.txid ? tx.txid.substring(0, 16) + '...' : 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-gray-500 uppercase tracking-widest">Submitted</span>
                  <span className="text-[12px] text-gray-400">{timeStr}</span>
                </div>
              </div>

              {/* Screenshot preview inside modal */}
              {tx.screenshotUrl && tx.type === 'deposit' && (
                <div className="mb-5">
                  <label className="text-[11px] text-gray-400 uppercase tracking-widest font-bold mb-2 flex items-center gap-1.5"><Eye className="w-3 h-3" /> Deposit Screenshot</label>
                  <div
                    className="relative rounded-2xl overflow-hidden cursor-pointer group border border-white/5"
                    onClick={() => setLightboxOpen(true)}
                  >
                    <img
                      src={tx.screenshotUrl}
                      alt="Deposit proof"
                      className="w-full max-h-40 object-cover group-hover:opacity-90 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              )}

              {tx.type === 'deposit' && (
                <div className="mb-5 bg-[#13c74b]/10 border border-[#13c74b]/20 p-4 rounded-2xl">
                  <p className="text-[14px] text-[#13c74b] font-medium text-center">
                    Have you confirmed that payment has been received in your account?
                  </p>
                  <p className="text-[11px] text-gray-400 text-center mt-2">
                    Clicking Confirm Approval will instantly credit ${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} to the user's balance.
                  </p>
                </div>
              )}

              {tx.type === 'withdrawal' && (
                <div className="mb-5 space-y-4">
                  <div>
                    <label className="text-[11px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">User's Receiving Address</label>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-black border border-white/5 text-gray-300 p-3 rounded-2xl text-[12px] font-mono truncate">{tx.txid || 'No address provided'}</div>
                      <button onClick={() => handleCopy(tx.txid)} className="px-4 bg-[#13c74b]/10 hover:bg-[#13c74b]/20 border border-[#13c74b]/30 text-[#13c74b] rounded-2xl text-[11px] uppercase tracking-widest font-bold transition-colors whitespace-nowrap">
                        {copied ? 'âœ“ Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Sent TXID <span className="text-gray-600 normal-case tracking-normal font-normal">(optional)</span></label>
                    <input type="text" value={sentTxid} onChange={e => setSentTxid(e.target.value)} placeholder="Paste transaction hash after sending..."
                      className="w-full bg-black border border-white/5 focus:border-[#13c74b]/50 p-3 rounded-2xl text-[12px] focus:outline-none text-white font-mono transition-colors" />
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <DialogClose asChild>
                  <button className="flex-1 py-3 text-[12px] uppercase tracking-widest font-bold bg-white/5 hover:bg-white/10 text-gray-300 rounded-2xl transition-colors">Cancel</button>
                </DialogClose>
                <button onClick={handleApprove}
                  className="flex-1 py-3 text-[12px] uppercase tracking-widest font-bold bg-[#13c74b] hover:bg-[#10a13c] text-[#070b14] rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  âœ“ Confirm Approval
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="px-8 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-[12px] uppercase tracking-widest border border-red-500/30 rounded-2xl transition-colors flex items-center justify-center gap-2">
              <XCircle className="w-4 h-4" /> Reject
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-[#131714] border border-white/5 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Reject {tx.type}</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-400">
                Are you sure you want to reject this {tx.type}? The user will not receive these funds.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-transparent border-white/5 text-white hover:bg-white/5 hover:text-white">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => updateStatus(tx.id, 'rejected')} className="bg-red-500 text-white hover:bg-red-600">
                Yes, Reject
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      </div>
    </div>
    </div>
  );
}

function WalletsTab() {
  const { cryptos, addCrypto } = useCryptoStore();
  const [isOpen, setIsOpen] = useState(false);
  const [symbol, setSymbol] = useState('');
  const [name, setName] = useState('');
  const [network, setNetwork] = useState('Native');
  const [address, setAddress] = useState('');

  const handleAdd = () => {
    if (!symbol || !name || !network || !address) return;
    addCrypto({
      id: symbol.toLowerCase(),
      name,
      symbol: symbol.toUpperCase(),
      color: '#13c74b',
      address,
      network,
      active: true
    } as any);
    setIsOpen(false);
    setSymbol(''); setName(''); setNetwork('Native'); setAddress('');
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl text-white font-light font-['Outfit']">Platform Wallets</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button className="px-6 py-3 bg-[#13c74b] text-black text-[12px] font-bold uppercase tracking-widest rounded-full hover:bg-[#10a13c] hover:bg-gray-200 transition-colors">
              + Add New Wallet
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#131714] border border-white/5 text-white">
            <DialogHeader>
              <DialogTitle>Add New Wallet</DialogTitle>
              <DialogDescription className="text-gray-400">
                Enter the details for the new platform wallet.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Symbol</label>
                <input value={symbol} onChange={e => setSymbol(e.target.value)} placeholder="e.g. BTC" className="w-full bg-black border border-white/5 p-3 rounded-2xl text-sm focus:outline-none focus:border-[#13c74b]/50 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Name</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Bitcoin" className="w-full bg-black border border-white/5 p-3 rounded-2xl text-sm focus:outline-none focus:border-[#13c74b]/50 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Network</label>
                <input value={network} onChange={e => setNetwork(e.target.value)} placeholder="e.g. Native" className="w-full bg-black border border-white/5 p-3 rounded-2xl text-sm focus:outline-none focus:border-[#13c74b]/50 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Wallet Address</label>
                <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Enter wallet address" className="w-full bg-black border border-white/5 p-3 rounded-2xl text-sm focus:outline-none focus:border-[#13c74b]/50 text-white font-mono" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <button className="px-6 py-2 bg-transparent text-white hover:bg-white/5 rounded-full">Cancel</button>
              </DialogClose>
              <button onClick={handleAdd} disabled={!symbol || !name || !network || !address} className="px-6 py-2 bg-[#13c74b] text-black font-bold rounded-full hover:bg-[#10a13c] hover:bg-[#10a13c] disabled:opacity-50 transition-colors">
                Save Wallet
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cryptos.map(crypto => (
          <WalletCard key={crypto.id} crypto={crypto} />
        ))}
      </div>
    </div>
  );
}

function WalletCard({ crypto }: { crypto: any }) {
  const { toggleActive, removeCrypto, updateAddress } = useCryptoStore();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editAddress, setEditAddress] = useState(crypto.address || '');

  const handleEdit = () => {
    if (editAddress && editAddress !== crypto.address) {
      updateAddress(crypto.id, editAddress);
    }
    setIsEditOpen(false);
  };

  return (
    <div className={`bg-[#131714] border ${crypto.active ? 'border-white/20' : 'border-white/5'} p-6 rounded-2xl relative overflow-hidden group`}>
      {!crypto.active && <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center backdrop-blur-[1px] pointer-events-none"><span className="text-[11px] font-bold tracking-widest uppercase bg-black px-3 py-1 rounded-2xl border border-white/5 text-gray-400">Inactive</span></div>}
      
      <div className="flex justify-between items-start mb-6 relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center text-[12px] font-bold" style={{ backgroundColor: `${crypto.color}15`, color: crypto.color }}>
            {crypto.symbol.substring(0,1)}
          </div>
          <div>
            <h3 className="text-lg text-white font-['Outfit'] leading-none mb-1">{crypto.name} <span className="text-sm text-gray-500">({crypto.symbol})</span></h3>
            <div className="text-[11px] text-gray-500 uppercase tracking-widest">{crypto.network}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => toggleActive(crypto.id)} title={crypto.active ? "Deactivate" : "Activate"} className={`transition-colors p-2 rounded-2xl ${crypto.active ? 'text-gray-500 hover:text-orange-400 bg-white/5 hover:bg-orange-500/10' : 'text-white hover:text-green-400 bg-white/10 hover:bg-green-500/20'}`}><Power className="w-4 h-4" /></button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="text-red-400 hover:text-red-300 transition-colors bg-red-500/10 p-2 rounded-2xl"><Trash2 className="w-4 h-4" /></button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#131714] border border-white/5 text-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete {crypto.symbol}?</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-400">
                  Are you sure you want to permanently remove {crypto.name} from the platform wallets? Users will no longer see this as a deposit option.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-transparent border-white/5 text-white hover:bg-white/5 hover:text-white">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => removeCrypto(crypto.id)} className="bg-red-500 text-white hover:bg-red-600">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="bg-black border border-white/5 p-3 rounded-2xl flex items-center justify-between relative z-20">
        <code className="text-[13px] text-gray-300 truncate mr-4">{crypto.address || 'No address set'}</code>
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogTrigger asChild>
            <button className="text-[#13c74b] text-[11px] uppercase tracking-widest font-bold hover:underline shrink-0">Edit Address</button>
          </DialogTrigger>
          <DialogContent className="bg-[#131714] border border-white/5 text-white">
            <DialogHeader>
              <DialogTitle>Update {crypto.symbol} Address</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2 block">Wallet Address</label>
              <input value={editAddress} onChange={e => setEditAddress(e.target.value)} className="w-full bg-black border border-white/5 p-3 rounded-2xl text-sm focus:outline-none focus:border-[#13c74b]/50 text-white font-mono" />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <button className="px-6 py-2 bg-transparent text-white hover:bg-white/5 rounded-full">Cancel</button>
              </DialogClose>
              <button onClick={handleEdit} className="px-6 py-2 bg-[#13c74b] text-black font-bold rounded-full hover:bg-[#10a13c] hover:bg-[#10a13c] transition-colors">
                Update
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function SecurityTab() {
  const [settings, setSettings] = useState({ maintenance_mode: false, withdrawals_halted: false, lock_withdrawals_until_maturity: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from('platform_settings').select('*').eq('id', 1).single();
      if (data) setSettings(data);
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const toggleMaintenance = async () => {
    const newVal = !settings.maintenance_mode;
    await supabase.from('platform_settings').update({ maintenance_mode: newVal }).eq('id', 1);
    setSettings(prev => ({ ...prev, maintenance_mode: newVal }));
  };

  const toggleWithdrawals = async () => {
    const newVal = !settings.withdrawals_halted;
    await supabase.from('platform_settings').update({ withdrawals_halted: newVal }).eq('id', 1);
    setSettings(prev => ({ ...prev, withdrawals_halted: newVal }));
  };

  const toggleWithdrawalLock = async () => {
    const newVal = !settings.lock_withdrawals_until_maturity;
    await supabase.from('platform_settings').update({ lock_withdrawals_until_maturity: newVal }).eq('id', 1);
    setSettings(prev => ({ ...prev, lock_withdrawals_until_maturity: newVal }));
  };

  const handleWipe = async () => {
    await supabase.rpc('wipe_database');
    window.location.reload();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="animate-in fade-in duration-500 max-w-3xl">
      <h1 className="text-3xl text-white font-light font-['Outfit'] mb-8">SuperAdmin Settings</h1>
      
      <div className="space-y-6">

        {/* Investment Withdrawal Controls */}
        <div className="p-6 bg-[#131714] border border-white/5 rounded-2xl">
          <h3 className="text-lg text-white font-['Outfit'] mb-1 flex items-center gap-2">
            <svg className="w-5 h-5 text-[#13c74b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
            Investment &amp; Withdrawal Controls
          </h3>
          <p className="text-[13px] text-gray-500 mb-6">Control how withdrawals interact with active investment plans.</p>

          <div className="space-y-4">
            <div className="flex items-start justify-between p-4 bg-black border border-white/5 rounded-2xl gap-4">
              <div className="flex-1">
                <div className="text-[14px] text-white font-semibold mb-1">Lock Withdrawals Until Plan Maturity</div>
                <div className="text-[12px] text-gray-400 leading-relaxed">When enabled, users with an <span className="text-[#13c74b] font-semibold">active investment plan</span> that has NOT yet reached its maturity date will be blocked from making any withdrawal. They can only withdraw once all their plans have fully completed their investment duration.</div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className={`shrink-0 px-6 py-2 text-[11px] uppercase tracking-widest font-bold rounded-2xl border transition-colors ${settings.lock_withdrawals_until_maturity ? 'bg-[#13c74b]/10 text-[#13c74b] border-[#13c74b]/20 hover:bg-[#13c74b]/20' : 'bg-white/5 hover:bg-white/10 text-white border-white/5'}`}>
                    {settings.lock_withdrawals_until_maturity ? 'Enabled' : 'Disabled'}
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-[#131714] border border-white/5 text-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle>{settings.lock_withdrawals_until_maturity ? 'Disable' : 'Enable'} Investment Withdrawal Lock?</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                      {settings.lock_withdrawals_until_maturity
                        ? 'Users will be able to withdraw at any time regardless of active investment plans.'
                        : 'Users with active, non-matured investment plans will be blocked from withdrawing until their plan duration is complete.'}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-transparent border-white/5 text-white hover:bg-white/5">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={toggleWithdrawalLock} className={settings.lock_withdrawals_until_maturity ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-[#13c74b] text-black hover:bg-[#10a13c]'}>Confirm</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>

        <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl">
          <h3 className="text-lg text-red-400 font-['Outfit'] mb-2 flex items-center gap-2"><ShieldAlert className="w-5 h-5" /> Danger Zone</h3>
          <p className="text-[13px] text-gray-400 mb-6">These actions affect the entire platform. Proceed with extreme caution.</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-black border border-white/5 rounded-2xl">
              <div>
                <div className="text-[14px] text-white font-semibold">Maintenance Mode</div>
                <div className="text-[12px] text-gray-500">Disable all user logins and trading</div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className={`px-6 py-2 text-[11px] uppercase tracking-widest font-bold rounded-2xl border transition-colors ${settings.maintenance_mode ? 'bg-[#13c74b]/10 text-[#13c74b] border-[#13c74b]/20 hover:bg-[#13c74b]/20' : 'bg-white/5 hover:bg-white/10 text-white border-white/5'}`}>
                    {settings.maintenance_mode ? 'Disable' : 'Enable'}
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-[#131714] border border-white/5 text-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle>{settings.maintenance_mode ? 'Disable' : 'Enable'} Maintenance Mode?</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                      {settings.maintenance_mode ? 'This will allow users to log in and trade normally again.' : 'This will prevent all non-admin users from logging in or making transactions.'}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-transparent border-white/5 text-white hover:bg-white/5">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={toggleMaintenance} className="bg-red-600 text-white hover:bg-red-700">Confirm</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-black border border-white/5 rounded-2xl">
              <div>
                <div className="text-[14px] text-white font-semibold">Halt Withdrawals</div>
                <div className="text-[12px] text-gray-500">Temporarily suspend all outgoing transactions</div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className={`px-6 py-2 text-[11px] uppercase tracking-widest font-bold rounded-2xl border transition-colors ${settings.withdrawals_halted ? 'bg-[#13c74b]/10 text-[#13c74b] border-[#13c74b]/20 hover:bg-[#13c74b]/20' : 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20'}`}>
                    {settings.withdrawals_halted ? 'Resume' : 'Halt'}
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-[#131714] border border-white/5 text-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle>{settings.withdrawals_halted ? 'Resume' : 'Halt'} Withdrawals?</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                      {settings.withdrawals_halted ? 'This will allow users to submit withdrawal requests again.' : 'This will prevent users from submitting any new withdrawal requests.'}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-transparent border-white/5 text-white hover:bg-white/5">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={toggleWithdrawals} className="bg-red-600 text-white hover:bg-red-700">Confirm</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-black border border-white/5 rounded-2xl">
              <div>
                <div className="text-[14px] text-white font-semibold">Wipe Database</div>
                <div className="text-[12px] text-gray-500">Delete all users, transactions, and wallets</div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="px-6 py-2 bg-red-900/40 hover:bg-red-900/60 text-red-200 text-[11px] uppercase tracking-widest font-bold rounded-2xl border border-red-500 transition-colors">Wipe All</button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-[#131714] border border-red-500/50 text-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-red-500">EXTREME DANGER: Wipe Database?</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-300">
                      This will permanently delete ALL users (except admins), ALL transactions, ALL investments, and ALL wallets. This action cannot be undone. Are you absolutely sure?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-transparent border-white/5 text-white hover:bg-white/5">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleWipe} className="bg-red-600 text-white font-bold hover:bg-red-700">Yes, Destroy Everything</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// â”€â”€â”€ Copy Trading Tab â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

type MasterTrader = {
  id: string;
  name: string;
  description: string | null;
  avatar_url: string | null;
  win_rate: number;
  total_pnl: number;
  roi: number;
  followers_count: number;
  is_active: boolean;
  daily_trades_min: number;
  daily_trades_max: number;
  created_at: string;
};

const EMPTY_TRADER: Omit<MasterTrader, 'id' | 'created_at'> = {
  name: '',
  description: '',
  avatar_url: null,
  win_rate: 85,
  total_pnl: 0,
  roi: 0,
  followers_count: 0,
  is_active: true,
  daily_trades_min: 2,
  daily_trades_max: 5,
};

function CopyTradingTab() {
  const [traders, setTraders] = useState<MasterTrader[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrader, setEditingTrader] = useState<MasterTrader | null>(null);
  const [form, setForm] = useState({ ...EMPTY_TRADER });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Simulate trades state
  const [isSimulateOpen, setIsSimulateOpen] = useState(false);
  const [simTrader, setSimTrader] = useState<MasterTrader | null>(null);
  const [simDays, setSimDays] = useState(1);
  const [simulating, setSimulating] = useState(false);
  const [simResult, setSimResult] = useState<{ trades: number; pnl: number; winRate: number } | null>(null);

  // Followers state
  const [isFollowersOpen, setIsFollowersOpen] = useState(false);
  const [selectedTraderFollowers, setSelectedTraderFollowers] = useState<any[]>([]);
  const [loadingFollowers, setLoadingFollowers] = useState(false);

  const fetchTraders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('master_traders')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error) {
      console.error("Master traders table might not exist yet:", error);
      // Fallback for UI mockup when DB isn't ready
      setTraders([
        {
          id: 'mock-1', name: 'Crypto King', description: 'High frequency scalping on majors', avatar_url: null,
          win_rate: 92.5, total_pnl: 15400, roi: 340, followers_count: 124, is_active: true,
          daily_trades_min: 5, daily_trades_max: 15, created_at: new Date().toISOString()
        },
        {
          id: 'mock-2', name: 'Alpha Signals', description: 'Long-term swing trading, strictly fundamental', avatar_url: null,
          win_rate: 76.2, total_pnl: 8520, roi: 125, followers_count: 89, is_active: true,
          daily_trades_min: 1, daily_trades_max: 3, created_at: new Date().toISOString()
        }
      ]);
    } else if (data) {
      setTraders(data as MasterTrader[]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchTraders(); }, []);

  const openAdd = () => {
    setEditingTrader(null);
    setForm({ ...EMPTY_TRADER });
    setImageFile(null);
    setImagePreview(null);
    setError('');
    setIsModalOpen(true);
  };

  const openEdit = (trader: MasterTrader) => {
    setEditingTrader(trader);
    setForm({
      name: trader.name,
      description: trader.description,
      avatar_url: trader.avatar_url,
      win_rate: trader.win_rate,
      total_pnl: trader.total_pnl,
      roi: trader.roi,
      followers_count: trader.followers_count,
      is_active: trader.is_active,
      daily_trades_min: trader.daily_trades_min,
      daily_trades_max: trader.daily_trades_max,
    });
    setImageFile(null);
    setImagePreview(trader.avatar_url);
    setError('');
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const ext = file.name.split('.').pop();
    const path = `trader-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('avatars').upload(path, file, { upsert: true });
    if (error) { setError('Image upload failed: ' + error.message); return null; }
    const { data } = supabase.storage.from('avatars').getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSave = async () => {
    if (!form.name.trim()) { setError('Trader name is required.'); return; }
    setSaving(true);
    setError('');

    let avatarUrl = form.avatar_url;
    if (imageFile) {
      setUploading(true);
      avatarUrl = await uploadImage(imageFile);
      setUploading(false);
      if (!avatarUrl) { setSaving(false); return; }
    }

    const payload = {
      name: form.name.trim(),
      description: form.description?.trim() || null,
      avatar_url: avatarUrl,
      win_rate: Number(form.win_rate),
      total_pnl: Number(form.total_pnl),
      roi: Number(form.roi),
      followers_count: Number(form.followers_count),
      is_active: form.is_active,
      daily_trades_min: Number(form.daily_trades_min),
      daily_trades_max: Number(form.daily_trades_max),
    };

    let resultError;
    if (editingTrader && !editingTrader.id.startsWith('mock')) {
      const { error } = await supabase.from('master_traders').update(payload).eq('id', editingTrader.id);
      resultError = error;
    } else if (!editingTrader || editingTrader.id.startsWith('mock')) {
      const { error } = await supabase.from('master_traders').insert(payload);
      resultError = error;
    }

    if (resultError) {
      setError('Error saving trader: ' + resultError.message + ' (Check database schema)');
      setSaving(false);
      return;
    }

    setSaving(false);
    setIsModalOpen(false);
    fetchTraders();
  };

  const handleDelete = async (id: string) => {
    if (id.startsWith('mock')) {
      setTraders(traders.filter(t => t.id !== id));
      return;
    }
    await supabase.from('master_traders').delete().eq('id', id);
    fetchTraders();
  };

  const toggleActive = async (trader: MasterTrader) => {
    if (trader.id.startsWith('mock')) {
      setTraders(traders.map(t => t.id === trader.id ? { ...t, is_active: !t.is_active } : t));
      return;
    }
    await supabase.from('master_traders').update({ is_active: !trader.is_active }).eq('id', trader.id);
    fetchTraders();
  };

  const openSimulate = (trader: MasterTrader) => {
    setSimTrader(trader);
    setSimDays(1);
    setSimResult(null);
    setIsSimulateOpen(true);
  };

  const runSimulation = async () => {
    if (!simTrader) return;
    setSimulating(true);

    let totalTrades = 0;
    let newPnl = simTrader.total_pnl;
    let wins = Math.round((simTrader.win_rate / 100) * 100); 
    let totalHistoricalTrades = wins > 0 ? 100 : 0; 

    for (let i = 0; i < simDays; i++) {
      const tradesToday = Math.floor(Math.random() * (simTrader.daily_trades_max - simTrader.daily_trades_min + 1)) + simTrader.daily_trades_min;
      totalTrades += tradesToday;
      
      for (let j = 0; j < tradesToday; j++) {
        const isWin = Math.random() * 100 <= simTrader.win_rate;
        totalHistoricalTrades++;
        if (isWin) {
          wins++;
          newPnl += Math.random() * 50 + 10;
        } else {
          newPnl -= Math.random() * 40 + 10;
        }
      }
    }

    const newWinRate = totalHistoricalTrades > 0 ? (wins / totalHistoricalTrades) * 100 : simTrader.win_rate;
    const pnlDiff = newPnl - simTrader.total_pnl;
    const newRoi = simTrader.roi + (pnlDiff / 100);

    const payload = {
      total_pnl: newPnl,
      win_rate: newWinRate,
      roi: newRoi,
    };

    if (!simTrader.id.startsWith('mock')) {
      await supabase.from('master_traders').update(payload).eq('id', simTrader.id);

      // Distribute profits to followers
      const roiDiff = newRoi - simTrader.roi;
      if (Math.abs(roiDiff) > 0) {
        const { data: followers } = await supabase
          .from('copy_trading_subscriptions')
          .select('id, user_id, amount, total_pnl')
          .eq('master_trader_id', simTrader.id)
          .eq('status', 'active');
          
        if (followers && followers.length > 0) {
          for (const follower of followers) {
            // Profit is the % change in ROI applied to their invested amount
            const followerProfit = (roiDiff / 100) * Number(follower.amount);
            
            // Update the subscription's total_pnl
            const newTotalPnl = Number(follower.total_pnl || 0) + followerProfit;
            await supabase.from('copy_trading_subscriptions').update({ total_pnl: newTotalPnl }).eq('id', follower.id);
            
            // Fetch current user balance
            const { data: profile } = await supabase
              .from('profiles')
              .select('balance, email')
              .eq('id', follower.user_id)
              .single();
              
            if (profile) {
              const newBalance = Number(profile.balance || 0) + followerProfit;
              
              // Update user balance directly
              await supabase.from('profiles').update({ balance: newBalance }).eq('id', follower.user_id);
              
              // Log the transaction
              await supabase.from('transactions').insert({
                user_id: follower.user_id,
                user_email: profile.email,
                type: followerProfit >= 0 ? 'deposit' : 'withdrawal',
                amount: Math.abs(followerProfit),
                asset: followerProfit >= 0 ? 'PROFIT' : 'LOSS',
                txid: 'Automated copy trading return from ' + simTrader.name,
                status: 'approved',
                timestamp: Date.now()
              });
            }
          }
        }
      }
    } else {
      setTraders(traders.map(t => t.id === simTrader.id ? { ...t, ...payload } : t));
    }

    setSimResult({
      trades: totalTrades,
      pnl: pnlDiff,
      winRate: newWinRate,
    });
    
    if (!simTrader.id.startsWith('mock')) fetchTraders();
    setSimulating(false);
  };

  const openFollowers = async (trader: MasterTrader) => {
    setIsFollowersOpen(true);
    setLoadingFollowers(true);
    if (!trader.id.startsWith('mock')) {
      const { data, error } = await supabase
        .from('copy_trading_subscriptions')
        .select('*, profiles(email)')
        .eq('master_trader_id', trader.id);
      
      if (!error && data) {
        setSelectedTraderFollowers(data);
      } else {
        setSelectedTraderFollowers([]);
      }
    } else {
      setSelectedTraderFollowers([
        { id: '1', profiles: { email: 'user123@example.com' }, amount: 500, status: 'active' },
        { id: '2', profiles: { email: 'investor44@example.com' }, amount: 1200, status: 'active' },
        { id: '3', profiles: { email: 'crypto.whale@example.com' }, amount: 5000, status: 'active' }
      ]);
    }
    setLoadingFollowers(false);
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl text-white font-light font-['Outfit'] flex items-center gap-3">
            Copy Trading
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-[#13c74b]/10 border border-[#13c74b]/20 text-[#13c74b] rounded-full text-[10px] uppercase tracking-widest font-bold">
              <div className="w-1.5 h-1.5 rounded-full bg-[#13c74b] animate-pulse"></div>
              Auto-Bot Active
            </span>
          </h1>
          <p className="text-[13px] text-gray-500 mt-1">Manage master traders, simulate trades, and view followers.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-6 py-3 bg-[#13c74b] text-[#070b14] text-[12px] font-bold uppercase tracking-widest rounded-2xl hover:bg-[#10a13c] transition-colors"
        >
          <Plus className="w-4 h-4" /> New Trader
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-500">Loading traders...</div>
      ) : traders.length === 0 ? (
        <div className="text-center py-16 border border-white/5 bg-[#131714] rounded-2xl">
          <Copy className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500">No master traders available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {traders.map(trader => (
            <TraderCard
              key={trader.id}
              trader={trader}
              onEdit={() => openEdit(trader)}
              onDelete={() => handleDelete(trader.id)}
              onToggle={() => toggleActive(trader)}
              onSimulate={() => openSimulate(trader)}
              onFollowers={() => openFollowers(trader)}
            />
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-[#131714] border border-white/5 text-white max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-['Outfit'] text-xl">
              {editingTrader ? 'Edit Master Trader' : 'New Master Trader'}
            </DialogTitle>
            <DialogDescription className="text-gray-500 text-[12px]">
              Set up the copy trading profile.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-2 block">Avatar</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-black border border-white/5 overflow-hidden flex items-center justify-center shrink-0">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Users className="w-6 h-6 text-gray-600" />
                  )}
                </div>
                <label className="flex-1 cursor-pointer">
                  <div className="border border-dashed border-white/20 hover:border-[#13c74b]/50 rounded-2xl p-3 text-center transition-colors">
                    <p className="text-[12px] text-gray-400">Click to upload avatar</p>
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1.5 block">Trader Name *</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Satoshi Ninja" className="w-full bg-black border border-white/5 p-3 rounded-2xl text-sm focus:outline-none focus:border-[#13c74b]/50 text-white" />
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1.5 block">Strategy Description</label>
              <textarea value={form.description || ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} className="w-full bg-black border border-white/5 p-3 rounded-2xl text-sm focus:outline-none focus:border-[#13c74b]/50 text-white resize-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1.5 block">Win Rate (%)</label>
                <input type="number" step="0.1" value={form.win_rate} onChange={e => setForm(f => ({ ...f, win_rate: Number(e.target.value) }))} className="w-full bg-black border border-white/5 p-3 rounded-2xl text-sm focus:outline-none focus:border-[#13c74b]/50 text-white font-mono" />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1.5 block">ROI (%)</label>
                <input type="number" step="0.1" value={form.roi} onChange={e => setForm(f => ({ ...f, roi: Number(e.target.value) }))} className="w-full bg-black border border-white/5 p-3 rounded-2xl text-sm focus:outline-none focus:border-[#13c74b]/50 text-white font-mono" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1.5 block">Total PnL ($)</label>
                <input type="number" value={form.total_pnl} onChange={e => setForm(f => ({ ...f, total_pnl: Number(e.target.value) }))} className="w-full bg-black border border-white/5 p-3 rounded-2xl text-sm focus:outline-none focus:border-[#13c74b]/50 text-white font-mono" />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1.5 block">Followers (Fake)</label>
                <input type="number" value={form.followers_count} onChange={e => setForm(f => ({ ...f, followers_count: Number(e.target.value) }))} className="w-full bg-black border border-white/5 p-3 rounded-2xl text-sm focus:outline-none focus:border-[#13c74b]/50 text-white font-mono" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1.5 block">Min Daily Trades</label>
                <input type="number" value={form.daily_trades_min} onChange={e => setForm(f => ({ ...f, daily_trades_min: Number(e.target.value) }))} className="w-full bg-black border border-white/5 p-3 rounded-2xl text-sm focus:outline-none focus:border-[#13c74b]/50 text-white font-mono" />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1.5 block">Max Daily Trades</label>
                <input type="number" value={form.daily_trades_max} onChange={e => setForm(f => ({ ...f, daily_trades_max: Number(e.target.value) }))} className="w-full bg-black border border-white/5 p-3 rounded-2xl text-sm focus:outline-none focus:border-[#13c74b]/50 text-white font-mono" />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-black border border-white/5 rounded-2xl">
              <div className="text-[13px] text-white font-medium">Active Status</div>
              <button type="button" onClick={() => setForm(f => ({ ...f, is_active: !f.is_active }))} className={form.is_active ? 'text-[#13c74b]' : 'text-gray-600'}>
                {form.is_active ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
              </button>
            </div>

            {error && <p className="text-red-400 text-[12px] bg-red-500/10 border border-red-500/20 p-3 rounded-2xl">{error}</p>}
          </div>

          <DialogFooter>
            <DialogClose asChild><button className="px-6 py-2 bg-transparent text-white hover:bg-white/5 rounded-full text-[12px] uppercase tracking-widest">Cancel</button></DialogClose>
            <button onClick={handleSave} disabled={saving || uploading} className="px-6 py-2 bg-[#13c74b] text-black font-bold rounded-full hover:bg-[#10a13c] hover:bg-[#10a13c] disabled:opacity-50 transition-colors text-[12px] uppercase tracking-widest">
              {uploading ? 'Uploading...' : saving ? 'Saving...' : 'Save Trader'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Simulate Trades Modal */}
      <Dialog open={isSimulateOpen} onOpenChange={setIsSimulateOpen}>
        <DialogContent className="bg-[#131714] border border-white/5 text-white">
          <DialogHeader>
            <DialogTitle>Simulate Trades for {simTrader?.name}</DialogTitle>
            <DialogDescription className="text-gray-400">Generate fake trading activity to update PnL and stats.</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-2 block">Days to simulate</label>
              <input type="number" min="1" max="30" value={simDays} onChange={e => setSimDays(Number(e.target.value))} className="w-full bg-black border border-white/5 p-3 rounded-2xl text-sm focus:outline-none focus:border-[#13c74b]/50 text-white font-mono" />
            </div>
            
            {simResult && (
              <div className="bg-black p-4 rounded-2xl border border-white/5 space-y-2">
                <h4 className="text-[12px] uppercase tracking-widest text-[#13c74b] font-bold mb-2">Simulation Results</h4>
                <div className="flex justify-between text-sm"><span className="text-gray-400">Trades Executed:</span> <span>{simResult.trades}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-400">PnL Change:</span> <span className={simResult.pnl >= 0 ? 'text-[#13c74b]' : 'text-red-400'}>{simResult.pnl >= 0 ? '+' : ''}${simResult.pnl.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-400">New Win Rate:</span> <span>{simResult.winRate.toFixed(2)}%</span></div>
              </div>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild><button className="px-6 py-2 bg-transparent text-white hover:bg-white/5 rounded-full text-[12px] uppercase tracking-widest">Close</button></DialogClose>
            <button onClick={runSimulation} disabled={simulating} className="px-6 py-2 bg-[#13c74b] text-black font-bold rounded-full hover:bg-[#10a13c] hover:bg-[#10a13c] disabled:opacity-50 transition-colors text-[12px] uppercase tracking-widest">
              {simulating ? 'Running...' : 'Run Simulation'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Followers Modal */}
      <Dialog open={isFollowersOpen} onOpenChange={setIsFollowersOpen}>
        <DialogContent className="bg-[#131714] border border-white/5 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Followers</DialogTitle>
            <DialogDescription className="text-gray-400">Users actively copying this trader.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {loadingFollowers ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : selectedTraderFollowers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No active followers.</div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 text-[11px] text-gray-500 uppercase tracking-widest">
                    <th className="pb-2 font-semibold">User</th>
                    <th className="pb-2 font-semibold">Copy Amount</th>
                    <th className="pb-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {selectedTraderFollowers.map((f: any, i: number) => (
                    <tr key={i}>
                      <td className="py-3 text-[13px]">{f.profiles?.email || 'Unknown User'}</td>
                      <td className="py-3 text-[13px] font-mono">${f.amount}</td>
                      <td className="py-3"><span className="bg-[#13c74b]/10 text-[#13c74b] px-2 py-0.5 rounded-2xl text-[10px] uppercase tracking-widest font-bold">{f.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function TraderCard({ trader, onEdit, onDelete, onToggle, onSimulate, onFollowers }: { trader: MasterTrader; onEdit: () => void; onDelete: () => void; onToggle: () => void; onSimulate: () => void; onFollowers: () => void; }) {
  return (
    <div className={`bg-[#131714] border ${trader.is_active ? 'border-[#13c74b]/30' : 'border-white/5'} rounded-2xl p-5 relative`}>
      <div className={`absolute top-3 right-3 px-2 py-0.5 rounded-2xl text-[9px] font-bold uppercase tracking-widest ${trader.is_active ? 'bg-[#13c74b]/20 text-[#13c74b] border border-[#13c74b]/30' : 'bg-white/5 text-gray-500 border border-white/5'}`}>
        {trader.is_active ? 'Active' : 'Inactive'}
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-black border border-white/5 flex items-center justify-center shrink-0">
          {trader.avatar_url ? <img src={trader.avatar_url} alt={trader.name} className="w-full h-full object-cover" /> : <Users className="w-6 h-6 text-gray-600" />}
        </div>
        <div>
          <h3 className="text-white font-['Outfit'] font-semibold text-lg leading-none">{trader.name}</h3>
          <div className="text-[12px] text-gray-500 mt-1">{trader.followers_count} Followers</div>
        </div>
      </div>

      <div className="space-y-2 p-4 bg-[#1a1f1c]/50 rounded-2xl border border-white/5 mb-4">
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-400 font-medium">Win Rate</span>
          <span className="text-white font-bold">{trader.win_rate.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between items-center text-xs pt-2 border-t border-white/5">
          <span className="text-gray-400 font-medium">Total PnL</span>
          <span className={`font-bold ${trader.total_pnl >= 0 ? 'text-[#13c74b]' : 'text-red-400'}`}>
            {trader.total_pnl >= 0 ? '+' : ''}${trader.total_pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex justify-between items-center text-xs pt-2 border-t border-white/5">
          <span className="text-gray-400 font-medium">ROI</span>
          <span className={`font-bold ${trader.roi >= 0 ? 'text-[#13c74b]' : 'text-red-400'}`}>
            {trader.roi >= 0 ? '+' : ''}{trader.roi.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={onSimulate} className="flex-1 py-2 bg-[#13c74b]/10 hover:bg-[#13c74b]/20 text-[#13c74b] rounded-2xl text-[10px] uppercase tracking-widest font-bold transition-colors">Simulate Trades</button>
        <button onClick={onFollowers} className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-white rounded-2xl text-[10px] uppercase tracking-widest font-bold transition-colors">View Followers</button>
      </div>

      <div className="flex gap-2">
        <button onClick={onEdit} className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-white rounded-2xl text-[11px] uppercase tracking-widest font-bold transition-colors flex items-center justify-center gap-1.5"><Edit className="w-3.5 h-3.5" /> Edit</button>
        <button onClick={onToggle} className={`p-2 rounded-2xl transition-colors ${trader.is_active ? 'bg-orange-500/10 hover:bg-orange-500/20 text-orange-400' : 'bg-[#13c74b]/10 hover:bg-[#13c74b]/20 text-[#13c74b]'}`}><Power className="w-4 h-4" /></button>
        <AlertDialog>
          <AlertDialogTrigger asChild><button className="p-2 bg-red-900/20 hover:bg-red-900/40 text-red-500 rounded-2xl transition-colors"><Trash2 className="w-4 h-4" /></button></AlertDialogTrigger>
          <AlertDialogContent className="bg-[#131714] border border-white/5 text-white">
            <AlertDialogHeader><AlertDialogTitle>Delete {trader.name}?</AlertDialogTitle><AlertDialogDescription className="text-gray-400">This will permanently remove this copy trader profile.</AlertDialogDescription></AlertDialogHeader>
            <AlertDialogFooter><AlertDialogCancel className="bg-transparent border-white/5 text-white hover:bg-white/5">Cancel</AlertDialogCancel><AlertDialogAction onClick={onDelete} className="bg-red-600 text-white hover:bg-red-700">Delete</AlertDialogAction></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

