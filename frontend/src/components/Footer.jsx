import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  MapPin, Phone, Mail, ChevronRight, Globe, Shield 
} from 'lucide-react';

const Footer = () => {
  const { user } = useAuth();
  return (
    <footer className="bg-gradient-to-b from-green-900 to-green-950 pt-24 pb-12 overflow-hidden relative">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-secondary/5 rounded-full blur-[80px] -ml-32 -mb-32"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 pb-20 border-b border-white/5">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-8">
               <div className="bg-white p-1 rounded-lg">
                  <img src="/images/logo_dembeni.png" alt="Dembéni" className="h-10 w-auto" />
               </div>
               <div className="text-white">
                  <span className="text-xl font-black tracking-tighter block leading-none">DEMBÉNI</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Services Publics</span>
               </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-10">
              Modernisation de l'accès aux droits et aux services administratifs pour tous les citoyens de la commune de Dembéni.
            </p>
            <div className="flex items-center gap-4">
              {[Globe, Globe, Globe, Globe].map((Icon, i) => (
                 <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-brand-primary transition-all border border-white/10 group">
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                 </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-widest text-[13px] border-l-4 border-brand-secondary pl-4">Liens Utiles</h4>
            <ul className="space-y-4">
              <li><Link to="/services" className="text-slate-400 text-sm hover:text-white flex items-center gap-2 group"><ChevronRight className="w-4 h-4 text-brand-primary group-hover:translate-x-1 transition-transform" /> Catalogue des Services</Link></li>
              <li><Link to="/nouvelle-demande" className="text-slate-400 text-sm hover:text-white flex items-center gap-2 group"><ChevronRight className="w-4 h-4 text-brand-primary group-hover:translate-x-1 transition-transform" /> Déposer une Demande</Link></li>
              <li><Link to="/annonces" className="text-slate-400 text-sm hover:text-white flex items-center gap-2 group"><ChevronRight className="w-4 h-4 text-brand-primary group-hover:translate-x-1 transition-transform" /> Actualités Communales</Link></li>
              {user?.role === 'admin' && (
                <li><Link to="/admin" className="text-emerald-400 text-sm font-bold hover:text-white flex items-center gap-2 group italic underlineDecoration-dotted"><Shield className="w-4 h-4" /> Administration Mairie</Link></li>
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-widest text-[13px] border-l-4 border-brand-primary pl-4">Nos Services</h4>
            <ul className="space-y-4">
              {['État Civil', 'Urbanisme & Travaux', 'Action Sociale', 'Scolaire & Périscolaire', 'Élections'].map((link) => (
                <li key={link}>
                   <Link to="#" className="text-slate-400 text-sm hover:text-white flex border-b border-transparent hover:border-brand-primary/30 pb-1 w-fit transition-all">
                    {link}
                   </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-widest text-[13px] border-l-4 border-emerald-400 pl-4">Hôtel de Ville</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-brand-primary">
                   <MapPin className="w-5 h-5" />
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  2 Avenue de la Mairie, <br />97660 Dembéni, Mayotte
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-brand-secondary">
                   <Phone className="w-5 h-5" />
                </div>
                <p className="text-slate-400 text-sm">02 69 61 12 12</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-emerald-400">
                   <Mail className="w-5 h-5" />
                </div>
                <p className="text-slate-400 text-sm">Dembénimairie@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-slate-500 text-xs font-medium">
            © {new Date().getFullYear()} Mairie de Dembéni. Tous droits réservés. <span className="mx-2">|</span> Mentions Légales
          </p>
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
                <Shield className="w-4 h-4 text-brand-primary" /> Plateforme Sécurisée
             </div>
             <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
                <Globe className="w-4 h-4 text-brand-secondary" /> Gouvernement de la République
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
