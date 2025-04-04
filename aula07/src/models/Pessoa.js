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
        sequelize,
        modelName:'Pessoa',
        tableName: 'pessoas',
        timestamps: true,
    }
);

export default Pessoa;