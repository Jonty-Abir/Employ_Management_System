import connection from "../../../DataBase/connection";
import { deletedUser, getUser, putUser } from "../../../DataBase/controller";

export default async function handler(req, res) {
  connection().catch((err) => {
    res.status(405).json({ error: "Error in Connection to DB!" });
  });
  const { method } = req;
  switch (method) {
    case "GET":
      getUser(req, res);
      break;
    case "POST":
      break;
    case "PUT":
      putUser(req, res);
      break;
    case "DELETE":
      deletedUser(req, res);
      break;
    default:
      res.setHeader("allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).send(`Method ${method} not allowed.`);
      break;
  }
}
