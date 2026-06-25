import { useState, useEffect } from 'react';
import { userAPI } from '../../api';
import { 
  Users, Search, Shield, Trash2, 
  ToggleLeft, ToggleRight, Mail, Ban, 
  MapPin, Phone, User as UserIcon
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await userAPI.getAll();
      setUsers(res.data.users);
    } catch (err) {
      toast.error('Erreur chargement utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id) => {
    try {
      await userAPI.toggle(id);
      toast.success('Statut utilisateur modifié');
      fetchUsers();
    } catch (err) {
      toast.error('Erreur lors de la modification');
    }
  };

  const handleRoleChange = async (id, currentRole) => {
    const newRole = currentRole === 'admin' ? 'citoyen' : 'admin';
    const confirmMsg = currentRole === 'admin' 
      ? "Voulez-vous vraiment retirer les droits d'administrateur à cet utilisateur ?" 
      : "Voulez-vous vraiment promouvoir cet utilisateur en tant qu'administrateur ?";
    
    if (window.confirm(confirmMsg)) {
      try {
        await userAPI.changeRole(id, newRole);
        toast.success(`Rôle mis à jour : ${newRole}`);
        fetchUsers();
      } catch (err) {
        toast.error('Erreur lors du changement de rôle');
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cet utilisateur définitivement ?')) {
      try {
        await userAPI.delete(id);
        toast.success('Utilisateur supprimé');
        fetchUsers();
      } catch (err) {
        toast.error('Erreur suppression');
      }
    }
  };

  const filteredUsers = users.filter(u => 
    u.nom.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 font-['Poppins']">Base des Citoyens</h1>
           <p className="text-gray-500">Gérez les comptes utilisateurs et les droits d'accès.</p>
        </div>
        <div className="relative w-full sm:w-72">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
           <input 
             type="text" 
             placeholder="Nom, Email..."
             value={search}
             onChange={e => setSearch(e.target.value)}
             className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
           />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          [1,2,3].map(i => <div key={i} className="h-64 bg-white rounded-3xl animate-pulse"></div>)
        ) : (
          filteredUsers.map(u => (
            <div key={u._id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group">
               <div className={`h-24 ${u.role === 'admin' ? 'gradient-blue' : 'bg-gray-100'} p-6 flex justify-end items-start`}>
                  {u.role === 'admin' && <Shield className="w-6 h-6 text-white/50" />}
               </div>
               <div className="px-8 pb-8 relative">
                  <div className="w-20 h-20 rounded-3xl border-4 border-white bg-white shadow-xl -mt-10 mb-6 flex items-center justify-center text-blue-600 text-3xl font-bold">
                    {u.nom.charAt(0).toUpperCase()}
                  </div>
                  
                  <div className="mb-6">
                     <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-gray-900 truncate">{u.nom}</h3>
                        {!u.actif && <Ban className="w-4 h-4 text-red-500" />}
                     </div>
                     <p className="text-sm text-gray-500 flex items-center gap-2 italic">
                        <Mail className="w-3.5 h-3.5" /> {u.email}
                     </p>
                  </div>

                  <div className="space-y-3 mb-8">
                     <div className="flex items-center gap-3 text-xs text-gray-500">
                        <Phone className="w-3.5 h-3.5 text-blue-500" /> 
                        {u.telephone || 'Non spécifié'}
                     </div>
                     <div className="flex items-center gap-3 text-xs text-gray-500">
                        <MapPin className="w-3.5 h-3.5 text-blue-500" /> 
                        <span className="truncate">{u.adresse || 'Aucune adresse'}</span>
                     </div>
                     <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                           {u.role}
                        </span>
                        <span className={`text-[10px] font-bold uppercase ${u.actif ? 'text-emerald-500' : 'text-red-500'}`}>
                           ● {u.actif ? 'Actif' : 'Désactivé'}
                        </span>
                     </div>
                  </div>

                  <div className="flex gap-2">
                     <button 
                       onClick={() => handleToggleActive(u._id)}
                       className={`flex-1 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                         u.actif 
                          ? 'bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white border border-amber-100' 
                          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white border border-emerald-100'
                       }`}
                     >
                       {u.actif ? <><ToggleRight className="w-4 h-4" /> Désactiver</> : <><ToggleLeft className="w-4 h-4" /> Activer</>}
                     </button>
                     <button 
                       onClick={() => handleRoleChange(u._id, u.role)}
                       className={`px-4 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                         u.role === 'admin' 
                          ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                       }`}
                       title={u.role === 'admin' ? 'Rétrograder en citoyen' : 'Promouvoir en admin'}
                     >
                        <Shield className="w-4 h-4" />
                     </button>
                     <button 
                       onClick={() => handleDelete(u._id)}
                       className="w-12 h-12 rounded-2xl bg-red-50 text-red-400 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center border border-red-100"
                     >
                        <Trash2 className="w-5 h-5" />
                     </button>
                  </div>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
