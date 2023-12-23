import ModelProducts from "../models/products.js";
import ModelStorages from "../models/storeage.js";

import message from "../utils/message.js";
import { Op } from "sequelize";
import fs from "fs";

/**
 * @typedef {import('express').Request} ExpressRequest
 * @typedef {import('express').Response} ExpressResponse
 */

/**
 * Route handler for the root endpoint.
 * @param {ExpressRequest} req - The Express request object.
 * @param {ExpressResponse} res - The Express response object.
 */

// CREATE
export async function createProduct(req, res) {
  const file = req.file;
  if (!file) return message(res, 423, "Field image is required");

  try {
    const name = req.body.name;

    const createImage = await ModelStorages.create({ image: file.filename });
    const result = await ModelProducts.create({
      name,
      storage_id: createImage.id,
    });

    message(res, 201, "Create product success", result);
  } catch (error) {
    // DELETE FILE IN DIRECTORY PUBLIC
    const path = `./public/${file.filename}`;
    fs.unlinkSync(path);

    message(res, 500, error.message || "Server internal error");
  }
}

/**
 * Route handler for the root endpoint.
 * @param {ExpressRequest} req - The Express request object.
 * @param {ExpressResponse} res - The Express response object.
 */

// READ ALL DATA
export async function allDataProduct(req, res) {
  try {
    const q = req.query.q || "";
    const sort_by = req.query.sort_by ? req.query.sort_by : "desc";
    const page = req.query.page ? Number(req.query.page) : 1;
    const per_page = req.query.per_page ? Number(req.query.per_page) : 10;

    const offset = page === 1 ? 0 : (page - 1) * per_page;

    const total = await ModelProducts.count();
    const result = await ModelProducts.findAll({
      where: {
        name: {
          [Op.substring]: q,
        },
      },
      order: [["id", sort_by]],
      offset: offset,
      limit: per_page,
      include: [
        {
          model: ModelStorages,
          as: "storage",
          attributes: ["image"],
        },
      ],
    });

    const pagination = {
      page,
      per_page,
      total_page: Math.ceil(total / per_page),
      total_data: total,
    };

    message(res, 200, "All data", result, pagination);
  } catch (error) {
    message(res, 500, error.message || "Server internal error");
  }
}

/**
 * Route handler for the root endpoint.
 * @param {ExpressRequest} req - The Express request object.
 * @param {ExpressResponse} res - The Express response object.
 */

// READ DETAIL DATA
export async function detailData(req, res) {
  try {
    const id = req.params.id;

    const detail = await ModelProducts.findOne({
      where: {
        id,
      },
      include: [
        {
          model: ModelStorages,
          as: "storage",
          // attributes: ["image"],
        },
      ],
    });

    if (!detail) return message(res, 404, "Id product not found");

    message(res, 200, "Detail data", detail);
  } catch (error) {
    message(res, 500, error.message || "Server internal error");
  }
}

/**
 * Route handler for the root endpoint.
 * @param {ExpressRequest} req - The Express request object.
 * @param {ExpressResponse} res - The Express response object.
 */

// UPDATE DATA
export async function updateData(req, res) {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const file = req.file;

    const checkDetail = await ModelProducts.findOne({
      where: { id },
      include: [
        {
          model: ModelStorages,
          as: "storage",
          // attributes: ["image"],
        },
      ],
    });

    if (!checkDetail) return message(res, 404, "Product id not found");

    if (file) {
      const { id: _id, image } = checkDetail.storage;

      // delete image in public directory
      const path = `./public/${image}`;
      fs.unlinkSync(path);

      // update image in data table storage
      await ModelStorages.update(
        { image: file.filename },
        { where: { id: _id } }
      );
    }

    // update name in data table product
    await ModelProducts.update(
      { name },
      {
        where: {
          id,
        },
      }
    );

    message(res, 200, "Update data success");
  } catch (error) {
    message(res, 500, error.message || "Server internal error");
  }
}

/**
 * Route handler for the root endpoint.
 * @param {ExpressRequest} req - The Express request object.
 * @param {ExpressResponse} res - The Express response object.
 */

// RESTORE DATA SOFT DELETE
export async function restoreData(req, res) {
  try {
    const id = req.params.id;

    await ModelProducts.restore({
      where: {
        id,
      },
    });

    message(res, 200, "Restore data success");
  } catch (error) {
    message(res, 500, error.message || "Server internal error");
  }
}

/**
 * Route handler for the root endpoint.
 * @param {ExpressRequest} req - The Express request object.
 * @param {ExpressResponse} res - The Express response object.
 */

// SOFTDELETE
export async function softDeteleData(req, res) {
  try {
    const id = req.params.id;

    await ModelProducts.destroy({ where: { id } });
    message(res, 200, "Remove data success");
  } catch (error) {
    message(res, 500, error.message || "Server internal error");
  }
}

/**
 * Route handler for the root endpoint.
 * @param {ExpressRequest} req - The Express request object.
 * @param {ExpressResponse} res - The Express response object.
 */

// HARD DELETE
export async function deleteData(req, res) {
  try {
    const id = req.params.id;

    const checkDetail = await ModelProducts.findOne({
      where: { id },
      include: [
        {
          model: ModelStorages,
          as: "storage",
          // attributes: ["image"],
        },
      ],
    });

    if (!checkDetail) return message(res, 404, "Product id not found");

    const { id: _id, image } = checkDetail.storage;

    // delete image in public directory
    const path = `./public/${image}`;
    fs.unlinkSync(path);

    // delete data image on tb storage
    const destroyImage = ModelStorages.destroy({
      where: { id: _id },
      force: true,
    });

    // delete data product on tb produts
    const destroyProduct = ModelProducts.destroy({
      where: { id },
      force: true,
    });

    Promise.all([destroyImage, destroyProduct]);

    message(res, 200, "Detele data success");
  } catch (error) {
    message(res, 500, error.message || "Server internal error");
  }
}
