import sqlite3 from "sqlite3";

sqlite3.verbose();

const db = new sqlite3.Database("./db.sqlite3", (err) => {
  if (err) {
    console.error("Erro ao conectar no banco de dados", err.message);
  } else {
    console.log("Conectado ao banco de dados.");
  }
});

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS CIDADE(" +
      " ID INTEGER PRIMARY KEY AUTOINCREMENT," +
      " NOME TEXT NOT NULL," +
      " UF TEXT NOT NULL)",
    (err) => {
      if (err) {
        console.error("Erro ao criar a tabela", err.message);
      } else {
        console.log("Tabela criada com sucesso.");
      }
    }
  );
});

export default db;
