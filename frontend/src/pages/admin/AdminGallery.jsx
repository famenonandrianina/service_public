import { useState, useEffect } from 'react';
import { galleryAPI } from '../../api';
import { Image, Plus, Trash2, X, Upload, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    titre: '',
    description: '',
    categorie: 'commune',
    image: null
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await galleryAPI.getAll();
      setPhotos(res.data.photos);
    } catch (err) {
      toast.error('Erreur chargement galerie');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.image) return toast.error('Veuillez choisir une image');

    const formData = new FormData();
    formData.append('titre', form.titre);
    formData.append('description', form.description);
    formData.append('categorie', form.categorie);
    formData.append('image', form.image);

    try {
      await galleryAPI.create(formData);
      toast.success('Photo ajoutée !');
      setModalOpen(false);
      setForm({ titre: '', description: '', categorie: 'commune', image: null });
      setPreview(null);
      fetchPhotos();
    } catch (err) {
      toast.error('Erreur lors de l’upload');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cette photo ?')) {
      try {
        await galleryAPI.delete(id);
        toast.success('Photo supprimée');
        fetchPhotos();
      } catch (err) {
        toast.error('Erreur suppression');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-['Poppins']">Photothèque de la Commune</h1>
          <p className="text-gray-500 text-sm">Gérez les images illustrant la ville de Dembéni.</p>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 transition-all"
        >
          <Camera className="w-5 h-5" /> Ajouter une photo
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-20">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <div key={photo._id} className="group relative bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img 
                  src={`http://localhost:5000${photo.imageUrl}`} 
                  alt={photo.titre} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                 <div>
                    <p className="text-sm font-bold text-gray-800 truncate pr-2">{photo.titre}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{photo.categorie}</p>
                 </div>
                 <button 
                  onClick={() => handleDelete(photo._id)}
                  className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                 >
                   <Trash2 className="w-4 h-4" />
                 </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div onClick={() => setModalOpen(false)} className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"></div>
          <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] w-full max-w-lg shadow-2xl relative overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900 font-['Poppins']">Nouvelle Capture</h2>
              <button type="button" onClick={() => setModalOpen(false)} className="p-2 rounded-xl hover:bg-gray-200"><X /></button>
            </div>

            <div className="p-8 space-y-6">
              <div 
                onClick={() => document.getElementById('photo-upload').click()}
                className="aspect-video w-full rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-all overflow-hidden relative group"
              >
                {preview ? (
                  <img src={preview} className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-gray-300 group-hover:text-emerald-500 mb-2" />
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Choisir un fichier</p>
                  </>
                )}
                <input id="photo-upload" type="file" hidden onChange={handleFileChange} accept="image/*" />
              </div>

              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Titre de la photo" 
                  required
                  value={form.titre}
                  onChange={e => setForm({...form, titre: e.target.value})}
                  className="w-full p-4 bg-gray-100 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                />
                <select 
                   value={form.categorie}
                   onChange={e => setForm({...form, categorie: e.target.value})}
                   className="w-full p-4 bg-gray-100 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium outline-none"
                >
                  <option value="commune">Vie Communale</option>
                  <option value="patrimoine">Patrimoine</option>
                  <option value="evenement">Événements</option>
                  <option value="nature">Nature & Environnement</option>
                </select>
              </div>
            </div>

            <div className="p-8 pt-0">
              <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-emerald-900/10 hover:bg-emerald-700 transition-all">
                Ajouter à la galerie
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
