import sequelize from "./src/config/database";
import Estado from "./src/models/Estado";
import Cidade from "./src/models/Cidade";
import Pessoa from "./src/models/Pessoa";

(async () => {
    try {
        await sequelize.sync({ force: true });
        console.log("Banco de dados sincronizado com sucesso.");

        await Estado.create({
            nome: "São Paulo",
            sigla: "SP",
        });

        await Estado.create({
            nome: "Rio de Janeiro",
            sigla: "RJ",
        });

        await Estado.create({
            nome: "Amazonas",
            sigla: "AM",
        });

        console.log("Estados criados");

        await Cidade.create({
            ibge: "1234567",
            nome: "São Paulo",
            estado_id: 1,
        });

        await Cidade.create({
            ibge: "2345678",
            nome: "Rio de Janeiro",
            estado_id: 2,
        });

        await Cidade.create({
            ibge: "3456789",
            nome: "Manaus",
            estado_id: 3,
        });

        console.log("Cidades criadas");

        await Pessoa.create({
            nome: "João Pedro",
            telefone: "11987654321",
            email: "joao.pedro@example",
            cidade_id: 3,
        });

        console.log("Pessoas criadas");
    } catch (error) {
        console.error("Erro ao criar dados iniciais:", error);
    }
})();
