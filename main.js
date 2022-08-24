import express from 'express';
import bodyParser from  'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import todoRoutes from './routes/todo.js';
import userRoutes from './routes/user.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/todo',todoRoutes);
app.use('/user',userRoutes);

app.listen(PORT, () => {
    console.log(`server ready on port https://localhost:${PORT}`);
});