require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Connect to MongoDB
connectDB();

const app = express();

// Security middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin: [process.env.CLIENT_URL || 'http://localhost:5174', 'http://localhost:5173'],
  credentials: true
}));

// Logging in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files - uploaded documents
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/services-publics', require('./routes/servicePublicRoutes'));
app.use('/api/actualites', require('./routes/actualiteRoutes'));
app.use('/api/demandes', require('./routes/demandeRoutes'));
app.use('/api/reclamations', require('./routes/reclamationRoutes'));
app.use('/api/annonces', require('./routes/annonceRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API Services Publics opérationnelle', timestamp: new Date() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} non trouvée` });
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Serveur en ligne sur http://localhost:${PORT}`);
  console.log(`📊 Mode: ${process.env.NODE_ENV}`);
  console.log(`🌐 Client: ${process.env.CLIENT_URL}\n`);
});

module.exports = app;
