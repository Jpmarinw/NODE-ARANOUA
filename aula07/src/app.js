import sequelize from './config/database.js';
import express from 'express';
import PessoaRouter from './routers/PessoaRouter.js';

const app = express();

app.use(express.json());

app.use('/api/pessoas', PessoaRouter);

sequelize
    .sync()
    .then(() => console.log('Banco de dados sincronizado.'))
    .catch((error) => console.error('Erro ao sincronizar o banco de dados:', error));

export default app;
