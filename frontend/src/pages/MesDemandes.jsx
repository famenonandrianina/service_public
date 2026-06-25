import { useState, useEffect } from 'react';
import { demandeAPI } from '../api';
import { 
  FileText, Search, Filter, ChevronRight, 
  Clock, CheckCircle, XCircle, FileSearch,
  Calendar, AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const MesDemandes = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('tous');

  useEffect(() => {
    fetchDemandes();
  }, [filter]);

  const fetchDemandes = async () => {
    try {
      const res = await demandeAPI.getMes({ statut: filter });
      setDemandes(res.data.demandes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (s) => {
    switch(s) {
      case 'en_attente': return { label: 'En attente', color: 'bg-amber-50 text-amber-600 border-amber-100', icon: Clock };
      case 'en_cours': return { label: 'En cours d\'instruction', color: 'bg-blue-50 text-blue-600 border-blue-100', icon: Clock };
      case 'acceptee': return { label: 'Acceptée', color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: CheckCircle };
      case 'refusee': return { label: 'Refusée', color: 'bg-red-50 text-red-600 border-red-100', icon: XCircle };
      case 'terminee': return { label: 'Dossier Clôturé', color: 'bg-slate-50 text-slate-500 border-slate-100', icon: CheckCircle };
      default: return { label: s, color: 'bg-slate-50 text-slate-500 border-slate-100', icon: AlertCircle };
    }
  };

  return (
    <DashboardLayout role="user">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
           <div>
              <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.4em] block mb-2">Historique des Services</span>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Mes Démarches</h1>
           </div>
           <Link 
             to="/nouvelle-demande"
             className="px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold shadow-xl shadow-slate-200 hover:bg-green-600 transition-all flex items-center justify-center gap-3 active:scale-95 group"
           >
              Nouvelle demande <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2 mb-10 bg-white p-3 rounded-[1.5rem] border border-slate-100 shadow-sm w-fit">
           {['tous', 'en_attente', 'en_cours', 'acceptee', 'terminee'].map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === tab ? 'bg-green-600 text-white shadow-lg shadow-green-100' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                }`}
              >
                {tab.replace('_', ' ')}
              </button>
           ))}
        </div>

        {loading ? (
           <div className="space-y-6">
              {[1,2,3].map(i => <div key={i} className="h-32 bg-white rounded-[2.5rem] animate-pulse border border-slate-50 shadow-sm"></div>)}
           </div>
        ) : demandes.length === 0 ? (
           <div className="bg-white rounded-[3rem] p-24 text-center border-4 border-dashed border-slate-50">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100 text-slate-200">
                <FileSearch size={48} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-4">Aucun dossier trouvé</h2>
              <p className="text-slate-400 font-medium mb-10 max-w-sm mx-auto">Vous n'avez pas encore de démarches correspondant à ce statut dans votre historique.</p>
              <Link to="/services" className="text-green-600 font-black border-b-4 border-green-600/20 pb-1 hover:border-green-600 transition-all text-sm uppercase tracking-widest">Parcourir le catalogue</Link>
           </div>
        ) : (
           <div className="space-y-4">
              {demandes.map(d => {
                 const status = getStatusInfo(d.statut);
                 const Icon = status.icon;
                 return (
                    <Link 
                      key={d._id}
                      to={`/demande/${d._id}`}
                      className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col md:flex-row items-center gap-8 group"
                    >
                       <div className={`w-16 h-16 rounded-[1.5rem] shrink-0 group-hover:scale-110 transition-transform flex items-center justify-center text-3xl ${
                          d.service?.categorie === 'identite' ? 'bg-indigo-50 text-indigo-600' :
                          d.service?.categorie === 'etat-civil' ? 'bg-emerald-50 text-emerald-600' :
                          'bg-amber-50 text-amber-600'
                       }`}>
                          <FileText />
                       </div>

                       <div className="flex-1 text-center md:text-left">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">REF: {d.numero?.substring(0, 8)}</p>
                          <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-green-700 transition-colors">{d.service?.nom}</h3>
                          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                             <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                <Calendar className="w-4 h-4 text-slate-300" /> Déposé le {format(new Date(d.createdAt), 'dd MMMM yyyy', { locale: fr })}
                             </div>
                             <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                <Clock className="w-4 h-4 text-slate-300" /> {d.documents?.length || 0} document(s) joint(s)
                             </div>
                          </div>
                       </div>

                       <div className="shrink-0 flex items-center gap-8">
                          <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border font-black text-[10px] uppercase tracking-[0.2em] ${status.color}`}>
                             <Icon className="w-4 h-4" /> {status.label}
                          </div>
                          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 group-hover:bg-green-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-green-100 transition-all duration-500">
                             <ChevronRight className="w-6 h-6" />
                          </div>
                       </div>
                    </Link>
                 );
              })}
           </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MesDemandes;
