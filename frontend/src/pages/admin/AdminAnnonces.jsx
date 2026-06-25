import { useState, useEffect } from 'react';
import { annonceAPI } from '../../api';
import { 
  Megaphone, Plus, Search, Trash2, Edit2,
  Calendar, User, X, Check, Info, FileText
} from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const AdminAnnonces = () => {
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  
  const [editingId, setEditingId] = useState(null);
  
  const [form, setForm] = useState({
    titre: '',
    contenu: '',
    categorie: 'info'
  });

  useEffect(() => {
    fetchAnnonces();
  }, []);

  const fetchAnnonces = async () => {
    try {
      const res = await annonceAPI.getAll();
      setAnnonces(res.data.annonces);
    } catch (err) {
      toast.error('Erreur chargement annonces');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await annonceAPI.update(editingId, form);
        toast.success('Annonce mise à jour !');
      } else {
        await annonceAPI.create(form);
        toast.success('Annonce publiée !');
      }
      setModalOpen(false);
      setEditingId(null);
      setForm({ titre: '', contenu: '', categorie: 'info' });
      fetchAnnonces();
    } catch (err) {
      toast.error('Erreur lors de l’enregistrement');
    }
  };

  const startEdit = (a) => {
    setEditingId(a._id);
    setForm({ titre: a.titre, contenu: a.contenu, categorie: a.categorie });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cette annonce ?')) {
      try {
        await annonceAPI.delete(id);
        toast.success('Annonce supprimée');
        fetchAnnonces();
      } catch (err) {
        toast.error('Erreur suppression');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 font-['Poppins']">Communication Citoyenne</h1>
           <p className="text-gray-500">Diffusez des informations et des alertes aux citoyens.</p>
        </div>
        <button 
          onClick={() => { setEditingId(null); setForm({ titre: '', contenu: '', categorie: 'info' }); setModalOpen(true); }}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all"
        >
           <Plus className="w-5 h-5" /> Publier une annonce
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Sujet & Catégorie</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Publié le</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Contenu</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Auteur</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="5" className="p-20 text-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div></td></tr>
              ) : annonces.length === 0 ? (
                <tr><td colSpan="5" className="p-20 text-center text-gray-400 italic">Aucune annonce publiée</td></tr>
              ) : (
                annonces.map(a => (
                  <tr key={a._id} className="hover:bg-gray-50/40 transition-colors">
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            a.categorie === 'alerte' ? 'bg-red-50 text-red-600' :
                            a.categorie === 'evenement' ? 'bg-emerald-50 text-emerald-600' :
                            'bg-blue-50 text-blue-600'
                          }`}>
                            <Megaphone className="w-4 h-4" />
                          </div>
                          <div>
                             <p className="text-sm font-bold text-gray-800">{a.titre}</p>
                             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{a.categorie}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-500 whitespace-nowrap">
                       {format(new Date(a.createdAt), 'dd MMMM yyyy', { locale: fr })}
                    </td>
                    <td className="px-8 py-6 max-w-xs md:max-w-md">
                       <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{a.contenu}</p>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                            {a.auteur?.nom.charAt(0)}
                          </div>
                          <span className="text-xs font-semibold text-gray-700">{a.auteur?.nom}</span>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => startEdit(a)}
                            className="p-3 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-blue-100"
                          >
                             <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(a._id)}
                            className="p-3 bg-red-50 text-red-400 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-sm border border-red-100"
                          >
                             <Trash2 className="w-4 h-4" />
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

      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           <div onClick={() => setModalOpen(false)} className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"></div>
           <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl relative fade-in">
              <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                 <h2 className="text-xl font-bold text-gray-900 font-['Poppins']">{editingId ? 'Modifier l\'annonce' : 'Nouvelle Annonce'}</h2>
                 <button type="button" onClick={() => setModalOpen(false)} className="p-2 rounded-xl hover:bg-gray-100"><X className="w-6 h-6" /></button>
              </div>

              <div className="p-8 space-y-5">
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Titre de l'annonce</label>
                    <input 
                      type="text" 
                      required
                      value={form.titre}
                      onChange={e => setForm({...form, titre: e.target.value})}
                      placeholder="Ex: Fermeture exceptionnelle des bureaux..."
                      className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                 </div>

                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Type / Catégorie</label>
                    <div className="grid grid-cols-3 gap-3">
                       {['info', 'alerte', 'evenement'].map(cat => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setForm({...form, categorie: cat})}
                            className={`p-3 rounded-2xl text-xs font-bold capitalize transition-all border ${
                              form.categorie === cat 
                                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20' 
                                : 'bg-gray-50 text-gray-500 border-transparent hover:border-gray-200'
                            }`}
                          >
                             {cat}
                          </button>
                       ))}
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Contenu du message</label>
                    <textarea 
                      required
                      value={form.contenu}
                      onChange={e => setForm({...form, contenu: e.target.value})}
                      placeholder="Rédigez votre message ici..."
                      className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 text-sm"
                      rows="5"
                    ></textarea>
                 </div>
              </div>

              <div className="p-8 pt-0 flex gap-3">
                 <button type="submit" className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl shadow-gray-900/10">
                    <Check className="w-5 h-5" /> {editingId ? 'Mettre à jour' : 'Publier maintenant'}
                 </button>
              </div>
           </form>
        </div>
      )}
    </div>
  );
};

export default AdminAnnonces;
