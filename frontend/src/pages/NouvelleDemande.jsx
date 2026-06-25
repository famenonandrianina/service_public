import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { serviceAPI, demandeAPI } from '../api';
import { 
  ArrowLeft, Search, Filter, Info, FileText, 
  Upload, CloudUpload, X, Check, Loader, ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

const NouvelleDemande = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [step, setStep] = useState(1);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('tous');
  
  const [formData, setFormData] = useState({
    description: '',
    files: []
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await serviceAPI.getAll({ actif: true });
      setServices(res.data.services);
    } catch (err) {
      toast.error('Erreur lors du chargement des services');
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter(s => {
    const matchesSearch = s.nom.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === 'tous' || s.categorie === category;
    return matchesSearch && matchesCat;
  });

  const handleSelectService = (service) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...newFiles]
    }));
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description.trim()) return toast.error('Veuillez décrire votre demande');
    
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('service', selectedService._id);
      data.append('description', formData.description);
      formData.files.forEach(file => {
        data.append('documents', file);
      });

      await demandeAPI.create(data);
      toast.success('Votre demande a été soumise avec succès !');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors de la soumission');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumbs / Back button */}
        <button 
          onClick={() => step === 1 ? navigate('/dashboard') : setStep(1)}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-6 group text-sm"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {step === 1 ? 'Retour au tableau de bord' : 'Retour à la sélection du service'}
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-['Poppins']">
            {step === 1 ? 'Choisissez un service' : 'Complétez votre demande'}
          </h1>
          <p className="text-gray-500 mt-1">
            {step === 1 
              ? 'Sélectionnez le type d\'acte ou de service dont vous avez besoin.' 
              : `Formulaire pour : ${selectedService?.nom}`}
          </p>
        </div>

        {/* Steps Indicator */}
        <div className="flex items-center gap-3 mb-8">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 1 ? 'bg-blue-600 text-white shadow-lg' : 'bg-green-100 text-green-600'}`}>
            {step > 1 ? <Check className="w-4 h-4" /> : '1'}
          </div>
          <div className={`h-0.5 w-12 rounded-full ${step > 1 ? 'bg-green-400' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 2 ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>2</div>
        </div>

        {step === 1 ? (
          /* Step 1: Service Selection */
          <div className="space-y-6 fade-in">
            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Rechercher un service..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                />
              </div>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm appearance-none bg-white cursor-pointer"
              >
                <option value="tous">Toutes les catégories</option>
                <option value="identite">Identité</option>
                <option value="etat-civil">État Civil</option>
                <option value="urbanisme">Urbanisme</option>
                <option value="social">Social</option>
                <option value="fiscal">Fiscal</option>
              </select>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader className="w-10 h-10 text-blue-600 animate-spin" />
              </div>
            ) : filteredServices.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                <Info className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Aucun service ne correspond à votre recherche.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredServices.map((service) => (
                  <button
                    key={service._id}
                    onClick={() => handleSelectService(service)}
                    className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-left group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${
                        service.categorie === 'identite' ? 'bg-blue-50 text-blue-600' :
                        service.categorie === 'etat-civil' ? 'bg-emerald-50 text-emerald-600' :
                        'bg-purple-50 text-purple-600'
                      }`}>
                        <FileText className="w-6 h-6" />
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{service.nom}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">{service.description}</p>
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-50">
                      <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-full text-gray-600">
                        {service.delaiTraitement}
                      </span>
                      <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider">
                        Gratuit
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Step 2: Form Completion */
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden fade-in">
            <div className="p-8">
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mb-8">
                <h3 className="font-bold text-blue-900 flex items-center gap-2 mb-2">
                  <Info className="w-5 h-5" />
                  Documents Requis
                </h3>
                <ul className="space-y-2">
                  {selectedService?.documentsRequis.length > 0 ? (
                    selectedService.documentsRequis.map((doc, i) => (
                      <li key={i} className="text-sm text-blue-700 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                        {doc}
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-blue-700 italic">Aucun document spécifique requis, mais conseillé d'en joindre si nécessaire.</li>
                  )}
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Description input */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Objet ou description de la demande <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Veuillez détailler l'objet de votre demande administrative ici..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm leading-relaxed"
                  ></textarea>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Joindre des documents (PDF, Images)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-2xl hover:border-blue-400 transition-colors bg-gray-50/50">
                    <div className="space-y-1 text-center">
                      <CloudUpload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer rounded-md font-bold text-blue-600 hover:text-blue-500 focus-within:outline-none">
                          <span>Cliquez pour télécharger</span>
                          <input 
                            type="file" 
                            multiple 
                            onChange={handleFileChange}
                            className="sr-only" 
                          />
                        </label>
                        <p className="pl-1">ou glissez-déposez</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, PDF jusqu'à 10MB</p>
                    </div>
                  </div>

                  {/* List of files */}
                  {formData.files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.files.map((file, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                              <FileText className="w-4 h-4 text-gray-500" />
                            </div>
                            <div className="max-w-[200px] sm:max-w-xs overflow-hidden">
                              <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                              <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>
                          <button 
                            type="button"
                            onClick={() => removeFile(i)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer buttons */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-[2] py-3 px-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg shadow-green-200 hover:shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 group"
                  >
                    {submitting ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Soumettre ma demande
                        <Check className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default NouvelleDemande;
