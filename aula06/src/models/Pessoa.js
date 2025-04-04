import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Pessoa extends Model {}

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
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
    },
    {
        sequelize,
        modelName: "Pessoa",
        tableName: "pessoas",
        timestamps: true,
    }
);

export default Pessoa;
