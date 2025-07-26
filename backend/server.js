import dotenv from 'dotenv';
dotenv.config(); // ✅ Keep only once

import express from 'express';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db.js';
import Dashboard from './models/dashboardModel.js';
import studentRoutes from './routes/studentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import staffRoutes from './routes/staffRoutes.js';
import { ensureDefaultAdmin } from './init.js';

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB().then(() => {
  console.log('MongoDB connected.');
  ensureDefaultAdmin();
});

// Sample route for dashboard
app.get('/dashboard', async (req, res) => {
  const items = await Dashboard.find();
  console.log(items);
  res.json(items);
});

// API Routes
app.use('/api/students', studentRoutes);
app.use('/api/login', adminRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/staffs', staffRoutes);

// Config routes
app.get('/api/config/cloudinary', (req, res) => {
  res.send(process.env.CLOUDINARY_URL);
});

app.get('/api/config/cloudinarypreset', (req, res) => {
  res.send(process.env.CLOUDINARY_UPLOAD_PRESET);
});

// Serve frontend
const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// 404 handler
app.use((req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Error handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
