import express from 'express';
import morgan from 'morgan';
import prisma from './database/prisma';
import authRouter from './routes/authRouter';
import userRouter from './routes/userRouter';
import productRouter from './routes/productRouter';
import categoryRouter from './routes/categoryRouter';
import cors from 'cors';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin: "*"
}))

app.set('port', process.env.PORT || 4000);

// Routers

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/category', categoryRouter);

app.listen(app.get('port'),() => {
    console.log(`http://localhost:${app.get('port')}`);
    if (prisma) {
        console.log("Database Conected");
    }
});