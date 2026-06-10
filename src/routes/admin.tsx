import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { 
  Users, DollarSign, Wallet, ShieldAlert, CheckCircle, XCircle, 
  Trash2, Ban, Edit, Settings, Activity, Search, Power, Clock,
  TrendingUp, Plus, ImageIcon, ToggleLeft, ToggleRight, Eye, X as XIcon, Menu
} from "lucide-react";
import { useCryptoStore } from "../lib/crypto-store";
import { useTransactionStore } from "../lib/transaction-store";
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
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate({ to: '/login' });
        return;
      }
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
        
      if (!profile || profile.role !== 'admin') {
        navigate({ to: '/dashboard' });
      } else {
        setIsChecking(false);
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
      <div className="min-h-screen bg-[#070b14] flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#c9a84c] border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-gray-500 uppercase tracking-widest text-[11px] font-bold">Verifying Access...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-[#f0f4ff] font-['Inter'] flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-[#0a0f1c] border-b border-white/5 p-4 flex items-center justify-between">
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
      <aside className={`fixed lg:sticky top-0 left-0 h-screen bg-[#0a0f1c] border-r border-white/5 p-6 z-50 flex flex-col transition-transform duration-300 w-64 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <Link to="/" className="hidden lg:flex items-center gap-3 mb-12">
          <div className="w-8 h-8 bg-red-600/20 border border-red-500/50 flex items-center justify-center font-bold text-red-500 font-['Outfit'] text-sm">A</div>
          <span className="font-light text-xl tracking-[0.15em] text-white font-['Outfit'] uppercase">SuperAdmin</span>
        </Link>
        <div className="flex flex-col gap-2 flex-grow mt-4 lg:mt-0">
          <TabButton active={activeTab === 'overview'} onClick={() => {setActiveTab('overview'); setIsMobileMenuOpen(false);}} icon={Activity} label="Overview" />
          <TabButton active={activeTab === 'users'} onClick={() => {setActiveTab('users'); setIsMobileMenuOpen(false);}} icon={Users} label="Manage Users" />
          <TabButton active={activeTab === 'transactions'} onClick={() => {setActiveTab('transactions'); setIsMobileMenuOpen(false);}} icon={DollarSign} label="Transactions" />
          <TabButton active={activeTab === 'wallets'} onClick={() => {setActiveTab('wallets'); setIsMobileMenuOpen(false);}} icon={Wallet} label="Platform Wallets" />
          <TabButton active={activeTab === 'plans'} onClick={() => {setActiveTab('plans'); setIsMobileMenuOpen(false);}} icon={TrendingUp} label="Investment Plans" />
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
            <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-sm transition-colors" title="Logout">
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
        {activeTab === 'wallets' && <WalletsTab />}
        {activeTab === 'plans' && <PlansTab />}
        {activeTab === 'security' && <SecurityTab />}
      </main>
    </div>
  );
}

// ─── Investment Plans Tab ─────────────────────────────────────────────────────

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
          className="flex items-center gap-2 px-6 py-3 bg-[#c9a84c] text-[#070b14] text-[12px] font-bold uppercase tracking-widest rounded-sm hover:bg-[#b89945] transition-colors"
        >
          <Plus className="w-4 h-4" /> New Plan
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-500">Loading plans...</div>
      ) : plans.length === 0 ? (
        <div className="text-center py-16 border border-white/5 bg-[#0a0f1c] rounded-sm">
          <TrendingUp className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500">No investment plans yet.</p>
          <button onClick={openAdd} className="mt-4 px-6 py-2 bg-[#c9a84c] text-[#070b14] text-[12px] font-bold uppercase tracking-widest rounded-sm hover:bg-[#b89945]">
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
        <DialogContent className="bg-[#0a0f1c] border border-white/10 text-white max-w-lg max-h-[90vh] overflow-y-auto">
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
                <div className="w-20 h-20 bg-[#070b14] border border-white/10 rounded-sm overflow-hidden flex items-center justify-center shrink-0">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-7 h-7 text-gray-600" />
                  )}
                </div>
                <label className="flex-1 cursor-pointer">
                  <div className="border border-dashed border-white/20 hover:border-[#c9a84c]/50 rounded-sm p-3 text-center transition-colors">
                    <p className="text-[12px] text-gray-400">Click to upload image</p>
                    <p className="text-[10px] text-gray-600 mt-1">PNG, JPG, WEBP – max 5MB</p>
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
                className="w-full bg-[#070b14] border border-white/10 p-3 rounded-sm text-sm focus:outline-none focus:border-[#c9a84c]/50 text-white"
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
                className="w-full bg-[#070b14] border border-white/10 p-3 rounded-sm text-sm focus:outline-none focus:border-[#c9a84c]/50 text-white resize-none"
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
                  className="w-full bg-[#070b14] border border-white/10 p-3 rounded-sm text-sm focus:outline-none focus:border-[#c9a84c]/50 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1.5 block">Duration (Days) *</label>
                <input
                  type="number"
                  min="1"
                  value={form.duration_days}
                  onChange={e => setForm(f => ({ ...f, duration_days: Number(e.target.value) }))}
                  className="w-full bg-[#070b14] border border-white/10 p-3 rounded-sm text-sm focus:outline-none focus:border-[#c9a84c]/50 text-white font-mono"
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
                  className="w-full bg-[#070b14] border border-white/10 p-3 rounded-sm text-sm focus:outline-none focus:border-[#c9a84c]/50 text-white font-mono"
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
                  className="w-full bg-[#070b14] border border-white/10 p-3 rounded-sm text-sm focus:outline-none focus:border-[#c9a84c]/50 text-white font-mono"
                />
              </div>
            </div>

            {/* Active Toggle */}
            <div className="flex items-center justify-between p-3 bg-[#070b14] border border-white/10 rounded-sm">
              <div>
                <div className="text-[13px] text-white font-medium">Active</div>
                <div className="text-[11px] text-gray-500">Visible to users on the platform</div>
              </div>
              <button
                type="button"
                onClick={() => setForm(f => ({ ...f, is_active: !f.is_active }))}
                className={`transition-colors ${form.is_active ? 'text-[#00d4aa]' : 'text-gray-600'}`}
              >
                {form.is_active
                  ? <ToggleRight className="w-8 h-8" />
                  : <ToggleLeft className="w-8 h-8" />
                }
              </button>
            </div>

            {error && <p className="text-red-400 text-[12px] bg-red-500/10 border border-red-500/20 p-3 rounded-sm">{error}</p>}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <button className="px-6 py-2 bg-transparent text-white hover:bg-white/5 rounded-sm text-[12px] uppercase tracking-widest">Cancel</button>
            </DialogClose>
            <button
              onClick={handleSave}
              disabled={saving || uploading}
              className="px-6 py-2 bg-[#c9a84c] text-[#070b14] font-bold rounded-sm hover:bg-[#b89945] disabled:opacity-50 transition-colors text-[12px] uppercase tracking-widest"
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
    <div className={`bg-[#0a0f1c] border ${plan.is_active ? 'border-[#c9a84c]/30' : 'border-white/5'} rounded-sm overflow-hidden group relative`}>
      {/* Image */}
      <div className="h-36 bg-[#070b14] overflow-hidden relative">
        {plan.image_url ? (
          <img src={plan.image_url} alt={plan.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <TrendingUp className="w-10 h-10 text-gray-700" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] to-transparent" />
        {/* Active badge */}
        <div className={`absolute top-3 right-3 px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-widest ${plan.is_active ? 'bg-[#00d4aa]/20 text-[#00d4aa] border border-[#00d4aa]/30' : 'bg-white/5 text-gray-500 border border-white/10'}`}>
          {plan.is_active ? 'Active' : 'Inactive'}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-white font-['Outfit'] font-semibold text-lg leading-none mb-1">{plan.name}</h3>
        {plan.description && <p className="text-gray-500 text-[12px] mb-4 line-clamp-2">{plan.description}</p>}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-[#070b14] border border-white/5 p-2.5 rounded-sm text-center">
            <div className="text-[#c9a84c] font-mono font-bold text-lg">{plan.daily_roi}%</div>
            <div className="text-[9px] text-gray-500 uppercase tracking-widest mt-0.5">Daily ROI</div>
          </div>
          <div className="bg-[#070b14] border border-white/5 p-2.5 rounded-sm text-center">
            <div className="text-white font-mono font-bold text-lg">{plan.duration_days}d</div>
            <div className="text-[9px] text-gray-500 uppercase tracking-widest mt-0.5">Duration</div>
          </div>
          <div className="bg-[#070b14] border border-[#00d4aa]/20 p-2.5 rounded-sm text-center">
            <div className="text-[#00d4aa] font-mono font-bold text-lg">{totalRoi}%</div>
            <div className="text-[9px] text-gray-500 uppercase tracking-widest mt-0.5">Total ROI</div>
          </div>
        </div>

        <div className="text-[11px] text-gray-500 mb-4">
          Min: <span className="text-white">${plan.min_amount.toLocaleString()}</span>
          {plan.max_amount && <> · Max: <span className="text-white">${plan.max_amount.toLocaleString()}</span></>}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white/5 hover:bg-white/10 text-white rounded-sm text-[11px] uppercase tracking-widest font-bold transition-colors"
          >
            <Edit className="w-3.5 h-3.5" /> Edit
          </button>
          <button
            onClick={onToggle}
            title={plan.is_active ? 'Deactivate' : 'Activate'}
            className={`p-2 rounded-sm transition-colors ${plan.is_active ? 'bg-orange-500/10 hover:bg-orange-500/20 text-orange-400' : 'bg-[#00d4aa]/10 hover:bg-[#00d4aa]/20 text-[#00d4aa]'}`}
          >
            <Power className="w-4 h-4" />
          </button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="p-2 bg-red-900/20 hover:bg-red-900/40 text-red-500 rounded-sm transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#0a0f1c] border border-white/10 text-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete "{plan.name}"?</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-400">
                  This will permanently remove this investment plan. Existing investments won't be affected.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/5">Cancel</AlertDialogCancel>
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
      className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors w-full text-left ${active ? 'bg-red-500/10 border-l-2 border-red-500 text-white' : 'text-gray-500 hover:text-white hover:bg-white/5 border-l-2 border-transparent'}`}
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
      // Fetch balances
      const { data: profiles } = await supabase.from('profiles').select('id, balance, role');
      // Fetch active investments
      const { data: investments } = await supabase.from('investments').select('amount, status');

      if (profiles) {
        setUsersCount(profiles.length);
        
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

  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl text-white font-light font-['Outfit'] mb-8">System Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Users" value={usersCount.toString()} change="Registered accounts" />
        <StatCard title="Total AUM" value={`$${totalAUM >= 1000000 ? (totalAUM/1000000).toFixed(1) + 'M' : totalAUM >= 1000 ? (totalAUM/1000).toFixed(1) + 'k' : totalAUM}`} change="Managed by platform" color="text-[#00d4aa]" />
        <StatCard title="Total Deposits" value={`$${totalDepositedAmount >= 1000000 ? (totalDepositedAmount/1000000).toFixed(1) + 'M' : totalDepositedAmount >= 1000 ? (totalDepositedAmount/1000).toFixed(1) + 'k' : totalDepositedAmount}`} change={`${approvedDeposits.length} approved deposits`} color="text-[#00d4aa]" />
        <StatCard title="Pending Deposits" value={pendingDeposits.length.toString()} change={`$${pendingAmount.toLocaleString()} pending`} color="text-[#c9a84c]" />
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#0a0f1c] border border-white/5 rounded-sm p-6">
          <h3 className="text-[14px] text-white font-medium mb-6">Recent Activity</h3>
          <div className="space-y-4">
            <ActivityItem text="User alice@example.com verified KYC" time="10 mins ago" />
            <ActivityItem text="New deposit $5,000 pending approval" time="2 hours ago" />
            <ActivityItem text="User john@example.com requested withdrawal" time="5 hours ago" />
            <ActivityItem text="Admin modified ETH receiving wallet" time="1 day ago" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ text, time }: any) {
  return (
    <div className="flex justify-between items-start border-b border-white/5 pb-4 last:border-0 last:pb-0">
      <div className="text-[13px] text-gray-300">{text}</div>
      <div className="text-[11px] text-gray-500 whitespace-nowrap ml-4">{time}</div>
    </div>
  );
}

function StatCard({ title, value, change, color = "text-white" }: any) {
  return (
    <div className="bg-[#0a0f1c] border border-white/5 p-6 rounded-sm">
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
    const { data, error } = await supabase.from('profiles').select('*').order('role', { ascending: true });
    if (error) {
      console.error('Error fetching users:', error);
    }
    if (data) {
      console.log('Fetched users:', data);
      setUsers(data);
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl text-white font-light font-['Outfit']">User Management</h1>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
          <input type="text" placeholder="Search email or ID..." className="bg-[#0a0f1c] border border-white/10 text-white pl-10 pr-4 py-2 rounded-sm text-sm focus:outline-none focus:border-white/30" />
        </div>
      </div>
      
      <div className="bg-[#0a0f1c] border border-white/5 rounded-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-[11px] text-gray-500 uppercase tracking-widest">
              <th className="p-4 font-semibold">User</th>
              <th className="p-4 font-semibold">Balance</th>
              <th className="p-4 font-semibold">Role</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
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
                  balance={`$${Number(user.balance || 0).toLocaleString()}`} 
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
  );
}

function UserRow({ id, name, email, balance, status, role, onMakeAdmin, onEdit, onBan, onDelete }: any) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editBalance, setEditBalance] = useState(balance.replace(/[^0-9.]/g, ''));

  useEffect(() => {
    setEditBalance(balance.replace(/[^0-9.]/g, ''));
  }, [balance]);

  const submitEdit = () => {
    onEdit(Number(editBalance));
    setIsEditOpen(false);
  };

  return (
    <tr className="hover:bg-white/[0.02] transition-colors">
      <td className="p-4">
        <div className="text-[14px] text-white font-medium">{name}</div>
        <div className="text-[12px] text-gray-500">{email}</div>
      </td>
      <td className="p-4 text-[14px] font-mono">{balance}</td>
      <td className="p-4">
        <span className={`px-2 py-1 rounded-sm text-[10px] uppercase tracking-widest font-bold ${role === 'admin' ? 'bg-purple-500/10 text-purple-400' : 'bg-gray-500/10 text-gray-400'}`}>
          {role}
        </span>
      </td>
      <td className="p-4">
        <span className={`px-2 py-1 rounded-sm text-[10px] uppercase tracking-widest font-bold ${status === 'Active' ? 'bg-[#00d4aa]/10 text-[#00d4aa]' : status === 'Suspended' ? 'bg-red-500/10 text-red-500' : 'bg-[#c9a84c]/10 text-[#c9a84c]'}`}>
          {status}
        </span>
      </td>
      <td className="p-4 text-right flex justify-end gap-2">
        {role !== 'admin' && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="px-3 py-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-sm text-[11px] font-bold uppercase transition-colors mr-2">
                Make Admin
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#0a0f1c] border border-white/10 text-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Make {name} an Admin?</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-400">This will grant them full access to the admin dashboard.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/5">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onMakeAdmin} className="bg-purple-500 text-white hover:bg-purple-600">Yes, Make Admin</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogTrigger asChild>
            <button className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-sm transition-colors" title="Edit Balance"><Edit className="w-4 h-4" /></button>
          </DialogTrigger>
          <DialogContent className="bg-[#0a0f1c] border border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>Edit Balance for {name}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2 block">New Balance</label>
              <input type="number" value={editBalance} onChange={e => setEditBalance(e.target.value)} className="w-full bg-[#070b14] border border-white/10 p-3 rounded-sm text-sm focus:outline-none focus:border-[#c9a84c]/50 text-white font-mono" />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <button className="px-6 py-2 bg-transparent text-white hover:bg-white/5 rounded-sm">Cancel</button>
              </DialogClose>
              <button onClick={submitEdit} className="px-6 py-2 bg-[#c9a84c] text-[#070b14] font-bold rounded-sm hover:bg-[#b89945] transition-colors">
                Save
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="p-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-sm transition-colors" title={status === 'Suspended' ? 'Unban User' : 'Ban User'}><Ban className="w-4 h-4" /></button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-[#0a0f1c] border border-white/10 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>{status === 'Suspended' ? 'Unban' : 'Ban'} {name}?</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-400">
                Are you sure you want to {status === 'Suspended' ? 'unban' : 'ban'} this user?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/5">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onBan(status === 'Suspended' ? 'Active' : 'Suspended')} className="bg-orange-500 text-white hover:bg-orange-600">{status === 'Suspended' ? 'Unban' : 'Ban'}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="p-2 bg-red-900/20 hover:bg-red-900/40 text-red-600 rounded-sm transition-colors" title="Delete User"><Trash2 className="w-4 h-4" /></button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-[#0a0f1c] border border-white/10 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete {name}?</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-400">
                WARNING: Are you sure you want to completely delete this user profile? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/5">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} className="bg-red-600 text-white hover:bg-red-700">Delete Permanently</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
          <div className="text-center py-12 text-gray-500 border border-white/5 bg-[#0a0f1c] rounded-sm">No pending transactions.</div>
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

  const handleApprove = async () => {
    if (tx.type === 'deposit') {
      updateStatus(tx.id, 'approved', tx.amount);
    } else {
      if (sentTxid) {
        await supabase.from('transactions').update({ txid: sentTxid }).eq('id', tx.id);
      }
      updateStatus(tx.id, 'approved');
    }
    setIsApproveOpen(false);
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
        className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
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
          className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-2xl"
          onClick={e => e.stopPropagation()}
        />
      </div>
    )}

    <div className="bg-[#0a0f1c] border border-[#c9a84c]/30 rounded-sm overflow-hidden">
      {/* Screenshot strip - visible only for deposits with a screenshot */}
      {tx.screenshotUrl && tx.type === 'deposit' && (
        <div
          className="relative h-32 bg-[#070b14] overflow-hidden cursor-pointer group"
          onClick={() => setLightboxOpen(true)}
        >
          <img
            src={tx.screenshotUrl}
            alt="Deposit proof screenshot"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-2 left-3 flex items-center gap-1.5 text-[10px] text-white/70 font-bold uppercase tracking-widest">
            <Eye className="w-3 h-3" /> Deposit Proof - Click to enlarge
          </div>
        </div>
      )}

      <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <div className="text-[10px] text-[#c9a84c] uppercase tracking-widest font-bold mb-2">{tx.type} Pending</div>
        <div className="flex items-center gap-4 mb-2">
          <span className="text-2xl text-white font-light">{tx.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 6})}</span>
          <span className="text-[11px] font-bold tracking-widest bg-white/10 px-2 py-1 uppercase rounded-sm text-gray-300">{tx.asset}</span>
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
            <button className="px-8 py-3 bg-[#00d4aa] hover:bg-[#00b38f] text-[#070b14] font-bold text-[12px] uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" /> Approve
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#0a0f1c] border border-white/10 text-white p-0 overflow-hidden max-w-md">
            <div className="h-1.5 w-full bg-gradient-to-r from-[#00d4aa] to-[#00f5c8]" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#00d4aa]/15 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-[#00d4aa]" />
                </div>
                <div>
                  <h2 className="text-lg font-['Outfit'] font-semibold text-white capitalize">Approve {tx.type}</h2>
                  <p className="text-[12px] text-gray-500 uppercase tracking-widest">{tx.type === 'deposit' ? 'Credit user balance' : 'Send funds to user'}</p>
                </div>
              </div>

              <div className="bg-[#070b14] border border-white/5 rounded-sm p-4 mb-5 space-y-2.5">
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
                  <label className="text-[11px] text-gray-400 uppercase tracking-widest font-bold mb-2 block flex items-center gap-1.5"><Eye className="w-3 h-3" /> Deposit Screenshot</label>
                  <div
                    className="relative rounded-sm overflow-hidden cursor-pointer group border border-white/10"
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
                <div className="mb-5 bg-[#00d4aa]/10 border border-[#00d4aa]/20 p-4 rounded-sm">
                  <p className="text-[14px] text-[#00d4aa] font-medium text-center">
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
                      <div className="flex-1 bg-[#070b14] border border-white/10 text-gray-300 p-3 rounded-sm text-[12px] font-mono truncate">{tx.txid || 'No address provided'}</div>
                      <button onClick={() => handleCopy(tx.txid)} className="px-4 bg-[#00d4aa]/10 hover:bg-[#00d4aa]/20 border border-[#00d4aa]/30 text-[#00d4aa] rounded-sm text-[11px] uppercase tracking-widest font-bold transition-colors whitespace-nowrap">
                        {copied ? '✓ Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Sent TXID <span className="text-gray-600 normal-case tracking-normal font-normal">(optional)</span></label>
                    <input type="text" value={sentTxid} onChange={e => setSentTxid(e.target.value)} placeholder="Paste transaction hash after sending..."
                      className="w-full bg-[#070b14] border border-white/10 focus:border-[#00d4aa]/50 p-3 rounded-sm text-[12px] focus:outline-none text-white font-mono transition-colors" />
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <DialogClose asChild>
                  <button className="flex-1 py-3 text-[12px] uppercase tracking-widest font-bold bg-white/5 hover:bg-white/10 text-gray-300 rounded-sm transition-colors">Cancel</button>
                </DialogClose>
                <button onClick={handleApprove}
                  className="flex-1 py-3 text-[12px] uppercase tracking-widest font-bold bg-[#00d4aa] hover:bg-[#00b38f] text-[#070b14] rounded-sm disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  ✓ Confirm Approval
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="px-8 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-[12px] uppercase tracking-widest border border-red-500/30 rounded-sm transition-colors flex items-center justify-center gap-2">
              <XCircle className="w-4 h-4" /> Reject
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-[#0a0f1c] border border-white/10 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Reject {tx.type}</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-400">
                Are you sure you want to reject this {tx.type}? The user will not receive these funds.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/5 hover:text-white">Cancel</AlertDialogCancel>
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
      color: '#c9a84c',
      address,
      network,
      active: true
    });
    setIsOpen(false);
    setSymbol(''); setName(''); setNetwork('Native'); setAddress('');
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl text-white font-light font-['Outfit']">Platform Wallets</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button className="px-6 py-3 bg-white text-[#070b14] text-[12px] font-bold uppercase tracking-widest rounded-sm hover:bg-gray-200 transition-colors">
              + Add New Wallet
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#0a0f1c] border border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>Add New Wallet</DialogTitle>
              <DialogDescription className="text-gray-400">
                Enter the details for the new platform wallet.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Symbol</label>
                <input value={symbol} onChange={e => setSymbol(e.target.value)} placeholder="e.g. BTC" className="w-full bg-[#070b14] border border-white/10 p-3 rounded-sm text-sm focus:outline-none focus:border-[#c9a84c]/50 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Name</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Bitcoin" className="w-full bg-[#070b14] border border-white/10 p-3 rounded-sm text-sm focus:outline-none focus:border-[#c9a84c]/50 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Network</label>
                <input value={network} onChange={e => setNetwork(e.target.value)} placeholder="e.g. Native" className="w-full bg-[#070b14] border border-white/10 p-3 rounded-sm text-sm focus:outline-none focus:border-[#c9a84c]/50 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Wallet Address</label>
                <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Enter wallet address" className="w-full bg-[#070b14] border border-white/10 p-3 rounded-sm text-sm focus:outline-none focus:border-[#c9a84c]/50 text-white font-mono" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <button className="px-6 py-2 bg-transparent text-white hover:bg-white/5 rounded-sm">Cancel</button>
              </DialogClose>
              <button onClick={handleAdd} disabled={!symbol || !name || !network || !address} className="px-6 py-2 bg-[#c9a84c] text-[#070b14] font-bold rounded-sm hover:bg-[#b89945] disabled:opacity-50 transition-colors">
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
    <div className={`bg-[#0a0f1c] border ${crypto.active ? 'border-white/20' : 'border-white/5'} p-6 rounded-sm relative overflow-hidden group`}>
      {!crypto.active && <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center backdrop-blur-[1px] pointer-events-none"><span className="text-[11px] font-bold tracking-widest uppercase bg-black px-3 py-1 rounded-sm border border-white/10 text-gray-400">Inactive</span></div>}
      
      <div className="flex justify-between items-start mb-6 relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[12px] font-bold" style={{ backgroundColor: `${crypto.color}15`, color: crypto.color }}>
            {crypto.symbol.substring(0,1)}
          </div>
          <div>
            <h3 className="text-lg text-white font-['Outfit'] leading-none mb-1">{crypto.name} <span className="text-sm text-gray-500">({crypto.symbol})</span></h3>
            <div className="text-[11px] text-gray-500 uppercase tracking-widest">{crypto.network}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => toggleActive(crypto.id)} title={crypto.active ? "Deactivate" : "Activate"} className={`transition-colors p-2 rounded-sm ${crypto.active ? 'text-gray-500 hover:text-orange-400 bg-white/5 hover:bg-orange-500/10' : 'text-white hover:text-green-400 bg-white/10 hover:bg-green-500/20'}`}><Power className="w-4 h-4" /></button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="text-red-400 hover:text-red-300 transition-colors bg-red-500/10 p-2 rounded-sm"><Trash2 className="w-4 h-4" /></button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#0a0f1c] border border-white/10 text-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete {crypto.symbol}?</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-400">
                  Are you sure you want to permanently remove {crypto.name} from the platform wallets? Users will no longer see this as a deposit option.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/5 hover:text-white">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => removeCrypto(crypto.id)} className="bg-red-500 text-white hover:bg-red-600">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="bg-[#070b14] border border-white/10 p-3 rounded-sm flex items-center justify-between relative z-20">
        <code className="text-[13px] text-gray-300 truncate mr-4">{crypto.address || 'No address set'}</code>
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogTrigger asChild>
            <button className="text-[#c9a84c] text-[11px] uppercase tracking-widest font-bold hover:underline shrink-0">Edit Address</button>
          </DialogTrigger>
          <DialogContent className="bg-[#0a0f1c] border border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>Update {crypto.symbol} Address</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2 block">Wallet Address</label>
              <input value={editAddress} onChange={e => setEditAddress(e.target.value)} className="w-full bg-[#070b14] border border-white/10 p-3 rounded-sm text-sm focus:outline-none focus:border-[#c9a84c]/50 text-white font-mono" />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <button className="px-6 py-2 bg-transparent text-white hover:bg-white/5 rounded-sm">Cancel</button>
              </DialogClose>
              <button onClick={handleEdit} className="px-6 py-2 bg-[#c9a84c] text-[#070b14] font-bold rounded-sm hover:bg-[#b89945] transition-colors">
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
  const [settings, setSettings] = useState({ maintenance_mode: false, withdrawals_halted: false });
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

  const handleWipe = async () => {
    await supabase.rpc('wipe_database');
    window.location.reload();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="animate-in fade-in duration-500 max-w-3xl">
      <h1 className="text-3xl text-white font-light font-['Outfit'] mb-8">SuperAdmin Settings</h1>
      
      <div className="space-y-6">
        <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-sm">
          <h3 className="text-lg text-red-400 font-['Outfit'] mb-2 flex items-center gap-2"><ShieldAlert className="w-5 h-5" /> Danger Zone</h3>
          <p className="text-[13px] text-gray-400 mb-6">These actions affect the entire platform. Proceed with extreme caution.</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#070b14] border border-white/5 rounded-sm">
              <div>
                <div className="text-[14px] text-white font-semibold">Maintenance Mode</div>
                <div className="text-[12px] text-gray-500">Disable all user logins and trading</div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className={`px-6 py-2 text-[11px] uppercase tracking-widest font-bold rounded-sm border transition-colors ${settings.maintenance_mode ? 'bg-[#c9a84c]/10 text-[#c9a84c] border-[#c9a84c]/20 hover:bg-[#c9a84c]/20' : 'bg-white/5 hover:bg-white/10 text-white border-white/10'}`}>
                    {settings.maintenance_mode ? 'Disable' : 'Enable'}
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-[#0a0f1c] border border-white/10 text-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle>{settings.maintenance_mode ? 'Disable' : 'Enable'} Maintenance Mode?</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                      {settings.maintenance_mode ? 'This will allow users to log in and trade normally again.' : 'This will prevent all non-admin users from logging in or making transactions.'}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/5">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={toggleMaintenance} className="bg-red-600 text-white hover:bg-red-700">Confirm</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-[#070b14] border border-white/5 rounded-sm">
              <div>
                <div className="text-[14px] text-white font-semibold">Halt Withdrawals</div>
                <div className="text-[12px] text-gray-500">Temporarily suspend all outgoing transactions</div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className={`px-6 py-2 text-[11px] uppercase tracking-widest font-bold rounded-sm border transition-colors ${settings.withdrawals_halted ? 'bg-[#c9a84c]/10 text-[#c9a84c] border-[#c9a84c]/20 hover:bg-[#c9a84c]/20' : 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20'}`}>
                    {settings.withdrawals_halted ? 'Resume' : 'Halt'}
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-[#0a0f1c] border border-white/10 text-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle>{settings.withdrawals_halted ? 'Resume' : 'Halt'} Withdrawals?</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                      {settings.withdrawals_halted ? 'This will allow users to submit withdrawal requests again.' : 'This will prevent users from submitting any new withdrawal requests.'}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/5">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={toggleWithdrawals} className="bg-red-600 text-white hover:bg-red-700">Confirm</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-[#070b14] border border-white/5 rounded-sm">
              <div>
                <div className="text-[14px] text-white font-semibold">Wipe Database</div>
                <div className="text-[12px] text-gray-500">Delete all users, transactions, and wallets</div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="px-6 py-2 bg-red-900/40 hover:bg-red-900/60 text-red-200 text-[11px] uppercase tracking-widest font-bold rounded-sm border border-red-500 transition-colors">Wipe All</button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-[#0a0f1c] border border-red-500/50 text-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-red-500">EXTREME DANGER: Wipe Database?</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-300">
                      This will permanently delete ALL users (except admins), ALL transactions, ALL investments, and ALL wallets. This action cannot be undone. Are you absolutely sure?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/5">Cancel</AlertDialogCancel>
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
