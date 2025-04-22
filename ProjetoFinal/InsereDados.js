import sequelize from "./src/config/database.js";
import Medicamento from "./src/model/Medicamento.js";
import Fabricante from "./src/model/Fabricante.js";

(async () => {
    try {
        await sequelize.sync({ force: true });
        console.log("Banco de dados sincronizado com sucesso.");

        await Fabricante.create({
            nome: "Fabricante A",
            documento_registro: "000001",
            pais: "Brasil",
        });

        await Fabricante.create({
            nome: "Fabricante B",
            documento_registro: "000002",
            pais: "Colombia",
        });

        await Medicamento.create({
            nome_comercial: "Dipirona Monohidratada",
            principio_ativo: "Dipirona",
            registro_anvisa: "123456789",
            dosagem: "500mg",
            fabricante_id: 1,
        });

        await Medicamento.create({
            nome_comercial: "Nimesulida",
            principio_ativo: "Nimesulida",
            registro_anvisa: "987654321",
            dosagem: "100mg",
            fabricante_id: 2,
        });

        console.log("Dados inseridos com sucesso.");
    } catch (error) {
        console.error("Erro ao inserir dados:", error);
    }
})();
