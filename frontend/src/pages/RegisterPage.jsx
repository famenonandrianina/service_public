import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { X, User, Mail, Lock, Phone, MapPin, UserPlus, ArrowRight, ShieldCheck, Landmark } from 'lucide-react';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    motDePasse: '',
    confirmPassword: '',
    role: 'citoyen'
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.motDePasse !== formData.confirmPassword) {
      return toast.error('Les mots de passe ne correspondent pas');
    }
    setLoading(true);
    try {
      const registrationData = {
        ...formData,
        nom: `${formData.prenom} ${formData.nom}`.trim()
      };
      const user = await register(registrationData);
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors de l’inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-['Poppins'] overflow-hidden relative">
      
      {/* Background Blobs for the right side */}
      <div className="absolute top-0 right-0 w-[60%] h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-96 h-96 bg-green-500 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-[20%] right-[30%] w-[30rem] h-[30rem] bg-red-500 rounded-full blur-[140px] opacity-15"></div>
      </div>

      {/* Left Area - Gradient with Curved Edge */}
      <div className="hidden lg:flex w-[40%] bg-gradient-to-br from-green-50 via-white to-red-50 relative z-20 flex-col justify-between p-16 border-r-[40px] border-green-900 rounded-tr-[150px] rounded-br-[150px] shadow-[20px_0_50px_rgba(0,0,0,0.05)]">
        
        <div className="flex items-center gap-4">
          <div className="bg-white p-1.5 rounded-xl shadow-sm">
            <img src="/images/logo_dembeni.png" alt="Dembéni" className="h-10 w-auto" />
          </div>
          <div className="text-green-950 font-black text-2xl tracking-tighter uppercase">
            DEMBENI
          </div>
        </div>
        
        <div className="mt-10">
          <h1 className="text-6xl font-black text-green-950 leading-[1.1] mb-8 tracking-tighter">
            Créez votre<br />
            compte...
          </h1>
          <p className="text-slate-500 font-bold text-sm tracking-tight">
            Déjà inscrit ? <Link to="/login" className="text-red-500 hover:underline ml-2 font-black uppercase tracking-widest text-[10px]">Se connecter ici</Link>
          </p>
        </div>

        <div className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
          © 2026 Admin Dembeni
        </div>

        <Link 
          to="/" 
          className="absolute -right-[62px] top-1/2 -translate-y-1/2 w-11 h-11 bg-red-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:bg-red-700 transition-all hover:rotate-90 z-50 group"
          title="Retour à l'accueil"
        >
          <X className="w-5 h-5 stroke-[4]" />
        </Link>
      </div>

      {/* Right Area - Glassmorphism Form Area */}
      <div className="flex-1 relative flex items-center justify-center p-8 bg-transparent overflow-hidden">
        
        <div className="relative w-full max-w-xl z-30">
          <div className="bg-white/30 backdrop-blur-2xl border border-white/40 p-10 md:p-14 rounded-[4rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)] relative">
            
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-green-400/20 rounded-full blur-3xl"></div>

            <h2 className="text-3xl font-black text-green-950 text-center mb-8 leading-tight tracking-tighter uppercase">
              Inscription {formData.role}
            </h2>

            {/* Role Switcher */}
            <div className="flex bg-gray-100/50 p-1.5 rounded-2xl mb-8 border border-white/20 max-w-sm mx-auto">
              <button 
                type="button"
                onClick={() => setFormData({...formData, role: 'citoyen'})}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.role === 'citoyen' ? 'bg-white text-green-700 shadow-md transform scale-105' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <User className="w-4 h-4" /> Citoyen
              </button>
              <button 
                type="button"
                onClick={() => setFormData({...formData, role: 'admin'})}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.role === 'admin' ? 'bg-white text-green-900 shadow-md transform scale-105' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <ShieldCheck className="w-4 h-4" /> Admin
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  required placeholder="Prénom" 
                  value={formData.prenom} 
                  onChange={e => setFormData({...formData, prenom: e.target.value})} 
                  className="w-full px-6 py-4 rounded-3xl bg-white border-none focus:ring-4 focus:ring-green-500/10 text-slate-800 placeholder-slate-400 font-medium shadow-sm transition-all text-sm"
                />
                <input 
                  required placeholder="Nom" 
                  value={formData.nom} 
                  onChange={e => setFormData({...formData, nom: e.target.value})} 
                  className="w-full px-6 py-4 rounded-3xl bg-white border-none focus:ring-4 focus:ring-green-500/10 text-slate-800 placeholder-slate-400 font-medium shadow-sm transition-all text-sm"
                />
              </div>

              <input 
                required type="email" placeholder="Email" 
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})} 
                className="w-full px-8 py-4 rounded-full bg-white border-none focus:ring-4 focus:ring-green-500/10 text-slate-800 placeholder-slate-400 font-medium shadow-sm transition-all text-sm"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  required type="password" placeholder="Mot de passe" 
                  value={formData.motDePasse} 
                  onChange={e => setFormData({...formData, motDePasse: e.target.value})} 
                  className="w-full px-8 py-4 rounded-full bg-white border-none focus:ring-4 focus:ring-green-500/10 text-slate-800 placeholder-slate-400 font-medium shadow-sm transition-all text-sm"
                />
                <input 
                  required type="password" placeholder="Confirmation" 
                  value={formData.confirmPassword} 
                  onChange={e => setFormData({...formData, confirmPassword: e.target.value})} 
                  className="w-full px-8 py-4 rounded-full bg-white border-none focus:ring-4 focus:ring-green-500/10 text-slate-800 placeholder-slate-400 font-medium shadow-sm transition-all text-sm"
                />
              </div>

              <div className="pt-6 text-center">
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`w-full text-white py-5 rounded-full font-black tracking-[0.2em] shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 uppercase text-sm ${formData.role === 'admin' ? 'bg-green-950 shadow-green-900/20' : 'bg-[#34a853] shadow-green-900/10 hover:bg-[#2d9147]'}`}
                >
                  {loading ? 'Création...' : `S'INSCRIRE EN TANT QU'${formData.role.toUpperCase()}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
