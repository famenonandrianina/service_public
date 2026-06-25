import { useState, useEffect } from 'react';
import { annonceAPI } from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Megaphone, Calendar, User, ChevronRight, Bookmark } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const AnnoncesPage = () => {
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnonces();
  }, []);

  const fetchAnnonces = async () => {
    try {
      const res = await annonceAPI.getAll();
      setAnnonces(res.data.annonces);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <span className="text-blue-600 font-bold text-sm uppercase tracking-widest bg-blue-50 px-4 py-1.5 rounded-full">Actualités locale</span>
          <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-4 font-['Poppins']">Informations & Annonces</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Restez informé des dernières mises à jour, événements officiels et alertes de votre administration locale.
          </p>
        </div>

        {loading ? (
          <div className="space-y-6">
            {[1,2,3].map(i => <div key={i} className="h-48 bg-white rounded-3xl animate-pulse shadow-sm"></div>)}
          </div>
        ) : annonces.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-gray-200">
             <Megaphone className="w-16 h-16 text-gray-200 mx-auto mb-4" />
             <p className="text-gray-500 italic">Aucune information publiée pour le moment.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {annonces.map((annonce) => (
              <article key={annonce._id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col md:flex-row group">
                <div className={`md:w-64 p-8 flex flex-col justify-between items-start shrink-0 ${
                  annonce.categorie === 'alerte' ? 'bg-red-50' :
                  annonce.categorie === 'evenement' ? 'bg-emerald-50' :
                  'bg-blue-50'
                }`}>
                   <div className={`p-4 rounded-2xl ${
                     annonce.categorie === 'alerte' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' :
                     annonce.categorie === 'evenement' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' :
                     'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                   }`}>
                      <Megaphone className="w-8 h-8" />
                   </div>
                   <div className="mt-8">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                        annonce.categorie === 'alerte' ? 'bg-red-100 text-red-600' :
                        annonce.categorie === 'evenement' ? 'bg-emerald-100 text-emerald-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                         {annonce.categorie}
                      </span>
                   </div>
                </div>

                <div className="p-8 md:p-10 flex-1">
                   <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-bold uppercase tracking-widest">
                      <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {format(new Date(annonce.createdAt || Date.now()), 'dd MMMM yyyy', { locale: fr })}</div>
                      <div className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {annonce.auteur?.nom}</div>
                   </div>
                   <h2 className="text-2xl font-bold text-gray-900 mb-4 font-['Poppins'] group-hover:text-blue-600 transition-colors">
                     {annonce.titre}
                   </h2>
                   <p className="text-gray-500 leading-relaxed text-sm lg:text-base border-l-4 border-gray-100 pl-6 py-2 italic font-medium">
                     {annonce.contenu}
                   </p>
                   
                   <div className="mt-8 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                         <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Information officielle</span>
                      </div>
                      <button className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:gap-3 transition-all">
                        Lire la suite <ChevronRight className="w-4 h-4" />
                      </button>
                   </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default AnnoncesPage;
