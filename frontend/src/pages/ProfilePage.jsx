import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api';
import { 
  User, Mail, Phone, MapPin, Shield, Lock, 
  Check, Loader, ArrowRight, Camera
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  
  const [form, setForm] = useState({
    nom: user?.nom || '',
    email: user?.email || '',
    telephone: user?.telephone || '',
    adresse: user?.adresse || ''
  });

  const [pwd, setPwd] = useState({
    ancienMotDePasse: '',
    nouveauMotDePasse: '',
    confirmer: ''
  });

  const [loading, setLoading] = useState(false);
  const [loadingPwd, setLoadingPwd] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authAPI.updateProfile(form);
      updateUser(res.data.user);
      toast.success('Profil mis à jour !');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors de la mise à jour');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (pwd.nouveauMotDePasse !== pwd.confirmer) return toast.error('Les mots de passe ne correspondent pas');
    setLoadingPwd(true);
    try {
      await authAPI.changePassword({
        ancienMotDePasse: pwd.ancienMotDePasse,
        nouveauMotDePasse: pwd.nouveauMotDePasse
      });
      setPwd({ ancienMotDePasse: '', nouveauMotDePasse: '', confirmer: '' });
      toast.success('Mot de passe modifié !');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors du changement');
    } finally {
      setLoadingPwd(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    const loadingToast = toast.loading('Téléchargement de la photo...');
    try {
      const res = await authAPI.updateAvatar(formData);
      updateUser(res.data.user);
      toast.success('Photo de profil mise à jour !', { id: loadingToast });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors du téléchargement', { id: loadingToast });
    }
  };

  return (
    <DashboardLayout role={user?.role || 'user'}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.4em] block mb-2">Paramètres du Compte</span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Gestion du Profil</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Avatar and Summary */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm p-10 text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-24 bg-slate-50 group-hover:bg-green-600 transition-colors duration-700"></div>
              
              <div className="relative inline-block mt-4 mb-6">
                <div className="w-32 h-32 rounded-[2.5rem] bg-white border-8 border-white flex items-center justify-center text-green-600 text-5xl font-black shadow-2xl relative z-10 transition-transform group-hover:scale-105 duration-500 overflow-hidden">
                  {user?.avatar ? (
                    <img 
                      src={`http://localhost:5000${user.avatar}`} 
                      alt={user.nom} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    user?.nom?.charAt(0).toUpperCase()
                  )}
                </div>
                <label className="absolute -bottom-2 -right-2 w-12 h-12 bg-slate-100 rounded-2xl shadow-lg border-4 border-white flex items-center justify-center text-slate-400 hover:bg-green-600 hover:text-white transition-all z-20 active:scale-90 cursor-pointer">
                  <Camera className="w-5 h-5" />
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
              
              <div className="relative z-10">
                <h2 className="font-black text-slate-900 text-xl tracking-tight">{user?.nom}</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2 bg-slate-50 rounded-full px-4 py-1.5 inline-block border border-slate-100">
                   Role: {user?.role === 'admin' ? 'Administrateur' : 'Citoyen'}
                </p>
                
                <div className="mt-10 space-y-2">
                   <div className="flex items-center gap-3 px-6 py-4 bg-green-50 text-green-700 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-green-100">
                      <User size={16} /> Informations
                   </div>
                   <div className="flex items-center gap-3 px-6 py-4 text-slate-400 hover:bg-slate-50 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all cursor-pointer">
                      <Shield size={16} /> Sécurité
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Forms */}
          <div className="lg:col-span-2 space-y-10">
            {/* Basic Info Form */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm p-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                   <User size={24} />
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Coordonnées</h3>
              </div>
              
              <form onSubmit={handleUpdateProfile} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Nom complet</label>
                    <input 
                      type="text" 
                      value={form.nom}
                      onChange={e => setForm({...form, nom: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-green-500/20 text-sm font-bold text-slate-900 transition-all placeholder:text-slate-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email de contact</label>
                    <input 
                      type="email" 
                      disabled
                      value={form.email}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-100 border-none text-sm font-bold text-slate-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Numéro de téléphone</label>
                    <input 
                      type="text" 
                      value={form.telephone}
                      onChange={e => setForm({...form, telephone: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-green-500/20 text-sm font-bold text-slate-900 transition-all placeholder:text-slate-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Adresse de résidence</label>
                    <input 
                      type="text" 
                      value={form.adresse}
                      onChange={e => setForm({...form, adresse: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-green-500/20 text-sm font-bold text-slate-900 transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    disabled={loading}
                    className="bg-green-600 text-white px-10 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-green-700 transition-all shadow-xl shadow-green-100 disabled:opacity-50 active:scale-95"
                  >
                    {loading ? <Loader className="w-5 h-5 animate-spin" /> : <><Check className="w-5 h-5" /> Mettre à jour mon profil</>}
                  </button>
                </div>
              </form>
            </div>

            {/* Password Change Form */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm p-10">
               <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600">
                   <Lock size={24} />
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Sécurité et Accès</h3>
              </div>
              
              <form onSubmit={handleChangePassword} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Mot de passe actuel</label>
                  <input 
                    type="password" 
                    value={pwd.ancienMotDePasse}
                    onChange={e => setPwd({...pwd, ancienMotDePasse: e.target.value})}
                    placeholder="••••••••"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-green-500/20 text-sm font-bold text-slate-900 transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Nouveau mot de passe</label>
                    <input 
                      type="password" 
                      value={pwd.nouveauMotDePasse}
                      onChange={e => setPwd({...pwd, nouveauMotDePasse: e.target.value})}
                      placeholder="Min. 8 caractères"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-green-500/20 text-sm font-bold text-slate-900 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Confirmer le mot de passe</label>
                    <input 
                      type="password" 
                      value={pwd.confirmer}
                      onChange={e => setPwd({...pwd, confirmer: e.target.value})}
                      placeholder="••••••••"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-green-500/20 text-sm font-bold text-slate-900 transition-all"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    disabled={loadingPwd}
                    className="bg-slate-900 text-white px-10 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-slate-200 disabled:opacity-50 active:scale-95"
                  >
                    {loadingPwd ? <Loader className="w-5 h-5 animate-spin" /> : <>Changer mon mot de passe <ArrowRight className="w-5 h-5" /></>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
