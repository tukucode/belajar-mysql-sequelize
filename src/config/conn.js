import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  host: "localhost",
  username: "root",
  password: "",
  database: "sewamotor",
  dialect: "mysql",
});

export default sequelize;
