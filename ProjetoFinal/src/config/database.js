import { Sequelize } from "sequelize";
import Fabricante from "../model/Fabricante.js";
import Medicamento from "../model/Medicamento.js";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false,
});

Fabricante.initModel(sequelize);
Medicamento.initModel(sequelize);

Fabricante.associate(sequelize.models);

export default sequelize;
