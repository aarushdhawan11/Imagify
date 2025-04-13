import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectdb from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const PORT = process.env.PORT || 4000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
await connectdb();

// Routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

// Root Route
app.get('/', (req, res) => res.send("API Working"));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
