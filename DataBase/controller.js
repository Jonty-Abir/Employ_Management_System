import Users from "../Model/userSchema";

/***_______   Controller  ________**/
/***_______  GET http://localhost:3000/api/users   ________**/
export async function getUsers(req, res) {
  try {
    const users = await Users.find({});
    if (!users) return res.status(404).json({ error: "Data not Found" });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Data" });
  }
}
/***_______  POST http://localhost:3000/api/users   ________**/

export async function postUsers(req, res) {
  try {
    // const { date, email, firstname, lastname, sallery, status } = req.body;
    const userDetails = {
      ...req.body,
    };
    // const modle = new Users(userDetails);
    const newUser = await Users.create(userDetails);
    // const newUser = await modle.save();
    res.json({ user: newUser });
  } catch (err) {
    res.status(404).json({ error: err });
  }
}

/***_______  PUT http://localhost:3000/api/users   ________**/

export async function updateUsers(req, res) {
  try {
    const { userId } = req.query;
    const updatedUser = req.body;
    if (userId && Object.keys(req.body).length > 0) {
      const newuser = await Users.findByIdAndUpdate(
        { _id: userId },
        updatedUser,
        {
          new: true,
        }
      );
      if (newuser)
        return res
          .status(200)
          .json({ msg: "User update Sunccessfull..", newuser });
      res.status(404).json({ error: "user not found!" });
    }
    res.status(500).json({ error: "there was server-side error!" });
  } catch (err) {
    res.status(404).json({ error: "Error while updateing the deta!" });
  }
}

/***_______  DELETE http://localhost:3000/api/users   ________**/

export async function deleteUsers(req, res) {
  try {
    const { userId } = req.query;
    if (userId) {
      const deletedUser = await Users.findByIdAndDelete(
        { _id: userId },
        { new: true }
      );
      if (deletedUser)
        return res
          .status(200)
          .json({ msg: "Delete Successfull..", deleteUser });
    }
    res.status(404).json({ error: "Error was occure while deleteing user!" });
  } catch (err) {
    res.status(404).json({ error: "Deleteing failed!" });
  }
}

/***_______ GET http://localhost:3000/api/users/_id (params)   ________**/

export async function getUser(req, res) {
  try {
    const { userId } = req.query;
    if (userId) {
      const user = await Users.findOne({ _id: userId });
      if (user) return res.status(200).json({ mesg: "succeess", user });
      res.status(404).json({ error: "user was not found!" });
    }
  } catch (err) {
    res.status(500).json({ error: "There was serve side error!" });
  }
}

/***_______ PUT http://localhost:3000/api/users/_id (params)   ________**/

export async function putUser(req, res) {
  try {
    const body = req.body;
    const { userId } = req.query;
    if (userId && Object.keys(body).length > 0) {
      const updatedUser = await Users.findByIdAndUpdate({ _id: userId }, body, {
        new: true,
      });
      if (updatedUser)
        return res.status(200).json({ msg: "succeess", updatedUser });
      return res.status(404).json({ error: "user not found!" });
    }
    res.status(500).json({ error: "Nothing to update..!" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "there was serverside error!" });
  }
}
/***_______ DELETE http://localhost:3000/api/users/_id (params)   ________**/
export async function deletedUser(req, res) {
  try {
    const { userId } = req.query;
    if (userId) {
      const deletedData = await Users.findByIdAndDelete({ _id: userId });
      if (!deletedData) return res.status(404).json({ error: "not found!" });
      return res
        .status(200)
        .json({ msg: "User Deleted Success...", deletedData });
    }
    res.status(404).json({ error: "not found!" });
  } catch (err) {
    res.status(500).json({ error: "Serverside Error" });
  }
}
