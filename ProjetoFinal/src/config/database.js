import { Sequelize } from "sequelize";
import Fabricante from "../models/fabricante.js";
import Medicamento from "../models/medicamento.js";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false,
});

Fabricante.init(sequelize);
Medicamento.init(sequelize);

export default sequelize;
