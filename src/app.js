import express from "express";

const app = express();

app.use(express.json());

const cidades = [
  {
    id: 1,
    nome: "Manaus",
    uf: "AM",
  },
  {
    id: 2,
    nome: "Rio de Janeiro",
    uf: "RJ",
  },
  {
    id: 3,
    nome: "São Paulo",
    uf: "SP",
  },
];

app.get("/", (req, res) => {
  res.status(200).send("Home - Express");
});

app.get("/cidades", (req, res) => {
  res.status(200).send(cidades);
});

app.get("/cidades/:id", (req, res) => {
  const id = req.params.id;
  const cidade = cidades.find((elemento) => elemento.id === Number(id)) || null;
  if (cidade) {
    res.status(200).send(cidade);
  } else {
    res.status(404).send("Cidade não encontrada");
  }
});

app.post("/cidades", (req, res) => {
  cidades.push(req.body);
  res.status(201).send(req.body);
});

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
app.delete("/cidades/:id", (req, res) => {
  const cidadeDeletada = deletarCidade(req.params.id);
  res.status(200).send("Cidade Deletada com sucesso");
});

export default app;
