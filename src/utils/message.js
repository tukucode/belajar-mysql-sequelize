export default function message(res, code, message, data, pagination) {
  const result = { code, message, data, pagination };

  res.status(code).send(result);
}
