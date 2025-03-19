import http from "http";

const rotas = {
  "/": "Home",
  "/cidades": "Cidades",
  "/pessoas": "Pessoas",
};

//Configurar o servidor http
const servidor = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  console.log("URL:" + req.url);
  console.log("ROTA:" + rotas[req.url]);
  res.end("Requisição atendida");
});

//Iniciar o Servidor
servidor.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});
