import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Pessoa extends Model {}

// Configuração de pessoa
Pessoa.init (
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
        modelName:'Pessoa', // Nome do modelo
        tableName: 'pessoas', // Nome da tabela no banco de dados
        timestamps: true, // Adiciona campos CreatedAt e UpdatedAt
    }
);

export default Pessoa;