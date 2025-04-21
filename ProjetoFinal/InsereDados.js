import sequelize from "./config/database.js";
import Medicamento from "./models/medicamento.js";
import Fabricante from "./models/fabricante.js";

(async () => {
    try {
        await sequelize.sync({ force: true });
        console.log("Banco de dados sincronizado com sucesso.");

        await Fabricante.create({
            nome: "Fabricante A",
            endereco: "Rua A, 123",
            telefone: "123456789",
        });

        await Fabricante.create({
            nome: "Fabricante B",
            endereco: "Rua B, 456",
            telefone: "987654321",
        });

        await Medicamento.create({
            nome: "Medicamento A",
            descricao: "Descrição do Medicamento A",
            preco: 10.99,
            fabricanteId: 1,
        });

        await Medicamento.create({
            nome: "Medicamento B",
            descricao: "Descrição do Medicamento B",
            preco: 19.99,
            fabricanteId: 2,
        });

        console.log("Dados inseridos com sucesso.");
    } catch (error) {
        console.error("Erro ao inserir dados:", error);
    }
})();
