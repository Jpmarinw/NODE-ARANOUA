import express from "express";

const app = express();

app.use(express.json());

const cidades = [
    {
        "id": 1,
        "nome": "Manaus",
        "uf": "AM"
    },
    {
        "id": 2,
        "nome": "Rio de Janeiro",
        "uf": "RJ"
    },
    {
        "id": 3,
        "nome": "São Paulo",
        "uf": "SP"
    }
]

app.get("/", (req, res) => {
    res.status(200).send("Home - Express");
});

app.get("/cidades", (req, res) => {

    res.status(200).send(cidades);
});

app.get("/cidades/:id", (req, res) => {

    const id = req.params.id;

    const cidade = cidades.find(c => c.id == id);

    res.status(200).send(cidade);
})

app.post("/cidades", (req, res) => {
    const cidade = req.body;
    cidades.push(cidade);
    res.status(201).send(cidade);
});

app.put("/cidades/:id", (req, res) => {
    const nome = req.body;

});

app.delete("/cidades/:id", (req, res) => {
    const id = req.params.id;
    const index = cidades.findIndex(c => c.id == id);
    cidades.splice(index, 1);
    res.status(204).send();
});

export default app;
