import { DataTypes, Model } from "sequelize";

class Estado extends Model {
    static initModel(sequelize) {
        Estado.init(
            {
                nome: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                sigla: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                    validate: {
                        len: [2, 2], // A sigla deve ter exatamente 2 caracteres
                    },
                },
            },
            {
                sequelize, // Conexão do Sequelize
                modelName: "Estado", // Nome do modelo
                tableName: "estados", // Nome da tabela no banco de dados
                timestamps: true,
            }
         );
    }
}

export default Estado;