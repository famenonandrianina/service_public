import { useState } from 'react';
import { 
  Settings, Image, Bell, Shield, 
  Save, RefreshCw, Palette, Globe
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminSettings = () => {
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({
    siteName: 'Mairie de Dembéni',
    contactEmail: 'Dembénimairie@gmail.com',
    maintenanceMode: false,
    notificationsEnabled: true,
    themeColor: '#16a34a'
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Paramètres enregistrés avec succès !');
    }, 1000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-['Poppins']">Configuration du Système</h1>
        <p className="text-gray-500">Gérez les paramètres globaux de la plateforme.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h3 className="font-bold text-gray-900 mb-2">Général</h3>
          <p className="text-sm text-gray-500 italic">Informations d'identité du site et contacts officiels.</p>
        </div>
        <div className="md:col-span-2 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-5">
           <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nom de la Plateforme</label>
              <input 
                type="text" 
                value={config.siteName}
                onChange={e => setConfig({...config, siteName: e.target.value})}
                className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-green-500 text-sm font-medium" 
              />
           </div>
           <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email de Contact</label>
              <input 
                type="email" 
                value={config.contactEmail}
                onChange={e => setConfig({...config, contactEmail: e.target.value})}
                className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-green-500 text-sm font-medium" 
              />
           </div>
        </div>

        <div className="md:col-span-1">
          <h3 className="font-bold text-gray-900 mb-2">Apparence</h3>
          <p className="text-sm text-gray-500 italic">Personnalisation visuelle et thèmes.</p>
        </div>
        <div className="md:col-span-2 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center"><Image /></div>
                 <div>
                    <p className="text-sm font-bold">Image de Héros (Accueil)</p>
                    <p className="text-xs text-gray-400 italic">Recommandé: 1920x1080px</p>
                 </div>
              </div>
              <button className="text-xs font-black text-green-600 uppercase tracking-widest hover:underline">Modifier</button>
           </div>
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center"><Palette /></div>
                 <div>
                    <p className="text-sm font-bold">Couleur Principale</p>
                    <p className="text-xs text-gray-400">Actuel: {config.themeColor}</p>
                 </div>
              </div>
              <input type="color" value={config.themeColor} onChange={e => setConfig({...config, themeColor: e.target.value})} className="w-10 h-10 border-none bg-transparent cursor-pointer" />
           </div>
        </div>

        <div className="md:col-span-1">
          <h3 className="font-bold text-gray-900 mb-2">Sécurité & Maintenance</h3>
          <p className="text-sm text-gray-500 italic">Contrôlez l'accès et les alertes système.</p>
        </div>
        <div className="md:col-span-2 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center"><Shield /></div>
                 <div>
                    <p className="text-sm font-bold">Mode Maintenance</p>
                    <p className="text-xs text-gray-400">Désactiver l'accès citoyen temporairement</p>
                 </div>
              </div>
              <input 
                type="checkbox" 
                checked={config.maintenanceMode}
                onChange={e => setConfig({...config, maintenanceMode: e.target.checked})}
                className="w-12 h-6 bg-gray-200 rounded-full checked:bg-green-500 appearance-none transition-all cursor-pointer relative after:content-[''] after:absolute after:left-1 after:top-1 after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-all checked:after:left-7" 
              />
           </div>
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center"><Bell /></div>
                 <div>
                    <p className="text-sm font-bold">Alertes Emails</p>
                    <p className="text-xs text-gray-400">Notifier lors d'une nouvelle demande</p>
                 </div>
              </div>
              <input 
                type="checkbox" 
                checked={config.notificationsEnabled}
                onChange={e => setConfig({...config, notificationsEnabled: e.target.checked})}
                className="w-12 h-6 bg-gray-200 rounded-full checked:bg-green-500 appearance-none transition-all cursor-pointer relative after:content-[''] after:absolute after:left-1 after:top-1 after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-all checked:after:left-7" 
              />
           </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
         <button 
           onClick={handleSave}
           disabled={loading}
           className="bg-green-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-[0.2em] flex items-center gap-3 shadow-xl shadow-green-900/10 hover:bg-green-700 transition-all disabled:opacity-50"
         >
           {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
           Enregistrer les modifications
         </button>
      </div>
    </div>
  );
};

export default AdminSettings;
