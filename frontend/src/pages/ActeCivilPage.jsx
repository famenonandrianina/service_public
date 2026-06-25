import { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { 
  FileText, User, Calendar, MapPin, 
  Send, ShieldCheck, Info, Check, ArrowLeft 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { demandeAPI } from '../api';

const ActeCivilPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomComplet: '',
    dateNaissance: '',
    lieuNaissance: '',
    typeActe: 'naissance',
    nombreExemplaires: 1,
    motif: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [serviceId, setServiceId] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await serviceAPI.getAll();
        const service = res.data.services.find(s => 
          s.nom.toLowerCase().includes('naissance') || 
          s.nom.toLowerCase().includes('civil')
        );
        if (service) setServiceId(service._id);
      } catch (err) {
        console.error('Erreur fetch service:', err);
      }
    };
    fetchService();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const description = `Demande d'acte de ${formData.typeActe} pour ${formData.nomComplet}. 
      Né(e) le ${formData.dateNaissance} à ${formData.lieuNaissance}. 
      Exemplaires: ${formData.nombreExemplaires}. 
      Motif: ${formData.motif}`;
      
      if (!serviceId) {
        toast.error('Service non configuré en base de données');
        setSubmitting(false);
        return;
      }
      
      const payload = new FormData();
      payload.append('service', serviceId); 
      payload.append('description', description);
      
      await demandeAPI.create(payload);
      toast.success('Votre demande d\'acte civil a été transmise !');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Erreur lors de l\'envoi de la demande');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-50 pt-32 pb-20">
        <main className="max-w-4xl mx-auto px-6">
          <Link to="/demarches" className="flex items-center gap-2 text-slate-400 hover:text-green-600 mb-8 transition-colors text-sm font-bold w-fit">
            <ArrowLeft className="w-4 h-4" /> Retour aux démarches
          </Link>

          <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
            <div className="bg-green-900 p-10 md:p-12 text-white">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/20">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-black">Demande d'Acte Civil</h1>
                  <p className="text-green-100/70">Formulaire officiel de la Mairie de Dembéni</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-green-400 text-sm font-bold bg-green-400/10 w-fit px-4 py-2 rounded-full border border-green-400/20">
                <ShieldCheck className="w-4 h-4" /> Démarche 100% Sécurisée
              </div>
            </div>

            <div className="p-8 md:p-12">
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100 mb-10 flex items-start gap-4">
                <Info className="w-6 h-6 text-green-600 shrink-0" />
                <p className="text-sm text-green-800 leading-relaxed">
                  Ce formulaire permet de demander un acte de naissance, de mariage ou de décès. 
                  Le délai moyen de traitement est de **48 heures ouvrées**. 
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Type d'acte requis</label>
                    <select 
                      value={formData.typeActe}
                      onChange={e => setFormData({...formData, typeActe: e.target.value})}
                      className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-green-600 font-bold text-slate-700"
                    >
                      <option value="naissance">Acte de Naissance</option>
                      <option value="mariage">Acte de Mariage</option>
                      <option value="deces">Acte de Décès</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Nombre d'exemplaires</label>
                    <input 
                      type="number" 
                      min="1" max="5"
                      value={formData.nombreExemplaires}
                      onChange={e => setFormData({...formData, nombreExemplaires: e.target.value})}
                      className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-green-600 font-bold text-slate-700" 
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Nom complet (du concerné)</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-green-600 transition-colors" />
                      <input 
                        required
                        type="text"
                        placeholder="Jean Dominique"
                        value={formData.nomComplet}
                        onChange={e => setFormData({...formData, nomComplet: e.target.value})}
                        className="w-full p-4 pl-12 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-green-600 font-bold text-slate-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Date de l'événement</label>
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-green-600 transition-colors" />
                      <input 
                        required
                        type="date"
                        value={formData.dateNaissance}
                        onChange={e => setFormData({...formData, dateNaissance: e.target.value})}
                        className="w-full p-4 pl-12 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-green-600 font-bold text-slate-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Lieu de l'événement</label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-green-600 transition-colors" />
                      <input 
                        required
                        type="text"
                        placeholder="Dembéni, Mayotte"
                        value={formData.lieuNaissance}
                        onChange={e => setFormData({...formData, lieuNaissance: e.target.value})}
                        className="w-full p-4 pl-12 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-green-600 font-bold text-slate-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Motif de la demande</label>
                    <textarea 
                      required
                      rows="3"
                      placeholder="Ex: Dossier de mariage, renouvellement de passeport..."
                      value={formData.motif}
                      onChange={e => setFormData({...formData, motif: e.target.value})}
                      className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-green-600 font-bold text-slate-700"
                    ></textarea>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full btn-primary py-6 rounded-2xl font-black text-xl shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {submitting ? 'Transmission en cours...' : <><Send className="w-6 h-6" /> Envoyer ma demande officielle</>}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </MainLayout>
  );
};

export default ActeCivilPage;
