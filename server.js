import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config(); // fallback to .env if needed

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Attach io to request for use in routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/technoriderzz';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
import apiRoutes from './server/routes/api.js';
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('TechnoRiderzz Real-time API is running...');
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => console.log('User disconnected'));
});

if (!process.env.VERCEL) {
  server.listen(PORT, () => {
    console.log(`Real-time server is running on port ${PORT}`);
  });
}

export default app;
