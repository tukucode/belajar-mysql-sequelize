import sequelize from "../config/conn.js";
import { DataTypes } from "sequelize";

const ModelStorages = sequelize.define(
  "Storages",
  {
    image: {
      type: DataTypes.STRING,
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

export default ModelStorages;
