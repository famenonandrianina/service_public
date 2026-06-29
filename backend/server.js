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

// =============================================
// --- 1. CORS — DOIT ÊTRE EN PREMIER ---
// =============================================
const allowedOrigins = [
  'https://service-public-two.vercel.app',
  'https://service-pu.vercel.app',
  'https://service-pu-git-main-famenonandrianinas-projects.vercel.app',
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000'
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Autoriser les requêtes sans origin (mobile, Postman, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS bloqué pour l'origine: ${origin}`), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200 // Certains navigateurs (Safari) ont besoin de 200
};

// Appliquer CORS sur toutes les routes
app.use(cors(corsOptions));

// Gérer explicitement les requêtes preflight OPTIONS
app.options('*', cors(corsOptions));

// =============================================
// --- 2. MIDDLEWARES DE SÉCURITÉ ---
// =============================================
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(mongoSanitize());
app.use(xss());

// Limitation du taux de requêtes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

// --- MIDDLEWARES DE PERFORMANCE ---
app.use(compression());

// --- PARSERS & LOGS ---
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// --- FICHIERS STATIQUES ---
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// =============================================
// --- 3. ROUTES API ---
// =============================================
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

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// =============================================
// --- 4. GESTION DES ERREURS ---
// =============================================
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} inexistante` });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`\n✅ Serveur PRODUCTION prêt sur le port ${PORT}`);
  console.log(`🌍 URL Client autorisée: ${process.env.CLIENT_URL}\n`);
});

process.on('unhandledRejection', (err) => {
  console.log('❌ UNHANDLED REJECTION! Fin du processus...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = app;
