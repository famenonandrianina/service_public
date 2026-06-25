import { useState, useEffect } from 'react';
import { reclamationAPI } from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  ShieldAlert, Send, Plus, Search, 
  MessageCircle, Clock, Info, CheckCircle2,
  XCircle, Filter
} from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const ReclamationsPage = () => {
  const [reclamations, setReclamations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  const [form, setForm] = useState({
    sujet: '',
    message: '',
    priorite: 'normale'
  });

  useEffect(() => {
    fetchReclamations();
  }, []);

  const fetchReclamations = async () => {
    try {
      const res = await reclamationAPI.getMes();
      setReclamations(res.data.reclamations);
    } catch (err) {
      toast.error('Erreur chargement réclamations');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await reclamationAPI.create(form);
      toast.success('Réclamation envoyée !');
      setForm({ sujet: '', message: '', priorite: 'normale' });
      setShowForm(false);
      fetchReclamations();
    } catch (err) {
      toast.error('Erreur d’envoi');
    }
  };

  const getStatusBadge = (s) => {
    switch(s) {
      case 'ouverte': return 'bg-green-100 text-green-700 border-green-200';
      case 'en_cours': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'resolue': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'fermee': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
           <div>
              <h1 className="text-3xl font-bold text-gray-900 font-['Poppins']">Support & Réclamations</h1>
              <p className="text-gray-500 mt-1">Signalez une difficulté ou posez une question à l'administration.</p>
           </div>
           <button 
             onClick={() => setShowForm(!showForm)}
             className={`px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg ${
               showForm ? 'bg-gray-200 text-gray-700' : 'bg-green-600 text-white shadow-green-500/20'
             }`}
           >
             {showForm ? <><XCircle className="w-5 h-5" /> Fermer le formulaire</> : <><Plus className="w-5 h-5" /> Nouvelle réclamation</>}
           </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Form Section (Sticky) */}
           {showForm && (
             <div className="lg:col-span-1 fade-in">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl sticky top-24">
                   <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                     <ShieldAlert className="w-6 h-6 text-orange-500" />
                     Détails du problème
                   </h2>
                   
                   <div className="space-y-5">
                      <div>
                         <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Sujet</label>
                         <input 
                           required 
                           type="text"
                           value={form.sujet}
                           onChange={e => setForm({...form, sujet: e.target.value})}
                           placeholder="Ex: Problème avec mon dossier ID"
                           className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-green-500 text-sm"
                         />
                      </div>
                      
                      <div>
                         <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Priorité</label>
                         <div className="grid grid-cols-2 gap-2">
                            {['basse', 'normale', 'haute', 'urgente'].map(p => (
                               <button
                                 key={p}
                                 type="button"
                                 onClick={() => setForm({...form, priorite: p})}
                                 className={`p-2.5 rounded-xl text-[10px] font-bold uppercase border transition-all ${
                                   form.priorite === p ? 'bg-green-600 text-white border-green-600 shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-green-200'
                                 }`}
                               >
                                 {p}
                               </button>
                            ))}
                         </div>
                      </div>

                      <div>
                         <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Description</label>
                         <textarea 
                           required
                           rows="4"
                           value={form.message}
                           onChange={e => setForm({...form, message: e.target.value})}
                           placeholder="Expliquez votre situation..."
                           className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-green-500 text-sm"
                         ></textarea>
                      </div>

                      <button type="submit" className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-500/20 hover:bg-green-700 transition-all flex items-center justify-center gap-2">
                         <Send className="w-4 h-4" /> Envoyer maintenant
                      </button>
                   </div>
                </form>
             </div>
           )}

           {/* History Section */}
           <div className={`${showForm ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-6`}>
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                 <h3 className="font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    Historique de vos échanges
                 </h3>

                 {loading ? (
                    <div className="space-y-4">
                       {[1,2].map(i => <div key={i} className="h-24 bg-gray-50 rounded-2xl animate-pulse"></div>)}
                    </div>
                 ) : reclamations.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
                       <MessageCircle className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                       <p className="text-gray-400 italic">Vous n'avez aucun échange au support.</p>
                    </div>
                 ) : (
                    <div className="space-y-6">
                       {reclamations.map(r => (
                          <div key={r._id} className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:bg-white hover:border-green-200 hover:shadow-xl transition-all group relative overflow-hidden">
                             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div className="flex items-center gap-4">
                                   <div className={`p-3 rounded-2xl ${
                                     r.statut === 'resolue' ? 'bg-emerald-50 text-emerald-600' : 'bg-green-50 text-green-600'
                                   }`}>
                                      <ShieldAlert className="w-6 h-6" />
                                   </div>
                                   <div>
                                      <h4 className="font-bold text-gray-900">{r.sujet}</h4>
                                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{format(new Date(r.createdAt), 'dd MMMM yyyy HH:mm', { locale: fr })}</p>
                                   </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase ${getStatusBadge(r.statut)}`}>
                                   {r.statut}
                                </span>
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                                <div>
                                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5" /> Votre message</p>
                                   <p className="text-sm text-gray-600 italic">"{r.message}"</p>
                                </div>
                                {r.reponse ? (
                                   <div className="bg-white p-6 rounded-2xl border border-green-100 shadow-sm relative shadow-green-500/5">
                                      <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest mb-3 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Réponse Administrative</p>
                                      <p className="text-sm text-green-900 font-medium">"{r.reponse}"</p>
                                   </div>
                                ) : (
                                   <div className="flex items-center gap-3 p-6 bg-gray-100/50 rounded-2xl border border-dashed border-gray-200">
                                      <Clock className="w-5 h-5 text-gray-400 animate-spin" />
                                      <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">En attente de traitement</span>
                                   </div>
                                )}
                             </div>
                             
                             <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full blur-[60px] opacity-20 pointer-events-none transition-all duration-700 ${
                                r.statut === 'resolue' ? 'bg-emerald-400' : 'bg-green-400'
                             }`}></div>
                          </div>
                       ))}
                    </div>
                 )}
              </div>

              {/* FAQ / Small Card */}
              <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                 <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-md">
                       <h4 className="text-2xl font-bold mb-3 font-['Poppins']">Besoin d'une réponse immédiate ?</h4>
                       <p className="text-gray-400 text-sm">Consultez notre base de connaissance pour les questions fréquentes.</p>
                    </div>
                    <button className="px-8 py-3.5 rounded-2xl bg-white text-gray-900 font-bold shadow-xl hover:bg-green-50 transition-all shrink-0">
                       Aide en ligne
                    </button>
                 </div>
                 <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-green-600/20 blur-[80px]"></div>
              </div>
           </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReclamationsPage;
