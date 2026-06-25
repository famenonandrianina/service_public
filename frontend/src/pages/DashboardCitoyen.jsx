import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { demandeAPI } from '../api';
import { 
  FileText, Clock, CheckCircle, Plus, 
  ChevronRight, Calendar, Mail, ShieldCheck, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const DashboardCitoyen = () => {
  const { user } = useAuth();
  const [demandes, setDemandes] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    en_attente: 0,
    terminee: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDemandes();
  }, []);

  const fetchDemandes = async () => {
    try {
      const res = await demandeAPI.getMes();
      setDemandes(res.data.demandes || []);
      
      const newStats = (res.data.demandes || []).reduce((acc, d) => {
        acc.total++;
        if (d.statut === 'en_attente') acc.en_attente++;
        if (d.statut === 'terminee') acc.terminee++;
        return acc;
      }, { total: 0, en_attente: 0, terminee: 0 });
      
      setStats(newStats);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (statut) => {
    switch (statut) {
      case 'en_attente': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'en_cours': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'acceptee': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'refusee': return 'bg-red-50 text-red-600 border-red-100';
      case 'terminee': return 'bg-slate-50 text-slate-500 border-slate-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <DashboardLayout role="user">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[10px] font-bold text-green-600 uppercase tracking-[0.3em] block mb-2">Tableau de Bord Personnel</span>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight font-['Poppins']">
              Ravi de vous revoir,<br/>{user?.nom} 👋
            </h1>
          </div>
          <Link 
            to="/nouvelle-demande" 
            className="inline-flex items-center justify-center gap-3 bg-green-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-green-700 transition-all shadow-xl shadow-green-200 group active:scale-95"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Nouvelle Démarche
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Demandes Totales', value: stats.total, icon: <FileText/>, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'En Instruction', value: stats.en_attente, icon: <Clock/>, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Dossiers Clôturés', value: stats.terminee, icon: <CheckCircle/>, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6 group hover:shadow-lg transition-all duration-500">
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-slate-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Recent Demandes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
                <h2 className="font-black text-slate-900 uppercase tracking-tight">Dernières Activités</h2>
                <Link to="/mes-demandes" className="text-xs font-bold text-green-600 hover:underline flex items-center gap-1 group">
                  Voir tout l'historique <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="divide-y divide-slate-50">
                {loading ? (
                  <div className="p-20 flex justify-center">
                    <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : demandes.length === 0 ? (
                  <div className="p-20 text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-slate-200">
                      <FileText size={40} />
                    </div>
                    <p className="text-slate-400 font-bold mb-6">Aucun dossier en cours</p>
                    <Link to="/services" className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-widest hover:bg-green-600 transition-colors">
                      Consulter les services
                    </Link>
                  </div>
                ) : (
                  demandes.slice(0, 4).map((demande) => (
                    <Link 
                      key={demande._id} 
                      to={`/demande/${demande._id}`}
                      className="p-8 hover:bg-slate-50/80 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-6">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
                          demande.service?.categorie === 'identite' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          <FileText />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 group-hover:text-green-700 transition-colors">{demande.service?.nom}</h3>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mt-1">
                            Ref: {demande.numero?.substring(0, 8)} • {format(new Date(demande.createdAt), 'dd MMM yyyy', { locale: fr })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(demande.statut)}`}>
                          {demande.statut?.replace('_', ' ')}
                        </span>
                        <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-green-600 group-hover:text-white group-hover:border-green-600 transition-all duration-300 shadow-sm">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Quick Help / Info Sidebar */}
          <div className="space-y-8">
             <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-slate-900/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                <h3 className="text-xl font-bold mb-4 relative z-10">Besoin d'un<br/>accompagnement ?</h3>
                <p className="text-slate-400 text-sm mb-8 relative z-10 leading-relaxed font-medium">
                  Nos agents vous accueillent à la Maison France Services pour toute aide numérique ou administrative.
                </p>
                <div className="space-y-4 relative z-10">
                   <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
                      <Mail className="w-4 h-4 text-green-500" /> Dembénimairie@gmail.com
                   </div>
                   <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
                      <ShieldCheck className="w-4 h-4 text-green-500" /> 02 69 61 11 11
                   </div>
                </div>
             </div>

             <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
                <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-6">Liens Utiles</h4>
                <div className="space-y-4">
                  {[
                    { label: 'Guide des démarches', path: '/demarches' },
                    { label: 'Signaler un problème', path: '/reclamations' },
                    { label: 'Modifier mon profil', path: '/profile' },
                  ].map((l, i) => (
                    <Link key={i} to={l.path} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
                       <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">{l.label}</span>
                       <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-green-600 transition-colors" />
                    </Link>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardCitoyen;
