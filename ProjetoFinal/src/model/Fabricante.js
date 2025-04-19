import { DataTypes, Model } from "sequelize";

class Fabricante extends Model {
    static initModel(sequelize) {
        Fabricante.init(
            {
                nome: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                documento_registro: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                pais: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize, // Conexão do Sequelize
                modelName: "Fabricante", // Nome do modelo
                tableName: "fabricantes", // Nome da tabela no banco de dados
                timestamps: true, // Adiciona campos CreatedAt e UpdatedAt
            }
        );
    }
}

export default Fabricante;