import { useState, useEffect } from 'react';
import { userAPI, demandeAPI } from '../../api';
import { 
  Users, FileText, CheckCircle, Clock, 
  ArrowUpRight, ArrowDownRight, TrendingUp,
  Activity, Users2, ShieldAlert
} from 'lucide-react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, 
  PointElement, LineElement, Title, Tooltip, 
  Legend, Filler, ArcElement
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import toast from 'react-hot-toast';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, 
  LineElement, Title, Tooltip, Legend, Filler, ArcElement
);

const AdminStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await userAPI.getStats();
      setStats(res.data.stats);
    } catch (err) {
      toast.error('Erreur lors du chargement des statistiques');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return <div className="animate-pulse space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1,2,3,4].map(i => <div key={i} className="h-32 bg-white rounded-3xl"></div>)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 h-96 bg-white rounded-3xl"></div>
         <div className="h-96 bg-white rounded-3xl"></div>
      </div>
    </div>;
  }

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Demandes reçues',
      data: [65, 59, 80, 81, 56, 55],
      fill: true,
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      tension: 0.4,
    }]
  };

  const doughnutData = {
    labels: ['En attente', 'Traitées', 'Refusées'],
    datasets: [{
      data: [stats.demandesEnAttente, stats.demandesTerminees, stats.demandesRefusees],
      backgroundColor: ['#f59e0b', '#10b981', '#ef4444'],
      borderWidth: 0,
      hoverOffset: 10
    }]
  };

  const statCards = [
    { label: 'Citoyens Actifs', value: stats.totalUsers, icon: Users2, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+12%', up: true },
    { label: 'Total Demandes', value: stats.totalDemandes, icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50', trend: '+8%', up: true },
    { label: 'Services Actifs', value: stats.totalServices, icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: 'Stable' },
    { label: 'Réclamations', value: stats.totalReclamations, icon: ShieldAlert, color: 'text-red-600', bg: 'bg-red-50', trend: '-2%', up: false },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-['Poppins']">Statistiques Générales</h1>
        <p className="text-gray-500 mt-1">Aperçu en temps réel de l'activité administrative.</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${card.bg} ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
              {card.trend !== 'Stable' && (
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${card.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  {card.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {card.trend}
                </div>
              )}
            </div>
            <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">{card.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                 <TrendingUp className="w-5 h-5 text-blue-600" />
                 Évolution des demandes
              </h3>
              <select className="bg-gray-50 border-none rounded-xl text-xs font-bold px-4 py-2 cursor-pointer focus:ring-0">
                 <option>6 derniers mois</option>
                 <option>12 derniers mois</option>
              </select>
           </div>
           <div className="h-80">
              <Line data={lineData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { display: false } }, x: { grid: { display: false } } } }} />
           </div>
        </div>

        {/* Distribution Chart */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
           <h3 className="font-bold text-lg text-gray-900 mb-8">Répartition Statuts</h3>
           <div className="h-64 relative">
              <Doughnut 
                data={doughnutData} 
                options={{ 
                  maintainAspectRatio: false, 
                  cutout: '75%',
                  plugins: { legend: { display: false } }
                }} 
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <p className="text-2xl font-bold text-gray-900">{stats.totalDemandes}</p>
                 <p className="text-[10px] text-gray-400 font-bold uppercase">Actions</p>
              </div>
           </div>
           <div className="mt-8 space-y-3">
              {[
                { label: 'En attente', val: stats.demandesEnAttente, color: 'bg-amber-500' },
                { label: 'Acceptées', val: stats.demandesAcceptees, color: 'bg-emerald-500' },
                { label: 'Refusées', val: stats.demandesRefusees, color: 'bg-red-500' },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${s.color}`}></div>
                    <span className="text-gray-500">{s.label}</span>
                  </div>
                  <span className="font-bold text-gray-900">{s.val}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
