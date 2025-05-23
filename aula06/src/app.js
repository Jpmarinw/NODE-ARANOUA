import express from "express";
import db from "../database.js";

const app = express();

app.use(express.json());

//tela home
app.get("/", (req, res) => {
    res.status(200).send("Home - Express");
});

//listar cidades
app.get("/cidades", (req, res) => {
    const sql = "SELECT * FROM CIDADE";
    db.all(sql, (err, linhas) => {
        if (err) {
            console.error("Erro ao listar as cidades", err.message);
            return res.status(500).json({ error: "Erro ao listar as cidades" });
        } else {
            const jsonSaida = linhas.map((elemento) => ({
                id: elemento.ID,
                nome: elemento.NOME,
                estado: elemento.ESTADO,
            }));
            console.log("Cidades listadas com sucesso.");
            return res.status(200).json(jsonSaida);
        }
    });
});

//listar cidade por id
app.get("/cidades/:id", (req, res) => {
    const sql = "SELECT * FROM CIDADE WHERE ID = " + req.params.id;
    db.get(sql, (err, linha) => {
        if (err) {
            console.error("Erro ao listar a cidade", err.message);
            return res.status(500).json({ error: "Erro ao listar a cidade" });
        } else if (linha) {
            const jsonSaida = {
                id: linha.ID,
                nome: linha.NOME,
                estado: linha.ESTADO,
            };
            console.log("Cidade listada com sucesso.");
            return res.status(200).json(jsonSaida);
        } else {
            return res.status(404).json({ error: "Cidade não encontrada" });
        }
    });
});

//criar cidade
app.post("/cidades", (req, res) => {
    const nome = req.body.nome;
    const estado = req.body.estado;

    if (!nome || !estado) {
        return res
            .status(400)
            .json({ error: "Nome e ESTADO são obrigatórios" });
    }

    const sql =
        "INSERT INTO CIDADE(NOME, ESTADO) VALUES('" +
        nome +
        "', '" +
        estado +
        "')";

    db.run(sql, (err) => {
        if (err) {
            console.error("Erro ao criar a cidade", err.message);
            return res.status(500).json({ error: "Erro ao criar a cidade" });
        } else {
            console.log("Cidade criada com sucesso.");
            return res.status(201).send(req.body);
        }
    });
});

//alterar cidade
app.put("/cidades/:id", (req, res) => {
    const sql =
        "UPDATE CIDADE SET NOME = ?, ESTADO = ? WHERE ID = " + req.params.id;
    const params = [req.body.nome, req.body.estado];

    db.run(sql, params, (err) => {
        if (err) {
            console.error("Erro ao alterar a cidade", err.message);
            return res.status(500).json({ error: "Erro ao alterar a cidade" });
        } else {
            console.log("Cidade alterada com sucesso.");
            return res.status(200).send(req.body);
        }
    });
});

//deletar cidade
app.delete("/cidades/:id", (req, res) => {
    const sql = "DELETE FROM CIDADE WHERE ID = " + req.params.id;
    db.run(sql, (err) => {
        if (err) {
            console.error("Erro ao deletar a cidade", err.message);
            return res.status(500).json({ error: "Erro ao deletar a cidade" });
        } else {
            console.log("Cidade deletada com sucesso.");
            return res.status(200).send("Cidade deletada com sucesso");
        }
    });
});

export default app;
