import { useState, useEffect } from 'react';
import { serviceAPI } from '../../api';
import { 
  Plus, Search, Edit2, Trash2, Settings, 
  X, Check, Loader, FileText, Info, Clock 
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const initialForm = {
    nom: '',
    description: '',
    categorie: 'etat-civil',
    delaiTraitement: '5-10 jours ouvrables',
    documentsRequis: []
  };
  const [form, setForm] = useState(initialForm);
  const [docInput, setDocInput] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await serviceAPI.getAll();
      setServices(res.data.services);
    } catch (err) {
      toast.error('Erreur chargement services');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await serviceAPI.update(editingId, form);
        toast.success('Service mis à jour');
      } else {
        await serviceAPI.create(form);
        toast.success('Nouveau service ajouté');
      }
      setModalOpen(false);
      setEditingId(null);
      setForm(initialForm);
      fetchServices();
    } catch (err) {
      toast.error('Erreur lors de l’enregistrement');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ce service ? Cette action est irréversible.')) {
      try {
        await serviceAPI.delete(id);
        toast.success('Service supprimé');
        fetchServices();
      } catch (err) {
        toast.error('Erreur suppression');
      }
    }
  };

  const startEdit = (s) => {
    setEditingId(s._id);
    setForm({
      nom: s.nom,
      description: s.description,
      categorie: s.categorie,
      delaiTraitement: s.delaiTraitement,
      documentsRequis: s.documentsRequis
    });
    setModalOpen(true);
  };

  const addDoc = () => {
    if (!docInput.trim()) return;
    setForm({...form, documentsRequis: [...form.documentsRequis, docInput.trim()]});
    setDocInput('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 font-['Poppins']">Catalogue des Services</h1>
           <p className="text-gray-500">Gérez le catalogue des actes administratifs.</p>
        </div>
        <button 
          onClick={() => { setEditingId(null); setForm(initialForm); setModalOpen(true); }}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
        >
           <Plus className="w-5 h-5" /> Nouveau Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1,2,3].map(i => <div key={i} className="h-64 bg-white rounded-3xl animate-pulse"></div>)
        ) : (
          services.map(s => (
            <div key={s._id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden">
               <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-gray-50 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                     <FileText className="w-8 h-8" />
                  </div>
                  <div className="flex gap-1">
                     <button onClick={() => startEdit(s)} className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><Edit2 className="w-4 h-4" /></button>
                     <button onClick={() => handleDelete(s._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
               </div>
               <h3 className="font-bold text-lg text-gray-900 mb-2 truncate">{s.nom}</h3>
               <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-4">{s.categorie.replace('-', ' ')}</p>
               <p className="text-sm text-gray-500 line-clamp-2 mb-6 leading-relaxed">{s.description}</p>
               <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">DOCS: {s.documentsRequis.length}</span>
                  <span className="flex items-center gap-1.5 text-xs text-blue-600 font-bold"><Clock className="w-3 h-3" /> {s.delaiTraitement}</span>
               </div>
            </div>
          ))
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           <div onClick={() => setModalOpen(false)} className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"></div>
           <form onSubmit={handleCreateOrUpdate} className="bg-white rounded-[2rem] w-full max-w-xl shadow-2xl relative fade-in max-h-[90vh] overflow-y-auto">
              <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                 <h2 className="text-xl font-bold text-gray-900 font-['Poppins']">{editingId ? 'Modifier Service' : 'Créer un Service'}</h2>
                 <button type="button" onClick={() => setModalOpen(false)} className="p-2 rounded-xl hover:bg-gray-100"><X className="w-6 h-6" /></button>
              </div>

              <div className="p-8 space-y-6">
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Dénomination du service</label>
                    <input 
                      type="text" 
                      required
                      value={form.nom}
                      onChange={e => setForm({...form, nom: e.target.value})}
                      className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Ex: Acte de Naissance - Copie intégrale"
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Catégorie</label>
                       <select 
                         value={form.categorie}
                         onChange={e => setForm({...form, categorie: e.target.value})}
                         className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 text-sm cursor-pointer"
                       >
                          <option value="identite">Identité</option>
                          <option value="etat-civil">État Civil</option>
                          <option value="urbanisme">Urbanisme</option>
                          <option value="social">Social</option>
                          <option value="fiscal">Fiscal</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Délai estimé</label>
                       <input 
                         type="text" 
                         value={form.delaiTraitement}
                         onChange={e => setForm({...form, delaiTraitement: e.target.value})}
                         className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 text-sm"
                         placeholder="5-10 jours"
                       />
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Description / Instructions</label>
                    <textarea 
                      required
                      value={form.description}
                      onChange={e => setForm({...form, description: e.target.value})}
                      className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Détails sur la procédure..."
                      rows="3"
                    ></textarea>
                 </div>

                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Documents requis (Checklist)</label>
                    <div className="flex gap-2 mb-3">
                       <input 
                         type="text" 
                         className="flex-1 p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 text-sm" 
                         placeholder="Ex: Pièce d'identité, Justificatif..." 
                         value={docInput}
                         onChange={e => setDocInput(e.target.value)}
                         onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addDoc())}
                       />
                       <button type="button" onClick={addDoc} className="bg-blue-600 text-white w-14 rounded-2xl flex items-center justify-center shadow-lg"><Plus /></button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                       {form.documentsRequis.map((doc, i) => (
                          <span key={i} className="bg-gray-100 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-600 flex items-center gap-2">
                             {doc}
                             <button type="button" onClick={() => setForm({...form, documentsRequis: form.documentsRequis.filter((_, idx) => idx !== i)})} className="text-red-400"><X className="w-3 h-3" /></button>
                          </span>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="p-8 bg-gray-50/50 flex gap-3 rounded-b-[2rem]">
                 <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-4 text-gray-500 font-bold hover:bg-gray-100 rounded-2xl">Annuler</button>
                 <button type="submit" className="flex-[2] bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                    <Check className="w-5 h-5" /> {editingId ? 'Mettre à jour' : 'Publier le service'}
                 </button>
              </div>
           </form>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
