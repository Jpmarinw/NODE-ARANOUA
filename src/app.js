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
  res.status(200).send(cidades);
});

//listar cidade por id
app.get("/cidades/:id", (req, res) => {
  const id = req.params.id;
  const cidade = cidades.find((elemento) => elemento.id === Number(id)) || null;
  if (cidade) {
    res.status(200).send(cidade);
  } else {
    res.status(404).send("Cidade não encontrada");
  }
});

//criar cidade
app.post("/cidades", (req, res) => {
  const nome = req.body.nome;
  const uf = req.body.uf;

  if (!nome || !uf) {
    return res.status(400).json({ error: "Nome e UF são obrigatórios" });
  }

  const sql =
    "INSERT INTO CIDADE(NOME, UF) VALUES('" + nome + "', '" + uf + "')";

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
  const id = req.params.id;
  const cidade = cidades.find((elemento) => elemento.id === Number(id)) || null;
  cidade.nome = req.body.nome;
  cidade.uf = req.body.uf;
  res.status(200).send("cidade alterada com sucesso");
});

function deletarCidade(id) {
  const indice = cidades.findIndex((elemento) => elemento.id === Number(id));
  if (indice !== -1) {
    const cidadesRemovidas = cidades.splice(indice, 1);
    return cidadesRemovidas[0];
  }
  return null;
}

//deletar cidade
app.delete("/cidades/:id", (req, res) => {
  const cidadeDeletada = deletarCidade(req.params.id);
  res.status(200).send("Cidade Deletada com sucesso");
});

export default app;
