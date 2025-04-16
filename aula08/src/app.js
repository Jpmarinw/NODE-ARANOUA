import sequelize from "./config/database.js";
import express from "express";
import PessoaRouter from "./routers/PessoaRouter.js";
import EstadoRouter from "./routers/EstadoRouter.js";
import CidadeRouter from "./routers/CidadeRouter.js";

const app = express();

app.use(express.json());

app.use("/api/pessoas", PessoaRouter);
app.use("/api/estados", EstadoRouter);
app.use("/api/cidades", CidadeRouter);

sequelize
    .sync()
    .then(() => console.log("Banco de dados sincronizado."))
    .catch((error) =>
        console.error("Erro ao sincronizar o banco de dados:", error)
    );

export default app;
