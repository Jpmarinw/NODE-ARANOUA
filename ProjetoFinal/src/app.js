import sequelize from "./config/database.js";
import express from "express";
import FabricanteRouter from "./routes/fabricante.js";
import MedicamentoRouter from "./routes/medicamento.js";

const app = express();

app.use(express.json());

app.use("/api/medicamentos", MedicamentoRouter);
app.use("/api/fabricantes", FabricanteRouter);

sequelize
    .sync()
    .then(() => console.log("Banco de dados sincronizado."))
    .catch((error) =>
        console.error("Erro ao sincronizar o banco de dados:", error)
    );

export default app;
