import { motion } from 'framer-motion';
import { FiUsers, FiBriefcase, FiCheckCircle } from 'react-icons/fi';

const stats = [
  {
    icon: FiBriefcase,
    value: '12+',
    label: 'Services disponibles',
    description: 'Services administratifs accessibles aux citoyens',
    color: 'from-green-500 to-emerald-600',
    bg: 'bg-green-50',
    text: 'text-green-700',
  },
  {
    icon: FiUsers,
    value: '5 000+',
    label: 'Habitants accompagnés',
    description: 'Résidents bénéficiant des services communaux',
    color: 'from-blue-500 to-blue-700',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
  },
  {
    icon: FiCheckCircle,
    value: '8',
    label: 'Projets publics réalisés',
    description: 'Initiatives locales concrétisées pour la communauté',
    color: 'from-teal-500 to-teal-700',
    bg: 'bg-teal-50',
    text: 'text-teal-700',
  },
];

const ServiceStats = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 relative overflow-hidden">
      {/* background blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-[60px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-emerald-300 mb-3">
            Nos chiffres clés
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            L'impact des services publics de Dembéni
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:bg-white/15 transition-all duration-300"
            >
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} mb-4 shadow-lg`}>
                <stat.icon className="text-white text-3xl" />
              </div>
              <div className="text-4xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-sm font-bold text-emerald-200 mb-2">{stat.label}</div>
              <p className="text-xs text-white/60 leading-relaxed">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceStats;
