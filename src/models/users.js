import connection from "../config/connection.js";

// MODEL GET ALL DATA USER
export function modelAllData() {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT id, email, storage_id, created_at, updated_at, deleted_at FROM users",
      (err, result) => {
        if (err) {
          reject(new Error(err));
        } else resolve(result);
      }
    );
  });
}

// MODEL DETAIL DATA USER BY ID
export function modelDetailData(id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id, email, storage_id, created_at, updated_at, deleted_at FROM users WHERE id=${id}`,
      (err, result) => {
        if (err) {
          reject(new Error(err));
        } else resolve(result);
      }
    );
  });
}

// MODEL CREATE DATA
export function modelCreateData(data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO users SET ?`, data, (err, result) => {
      if (err) {
        reject(new Error(err));
      } else resolve(result);
    });
  });
}

// MODEL UPDATE DATA
export function modelUpdateData(id, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE users SET ? WHERE id=${id}`,
      data,
      (err, result) => {
        if (err) {
          reject(new Error(err));
        } else resolve(result);
      }
    );
  });
}

// MODEL DELETE DATA
export function modelDeleteData(id) {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM users WHERE id=${id}`, (err, result) => {
      if (err) {
        reject(new Error(err));
      } else resolve(result);
    });
  });
}
