import { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiUser, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    service: 'etat-civil',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      from_name: formData.nom,
      from_email: formData.email,
      phone: formData.telephone,
      service: formData.service,
      message: formData.message
    };

    // NOTE: Pour que cela fonctionne, vous devez configurer vos identifiants EmailJS
    // dans un fichier .env (VITE_EMAILJS_SERVICE_ID, etc.)
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_id', 
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_id', 
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key'
    ).then(() => {
      toast.success('Message envoyé ! Nous vous répondrons bientôt.', {
        style: {
          borderRadius: '20px',
          background: '#064e3b',
          color: '#fff',
          fontFamily: 'Poppins',
          fontWeight: '700'
        },
      });
      setFormData({ nom: '', email: '', telephone: '', service: 'etat-civil', message: '' });
      setLoading(false);
    }).catch((error) => {
      console.error('EmailJS Error:', error);
      toast.error('Une erreur est survenue lors de l\'envoi.');
      setLoading(false);
    });
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-['Outfit',sans-serif] overflow-hidden relative">
      
      {/* Background Blobs for the right side (visible behind the glass) */}
      <div className="absolute top-0 right-0 w-[55%] h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[40rem] h-[40rem] bg-green-400 rounded-full blur-[100px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[35rem] h-[35rem] bg-red-400 rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute top-[30%] right-[20%] w-80 h-80 bg-emerald-300 rounded-full blur-[90px] opacity-20"></div>
      </div>

      {/* Left Area - Solid Light Mint with Curved Border (Mirroring Login) */}
      <div className="w-[45%] bg-[#ecf7ed] relative z-20 flex flex-col justify-between p-12 lg:p-20 border-r-[35px] border-[#1a4d2e] rounded-tr-[120px] rounded-br-[120px] shadow-[25px_0_60px_rgba(0,0,0,0.08)]">
        
        {/* Header Section */}
        <div className="flex items-center gap-4">
          <div className="p-1 bg-white rounded-lg shadow-sm">
            <img src="/images/logo_dembeni.png" alt="Dembéni" className="h-10 w-auto" />
          </div>
          <div className="text-[#1a4d2e] font-black text-2xl tracking-tighter uppercase">
            DEMBENI
          </div>
        </div>
        
        {/* Contact Info Text */}
        <div className="mt-10">
          <h1 className="text-6xl lg:text-7xl font-black text-[#1a4d2e] leading-tight mb-8 tracking-tighter">
            Besoin d'un<br />
            <span className="text-[#e3342f]">renseignement ?</span>
          </h1>
          
          <div className="space-y-6 mt-8">
            <div className="flex items-center gap-4 text-slate-600 font-bold">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1a4d2e] shadow-sm">
                <FiMapPin />
              </div>
              <p className="text-sm">Place de la Mairie, 97660 Dembéni</p>
            </div>
            <div className="flex items-center gap-4 text-slate-600 font-bold">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#e3342f] shadow-sm">
                <FiPhone />
              </div>
              <p className="text-sm">02 69 61 11 11</p>
            </div>
            <div className="flex items-center gap-4 text-slate-600 font-bold">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-emerald-500 shadow-sm">
                <FiMail />
              </div>
              <p className="text-sm">mairie@dembeni.yt</p>
            </div>
          </div>

          <div className="mt-12 bg-white/50 p-6 rounded-[2rem] border border-white inline-block">
            <p className="text-[#1a4d2e] font-black text-xs uppercase tracking-widest mb-2">Horaires d'ouverture</p>
            <p className="text-slate-600 font-bold text-sm">Lundi au Vendredi : 07:30 — 15:30</p>
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          © 2026 Admin Dembeni
        </div>

        {/* The circular Back Button on the border */}
        <Link 
          to="/" 
          className="absolute -right-[62px] top-1/2 -translate-y-1/2 w-14 h-14 bg-[#e3342f] rounded-full flex items-center justify-center text-white shadow-xl hover:bg-red-700 transition-all hover:scale-110 z-50 group border-4 border-white/10"
          title="Retour à l'accueil"
        >
          <FiArrowLeft className="w-6 h-6 stroke-[3] group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Right Area - Glassmorphism Form Area */}
      <div className="flex-1 relative flex items-center justify-center p-8 bg-transparent">
        
        <div className="relative w-full max-w-xl z-30">
          <div className="bg-white/40 backdrop-blur-[40px] border border-white/50 p-12 lg:p-14 rounded-[4rem] shadow-[0_40px_80px_rgba(0,0,0,0.12)] relative overflow-hidden">
            
            {/* Inner red glow */}
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-red-400/20 rounded-full blur-[80px]"></div>

            <h2 className="text-2xl lg:text-3xl font-bold text-[#1a4d2e] text-center mb-12 leading-tight tracking-tight">
              Envoyez-nous un<br />message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text"
                  required
                  placeholder="Votre Nom"
                  value={formData.nom}
                  onChange={(e) => setFormData({...formData, nom: e.target.value})}
                  className="w-full px-8 py-5 rounded-full bg-white/80 border border-white/20 focus:ring-4 focus:ring-green-500/20 text-slate-800 placeholder-slate-400 font-medium shadow-inner transition-all outline-none"
                />
                <input 
                  type="email"
                  required
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-8 py-5 rounded-full bg-white/80 border border-white/20 focus:ring-4 focus:ring-green-500/20 text-slate-800 placeholder-slate-400 font-medium shadow-inner transition-all outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="tel"
                  placeholder="Téléphone"
                  value={formData.telephone}
                  onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                  className="w-full px-8 py-5 rounded-full bg-white/80 border border-white/20 focus:ring-4 focus:ring-green-500/20 text-slate-800 placeholder-slate-400 font-medium shadow-inner transition-all outline-none"
                />
                <select 
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                  className="w-full px-8 py-5 rounded-full bg-white/80 border border-white/20 focus:ring-4 focus:ring-green-500/20 text-slate-900 font-bold shadow-inner outline-none appearance-none transition-all cursor-pointer"
                >
                  <option value="etat-civil">État Civil</option>
                  <option value="social">Action Sociale</option>
                  <option value="autre">Autre demande</option>
                </select>
              </div>

              <div className="relative">
                <textarea 
                  rows="4" 
                  required
                  placeholder="Votre message..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-8 py-6 rounded-[2.5rem] bg-white/80 border border-white/20 focus:ring-4 focus:ring-green-500/20 text-slate-800 placeholder-slate-400 font-medium shadow-inner transition-all outline-none resize-none"
                ></textarea>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#2e8b44] text-white py-5 rounded-[2rem] font-black tracking-[0.2em] shadow-[0_15px_30px_rgba(46,139,68,0.3)] hover:-translate-y-1 hover:bg-[#257036] transition-all duration-300 disabled:opacity-50 uppercase text-lg flex items-center justify-center gap-4"
                >
                  {loading ? 'ENVOI...' : <>{'ENVOYER'} <FiSend className="text-xl" /></>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
