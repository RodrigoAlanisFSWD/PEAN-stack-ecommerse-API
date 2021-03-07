import express from 'express';
import morgan from 'morgan';
import prisma from './database/prisma';
import authRouter from './routes/authRouter';
import userRouter from './routes/userRouter';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.set('port', process.env.PORT || 3000);

// Routers

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(app.get('port'),() => {
    console.log(`http://localhost:${app.get('port')}`);
    if (prisma) {
        console.log("Database Conected");
    }
});