import Pessoa from "./models/Pessoa.js";
import sequelize from "./config/database.js";

async function criarPessoa(pessoa) {
    console.log("\n--- CREATE ---");
    const novaPessoa = await Pessoa.create(pessoa);
    console.log("Pessoa criada com sucesso:", novaPessoa.toJSON());
    return novaPessoa;
}

async function main() {
    try {
        await sequelize.sync({ force: true });
        console.log("Banco de dados sincronizado com sucesso.");

        const pessoa = {
            nome: "Joao Marinho",
            telefone: "9999-9999",
            email: "joao.marinho@example.com",
        };

        const novaPessoa = await criarPessoa(pessoa);
    } catch (error) {
        console.error("Erro ao criar a pessoa:", error);
    } finally {
        await sequelize.close();
        console.log("Conexão com o banco de dados encerrada.");
    }
}

main();
