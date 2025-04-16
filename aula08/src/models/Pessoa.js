import { DataTypes, Model } from "sequelize";
import Cidade from "./Cidade.js";

class Pessoa extends Model {
    static initModel(sequelize) {
        Pessoa.init(
            {
                nome: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                telefone: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                    validate: {
                        isEmail: true,
                    },
                },
            },
            {
                sequelize, // Conexão do Sequelize
                modelName: "Pessoa", // Nome do modelo
                tableName: "pessoas", // Nome da tabela no banco de dados
                timestamps: true, // Adiciona campos CreatedAt e UpdatedAt
            }
        );

        Pessoa.belongsTo(Cidade, {
            foreignKey: "cidade_id",
            as: "cidade",
        });
    }
}

export default Pessoa;
