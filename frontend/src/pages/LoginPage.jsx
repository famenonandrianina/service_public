import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { X, User, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [role, setRole] = useState('citoyen');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(email, motDePasse);
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Identifiants invalides');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-['Outfit',sans-serif] overflow-hidden relative">
      
      {/* Background Blobs for the right side (visible behind the glass) */}
      <div className="absolute top-0 right-0 w-[55%] h-full overflow-hidden pointer-events-none">
        {/* Soft colorful gradients as seen in the image */}
        <div className="absolute top-[-10%] right-[10%] w-[40rem] h-[40rem] bg-green-400 rounded-full blur-[100px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[35rem] h-[35rem] bg-red-400 rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute top-[30%] right-[20%] w-80 h-80 bg-emerald-300 rounded-full blur-[90px] opacity-20"></div>
      </div>

      {/* Left Area - Solid Light Mint with Curved Border */}
      <div className="w-[45%] bg-[#ecf7ed] relative z-20 flex flex-col justify-between p-12 lg:p-20 border-r-[35px] border-[#1a4d2e] rounded-tr-[120px] rounded-br-[120px] shadow-[25px_0_60px_rgba(0,0,0,0.08)]">
        
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <div className="p-1 bg-white rounded-lg shadow-sm">
            <img src="/images/logo_dembeni.png" alt="Dembéni" className="h-10 w-auto" />
          </div>
          <div className="text-[#1a4d2e] font-black text-2xl tracking-tighter uppercase">
            DEMBENI
          </div>
        </div>
        
        {/* Welcome Text */}
        <div className="mt-10">
          <h1 className="text-6xl lg:text-8xl font-black text-[#1a4d2e] leading-tight mb-10 tracking-tighter">
            Bienvenue<br />
            <span className="text-[#e3342f]">de retour...</span>
          </h1>
          <p className="text-slate-500 font-semibold text-lg tracking-tight">
            Nouveau citoyen ? <Link to="/register" className="text-[#e3342f] hover:text-red-700 underline underline-offset-4 ml-1 transition-colors">S'inscrire ici</Link>
          </p>
        </div>

        {/* Footer Text */}
        <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          © 2026 Admin Dembeni
        </div>

        {/* The circular X Button on the border */}
        <Link 
          to="/" 
          className="absolute -right-[62px] top-1/2 -translate-y-1/2 w-14 h-14 bg-[#e3342f] rounded-full flex items-center justify-center text-white shadow-xl hover:bg-red-700 transition-all hover:scale-110 z-50 group border-4 border-white/10"
          title="Retour à l'accueil"
        >
          <X className="w-6 h-6 stroke-[3] group-hover:rotate-90 transition-transform duration-500" />
        </Link>
      </div>

      {/* Right Area - Glassmorphism Form Area */}
      <div className="flex-1 relative flex items-center justify-center p-8 bg-transparent">
        
        <div className="relative w-full max-w-lg z-30">
          <div className="bg-white/40 backdrop-blur-[40px] border border-white/50 p-12 lg:p-16 rounded-[4rem] shadow-[0_40px_80px_rgba(0,0,0,0.12)] relative overflow-hidden">
            
            {/* Inner red glow */}
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-red-400/20 rounded-full blur-[80px]"></div>

            <h2 className="text-2xl lg:text-3xl font-bold text-[#1a4d2e] text-center mb-16 leading-tight tracking-tight">
              Connectez-vous pour<br />continuer
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative">
                <input 
                  type="text"
                  required
                  placeholder="Utilisateur ou Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-10 py-6 rounded-full bg-white/80 border border-white/20 focus:ring-4 focus:ring-green-500/20 text-slate-800 placeholder-slate-400 font-medium shadow-inner transition-all outline-none"
                />
              </div>

              <div className="relative">
                <input 
                  type="password"
                  required
                  placeholder="Mot de passe"
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  className="w-full px-10 py-6 rounded-full bg-white/80 border border-white/20 focus:ring-4 focus:ring-green-500/20 text-slate-800 placeholder-slate-400 font-medium shadow-inner transition-all outline-none"
                />
              </div>

              <div className="flex items-center justify-between px-4">
                <label className="flex items-center gap-3 text-slate-600 cursor-pointer font-semibold text-sm">
                  <input type="checkbox" className="rounded-md border-slate-300 text-green-600 focus:ring-green-600/20 w-5 h-5 transition-all shadow-sm" />
                  Se souvenir de moi
                </label>
                <Link to="#" className="text-[#e3342f] hover:text-red-700 font-bold text-sm transition-colors">
                  Mot de passe oublié ?
                </Link>
              </div>

              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#2e8b44] text-white py-6 rounded-[2rem] font-black tracking-[0.2em] shadow-[0_15px_30px_rgba(46,139,68,0.3)] hover:-translate-y-1 hover:bg-[#257036] transition-all duration-300 disabled:opacity-50 uppercase text-lg"
                >
                  {loading ? 'Connexion...' : 'LOGIN'}
                </button>
              </div>

              {/* Simplified Role Selector (optional, kept for functionality but made discreet) */}
              <div className="pt-4 flex justify-center gap-4">
                <button 
                  type="button" 
                  onClick={() => setRole(role === 'citoyen' ? 'admin' : 'citoyen')}
                  className="text-xs font-bold text-slate-400 hover:text-green-600 transition-colors uppercase tracking-widest"
                >
                  Passer en mode {role === 'citoyen' ? 'Administrateur' : 'Citoyen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
