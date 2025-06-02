import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import router  from './routes/auth.route';
import { connectDB } from './config/data_base';
import userRouter from './routes/user.route';



connectDB(); // ← Esta línea es la que realmente inicia la conexión a Mongo


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', router);

app.use('/api/users', userRouter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
