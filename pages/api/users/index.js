import connectMongo from "../../../DataBase/connection";
import {
  deleteUsers,
  getUsers,
  postUsers,
  updateUsers
} from "../../../DataBase/controller";

export default function handler(req, res) {
  const { method } = req;
  connectMongo().catch((err) =>
    res.status(405).json({ error: `Error in the Connection` })
  );

  switch (method) {
    case "GET":
      getUsers(req, res);
      break;
    case "POST":
      postUsers(req, res);
      break;
    case "PUT":
      updateUsers(req, res);
      break;
    case "DELETE":
      deleteUsers(req, res);
      break;
    default:
      res.setHeader("allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowd`);
      break;
  }
}
