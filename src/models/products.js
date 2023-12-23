import sequelize from "../config/conn.js";
import ModelStorages from "./storeage.js";
import { DataTypes } from "sequelize";

const ModelProducts = sequelize.define(
  "Products",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    storage_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    // softdelete
    paranoid: true,
    deletedAt: "deleted_at",
  }
);

// Define the association Tb Products with Tb Storages
ModelProducts.belongsTo(ModelStorages, {
  foreignKey: "storage_id",
  as: "storage",
});

export default ModelProducts;
