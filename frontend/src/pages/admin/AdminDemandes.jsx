import { useState, useEffect } from 'react';
import { demandeAPI } from '../../api';
import { 
  FileText, Search, Filter, MoreHorizontal, 
  Check, X, Eye, ExternalLink, Mail, Clock
} from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const AdminDemandes = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('tous');
  const [search, setSearch] = useState('');
  
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetchDemandes();
  }, [filter]);

  const fetchDemandes = async () => {
    try {
      const res = await demandeAPI.getAll({ statut: filter });
      setDemandes(res.data.demandes);
    } catch (err) {
      toast.error('Erreur chargement demandes');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await demandeAPI.updateStatut(id, { statut: status, commentaireAdmin: comment });
      toast.success('Statut mis à jour !');
      setModalOpen(false);
      setComment('');
      fetchDemandes();
    } catch (err) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const getBadgeStyle = (s) => {
    switch(s) {
      case 'en_attente': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'acceptee': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'refusee': return 'bg-red-100 text-red-700 border-red-200';
      case 'terminee': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const filteredDemandes = demandes.filter(d => 
    d.numero.toLowerCase().includes(search.toLowerCase()) || 
    d.utilisateur?.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 font-['Poppins']">Dossiers et Demandes</h1>
           <p className="text-gray-500">Gérez les demandes administratives entrantes.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="N° de dossier ou nom..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <select 
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="tous">Tout voir</option>
            <option value="en_attente">En attente</option>
            <option value="en_cours">En cours</option>
            <option value="acceptee">Acceptées</option>
            <option value="refusee">Refusées</option>
            <option value="terminee">Terminées</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">N° Dossier</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Citoyen</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Service</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Dépôt</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Statut</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="6" className="p-20 text-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div></td></tr>
              ) : filteredDemandes.length === 0 ? (
                <tr><td colSpan="6" className="p-20 text-center text-gray-400 italic">Aucune demande trouvée</td></tr>
              ) : (
                filteredDemandes.map(d => (
                  <tr key={d._id} className="hover:bg-gray-50/60 transition-colors cursor-pointer group">
                    <td className="px-6 py-4 font-mono text-sm font-bold text-blue-600">{d.numero}</td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-xs font-bold uppercase">{d.utilisateur?.nom.charAt(0)}</div>
                          <div>
                            <p className="text-sm font-bold text-gray-800">{d.utilisateur?.nom}</p>
                            <p className="text-[10px] text-gray-400">{d.utilisateur?.email}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <p className="text-sm font-semibold text-gray-700">{d.service?.nom}</p>
                       <p className="text-[10px] text-gray-400 capitalize">{d.service?.categorie}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                       {format(new Date(d.createdAt), 'dd MMM yyyy', { locale: fr })}
                    </td>
                    <td className="px-6 py-4">
                       <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase ${getBadgeStyle(d.statut)}`}>
                          {d.statut.replace('_', ' ')}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => { setSelectedDemande(d); setModalOpen(true); }}
                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                          >
                             <Eye className="w-4 h-4" />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {modalOpen && selectedDemande && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
           <div onClick={() => setModalOpen(false)} className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"></div>
           <div className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl relative fade-in max-h-[90vh] flex flex-col">
              <div className="p-8 border-b border-gray-100 flex items-start justify-between shrink-0">
                 <div>
                    <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1 block">Détails de l'instruction — {selectedDemande.numero}</span>
                    <h2 className="text-xl font-bold text-gray-900 font-['Poppins']">{selectedDemande.service?.nom}</h2>
                 </div>
                 <button onClick={() => setModalOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors"><X className="w-6 h-6" /></button>
              </div>

              <div className="p-8 space-y-6 overflow-y-auto">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                       <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Demandeur</p>
                       <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <p className="text-sm font-bold">{selectedDemande.utilisateur?.nom}</p>
                       </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                       <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Statut Actuel</p>
                       <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border uppercase ${getBadgeStyle(selectedDemande.statut)}`}>
                         {selectedDemande.statut.replace('_', ' ')}
                       </span>
                    </div>
                 </div>

                 <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Justificatifs</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                       {selectedDemande.documents.map((doc, i) => (
                          <a 
                            key={i} 
                            href={`/uploads/${doc.chemin}`} 
                            target="_blank" 
                            className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all group"
                          >
                             <FileText className="w-5 h-5 text-gray-300 group-hover:text-blue-500" />
                             <span className="text-xs font-bold text-gray-700 truncate">{doc.nom}</span>
                             <ExternalLink className="w-3 h-3 text-gray-300 ml-auto" />
                          </a>
                       ))}
                       {selectedDemande.documents.length === 0 && <p className="text-xs text-gray-400 italic">Aucune PJ fournie</p>}
                    </div>
                 </div>

                 <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Ajouter un commentaire / Réponse au citoyen</h4>
                    <textarea 
                       value={comment}
                       onChange={e => setComment(e.target.value)}
                       className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                       placeholder="Ex: Le dossier est complet, nous procédons à l'édition de votre document..."
                       rows="3"
                    ></textarea>
                 </div>
              </div>

              <div className="p-8 border-t border-gray-100 bg-gray-50/50 flex flex-wrap gap-3 shrink-0 rounded-b-[2rem]">
                 <button 
                   onClick={() => handleUpdateStatus(selectedDemande._id, 'acceptee')}
                   className="flex-1 bg-emerald-600 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all"
                 >
                    <Check className="w-4 h-4" /> Accepter le dossier
                 </button>
                 <button 
                    onClick={() => handleUpdateStatus(selectedDemande._id, 'refusee')}
                   className="flex-1 bg-red-600 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all"
                 >
                    <X className="w-4 h-4" /> Rejeter
                 </button>
                 <button 
                    onClick={() => handleUpdateStatus(selectedDemande._id, 'terminee')}
                    className="flex-1 bg-gray-900 text-white py-3 rounded-2xl font-bold hover:bg-black transition-all"
                 >
                    Clôturer
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDemandes;
