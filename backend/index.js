import express from 'express';
import {mongoDBURL, PORT} from './config.js';
import cors from 'cors';
import mongoose from 'mongoose';
import AuthRoutes from './routes/AuthRoutes.js';
import FavoritesRoutes from './routes/FavoritesRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://cine-list-six-delta.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization'],
  credentials: true
}));

app.use((req, res, next) => {
  console.log('Incoming Headers:', req.headers);
  console.log('Authorization Header:', req.header('Authorization'));
  next();
});

app.use('/api/users', AuthRoutes); 
app.use('/api/favorites', FavoritesRoutes);
mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
})
.catch((err)=> {
    console.log(err.message);
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});