import { DataTypes } from "sequelize";
import Fabricante from "./Fabricante.js"; // Importando o modelo Fabricante

class Medicamento extends Fabricante {
    static initModel(sequelize) {
        Medicamento.init(
            {
                nome_comercial: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                principio_ativo: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                registro_anvisa: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                dosagem: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                fabricante_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: Fabricante, // Nome do modelo referenciado
                        key: "id", // Chave primária da tabela referenciada
                    },
                },
            },
            {
                sequelize, // Conexão do Sequelize
                modelName: "Medicamento", // Nome do modelo
                tableName: "medicamentos", // Nome da tabela no banco de dados
                timestamps: true, // Adiciona campos CreatedAt e UpdatedAt
            }
        );

        Medicamento.belongsTo(Fabricante, {
            foreignKey: "fabricante_id",
            as: "fabricante", // Nome do alias para a associação
        });
    }
}

export default Medicamento;
