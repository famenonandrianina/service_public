import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShieldCheck, Users, HandIcon, Lightbulb, Zap, Heart } from 'lucide-react';

const ProjectPage = () => {
  const objectives = [
    {
      title: "Facilitation de l'Accès aux Droits",
      desc: "Réduire les barrières géographiques et temporelles en permettant aux citoyens de soumettre leurs demandes d'actes d'état civil et d'identité depuis n'importe où.",
      icon: HandIcon,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Transparence Administrative",
      desc: "Offrir un suivi en temps réel du statut des dossiers pour que chaque citoyen sache exactement où en est son accès aux services.",
      icon: ShieldCheck,
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      title: "Inclusion Numérique",
      desc: "Accompagner les usagers à travers une interface simplifiée et un support direct pour lutter contre l'illectronisme et la rupture des droits.",
      icon: Users,
      color: "bg-brand-secondary/10 text-brand-secondary"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar />
      
      {/* Hero */}
      <section className="bg-brand-primary py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <div className="absolute top-10 left-10 w-64 h-64 border-8 border-white rounded-full"></div>
           <div className="absolute bottom-10 right-10 w-96 h-96 border-[20px] border-white rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-black mb-8 leading-tight font-['Poppins']">
            Le rôle des services publics locaux dans la facilitation de l’accès aux droits
          </h1>
          <p className="text-xl text-white/80 leading-relaxed">
            Découvrez comment la mairie de Dembéni innove pour rapprocher l'administration des citoyens et garantir l'égalité d'accès aux services essentiels.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-20">
        {/* Core Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
           <div>
              <span className="text-brand-secondary font-bold text-sm uppercase tracking-[0.2em]">Vision Stratégique</span>
              <h2 className="text-4xl font-black text-gray-900 mt-4 mb-8 font-['Poppins']">Pourquoi cette plateforme ?</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Le service public local est le premier rempart contre l'isolement administratif. À Dembéni, nous croyons que la technologie doit servir d'accélérateur de droits.
              </p>
              <div className="space-y-4">
                 {[
                   "Réduction des délais d'attente guichet",
                   "Disponibilité du service 24h/24",
                   "Sécurisation des données personnelles",
                   "Interactivité directe entre l'agent et l'usager"
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-brand-light flex items-center justify-center">
                         <Zap className="w-3 h-3 text-brand-primary" />
                      </div>
                      <span className="font-bold text-gray-700">{item}</span>
                   </div>
                 ))}
              </div>
           </div>
           
           <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-gray-100 relative">
              <div className="absolute top-0 right-0 -mr-6 -mt-6">
                 <div className="bg-brand-secondary text-white w-24 h-24 rounded-3xl flex items-center justify-center shadow-xl rotate-12">
                    <Heart className="w-10 h-10 fill-current" />
                 </div>
              </div>
              <h3 className="text-2xl font-bold mb-6 text-brand-primary">L'accès pour tous</h3>
              <p className="text-gray-500 leading-relaxed italic">
                "Faciliter l'accès aux droits, c'est avant tout s'assurer que même le citoyen le plus éloigné du centre-ville puisse obtenir son acte de naissance ou son passeport avec la même dignité et la même rapidité que n'importe qui d'autre."
              </p>
              <div className="mt-8 pt-8 border-t border-gray-50 flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-brand-primary">M</div>
                 <div>
                    <p className="font-black text-gray-900">Maire de Dembéni</p>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Élan pour la cité</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {objectives.map((obj, i) => (
             <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-all group">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${obj.color} group-hover:scale-110 transition-transform`}>
                   <obj.icon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{obj.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{obj.desc}</p>
             </div>
           ))}
        </div>

        {/* Call to action */}
        <div className="mt-32 bg-brand-dark rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-brand-primary/10">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-primary/20 via-transparent to-transparent"></div>
           <h3 className="text-3xl font-black mb-6 relative z-10 font-['Poppins']">Agir pour le futur de Dembéni</h3>
           <p className="text-gray-400 mb-10 max-w-2xl mx-auto relative z-10">
              Chaque démarche effectuée sur ce portail contribue à la modernisation de notre administration locale.
           </p>
           <button className="bg-white text-gray-900 px-10 py-4 rounded-2xl font-bold shadow-xl hover:bg-brand-light transition-all relative z-10">
              Découvrir nos services
           </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectPage;
