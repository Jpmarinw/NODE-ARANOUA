import { Sequelize } from "sequelize";
import Pessoa from "../models/Pessoa.js";
import Cidade from "../models/Cidade.js";
import Estado from "../models/Estado.js";

const sequelize = new Sequelize ( {
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
});

Estado.initModel(sequelize);
Cidade.initModel(sequelize);
Pessoa.initModel(sequelize);

export default sequelize;