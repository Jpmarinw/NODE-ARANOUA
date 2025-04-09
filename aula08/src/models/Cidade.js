import { DataTypes, Model } from "sequelize";

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
        estado: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize, // Conexão do Sequelize
        modelName: "Cidade", // Nome do modelo
        tableName: "cidades", // Nome da tabela no banco de dados
        timestamps: true, // Adiciona campos CreatedAt e UpdatedAt
      }
    );
  }
}
export default Cidade;
