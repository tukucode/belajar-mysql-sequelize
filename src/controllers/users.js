import message from "../utils/message.js";
import {
  modelAllData,
  modelDetailData,
  modelCreateData,
  modelUpdateData,
  modelDeleteData,
} from "../models/users.js";

/**
 * @typedef {import('express').Request} ExpressRequest
 * @typedef {import('express').Response} ExpressResponse
 */

/**
 * Route handler for the root endpoint.
 * @param {ExpressRequest} req - The Express request object.
 * @param {ExpressResponse} res - The Express response object.
 */

export function allData(req, res) {
  modelAllData()
    .then((response) => {
      message(res, 200, "All data", response);
    })
    .catch((error) => {
      message(res, 500, error.message || "Server internal error");
    });
}

/**
 * Route handler for the root endpoint.
 * @param {ExpressRequest} req - The Express request object.
 * @param {ExpressResponse} res - The Express response object.
 */
export async function detailData(req, res) {
  try {
    const id = req.params.id;
    const detail = await modelDetailData(id);

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
export async function createData(req, res) {
  try {
    const data = req.body;

    await modelCreateData(data);

    message(res, 201, "Create data success");
  } catch (error) {
    message(res, 500, error.message || "Server internal error");
  }
}

/**
 * Route handler for the root endpoint.
 * @param {ExpressRequest} req - The Express request object.
 * @param {ExpressResponse} res - The Express response object.
 */
export async function updateData(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;

    await modelUpdateData(id, data);

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
export function deleteData(req, res) {
  const id = req.params.id;

  modelDeleteData(id)
    .then(() => {
      message(res, 200, "Delete data success");
    })
    .catch((error) => {
      message(res, 500, error.message || "Server internal error");
    });
}
