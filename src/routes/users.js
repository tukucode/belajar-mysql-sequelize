import express from "express";
import {
  allData,
  detailData,
  createData,
  updateData,
  deleteData,
} from "../controllers/users.js";

const routes = express.Router();

routes.get("/users", allData);
routes.get("/users/:id", detailData);
routes.post("/users/new", createData);
routes.put("/users/:id", updateData);
routes.delete("/users/:id", deleteData);

export default routes;
