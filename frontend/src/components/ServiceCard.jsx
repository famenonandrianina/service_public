import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const ServiceCard = ({ icon: Icon, title, description, tag, color, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(22,101,52,0.12)' }}
      className="group relative bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden flex flex-col cursor-pointer transition-all duration-300"
    >
      {/* Top color accent */}
      <div className={`h-1.5 w-full ${color}`} />

      <div className="p-6 flex flex-col flex-1">
        {/* Icon + Tag */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${color.replace('bg-', 'bg-').replace('-500', '-50').replace('-600', '-50')} border border-slate-100`}>
            <Icon className={`text-2xl ${color.replace('bg-', 'text-')}`} />
          </div>
          {tag && (
            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {tag}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-800 mb-2 leading-snug group-hover:text-green-700 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-500 leading-relaxed flex-1">
          {description}
        </p>

        {/* CTA */}
        <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-green-700 group-hover:gap-3 transition-all duration-300">
          <span>En savoir plus</span>
          <FiArrowRight className="text-base" />
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
