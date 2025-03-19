import express from "express";

const app = express();

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

export default app;
