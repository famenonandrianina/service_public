require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Initialisation de la base de données
connectDB();

const app = express();

// --- MIDDLEWARES DE SÉCURITÉ ---
// Mise en place de Helmet pour sécuriser les headers HTTP
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// Nettoyage des données contre les injections NoSQL
app.use(mongoSanitize());

// Nettoyage des données contre les attaques XSS
app.use(xss());

// Limitation du taux de requêtes (Anti-DDoS / Brute force)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // max 100 requêtes par IP
});
app.use('/api/', limiter);

// --- MIDDLEWARES DE PERFORMANCE ---
// Compression Gzip des réponses
app.use(compression());

// --- CONFIGURATION CORS ---
const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://service-pu.vercel.app',
  'https://service-pu-git-main-famenonandrianinas-projects.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Permissif pour la démo, mais on garde la liste
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// --- PARSERS & LOGS ---
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// --- FICHIERS STATIQUES ---
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- ROUTES API ---
const apiVersion = '/api';
app.use(`${apiVersion}/auth`, require('./routes/authRoutes'));
app.use(`${apiVersion}/services`, require('./routes/serviceRoutes'));
app.use(`${apiVersion}/services-publics`, require('./routes/servicePublicRoutes'));
app.use(`${apiVersion}/actualites`, require('./routes/actualiteRoutes'));
app.use(`${apiVersion}/demandes`, require('./routes/demandeRoutes'));
app.use(`${apiVersion}/reclamations`, require('./routes/reclamationRoutes'));
app.use(`${apiVersion}/annonces`, require('./routes/annonceRoutes'));
app.use(`${apiVersion}/users`, require('./routes/userRoutes'));
app.use(`${apiVersion}/gallery`, require('./routes/galleryRoutes'));

// Health check pour le déploiement Cloud (Render/Railway)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// --- GESTION DES ERREURS ---
// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} inexistante` });
});

// Global Error Handler (Centralisé)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`\n✅ Serveur PRODUCTION prêt sur le port ${PORT}`);
  console.log(`🌍 URL Client autorisée: ${process.env.CLIENT_URL}\n`);
});

// Gestion des erreurs fatales (Uncaught Exception / Unhandled Rejection)
process.on('unhandledRejection', (err) => {
  console.log('❌ UNHANDLED REJECTION! Fin du processus...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = app;
