import express from "express";
import {
  createProduct,
  allDataProduct,
  detailData,
  updateData,
  restoreData,
  softDeteleData,
  deleteData,
} from "../controllers/products.js";

import uploadImg from "../middleware/uploadImg.js";

const routes = express.Router();

routes.post("/products/new", uploadImg, createProduct);
routes.get("/products", allDataProduct);
routes.get("/products/:id", detailData);
routes.put("/products/:id", uploadImg, updateData);
routes.patch("/products/:id", restoreData);
routes.delete("/products/remove/:id", softDeteleData);
routes.delete("/products/:id", deleteData);

export default routes;
