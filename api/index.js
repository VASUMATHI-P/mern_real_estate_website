import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.route.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGO)
        .then(() => {
          console.log('Connected to MongoDB');
        }).catch((err) => {
          console.log('Error connecting to MongoDB:', err);
        })

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
})