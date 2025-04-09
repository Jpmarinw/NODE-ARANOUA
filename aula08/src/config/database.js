import { Sequelize } from "sequelize";
import Pessoa from "../models/Pessoa.js";
import Cidade from "../models/Cidade.js";

const sequelize = new Sequelize ( {
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
});

Cidade.initModel(sequelize);
Pessoa.initModel(sequelize);

export default sequelize;