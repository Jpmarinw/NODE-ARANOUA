import { DataTypes, Model } from "sequelize";
import Estado from "./Estado.js"; // Importa o modelo Estado

class Cidade extends Model {
    static initModel(sequelize) {
        Cidade.init(
            {
                nome: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                ibge: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                estado_id: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    references: {
                        model: Estado, // Nome do modelo referenciado
                        key: "id", // Chave primária da tabela referenciada
                    },
                },
            },
            {
                sequelize, // Conexão do Sequelize
                modelName: "Cidade", // Nome do modelo
                tableName: "cidades", // Nome da tabela no banco de dados
                timestamps: true, // Adiciona campos CreatedAt e UpdatedAt
            }
        );

        Cidade.belongsTo(Estado, {
            foreignKey: "estado_id",
            as: "estado", // Alias para a associação
        });
    }
}
export default Cidade;
