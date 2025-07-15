import { getUsers, setUsers } from "./authController";

// get all user
export const getAllUser = async (req, res) => {
  const users = await getUsers();
  const allusers = users.map((u) => ({
    name: u.name,
    email: u.email,
    role: u.role,
  }));
  res.json(allusers);
};
// get one user by id
export const getOneUser = async (req, res) => {
  const users = await getUsers();
  const user = users.find((u) => u.email === req.params.email);

  if (!user) {
    return res.json({ message: "user not found" });
  }

  if (req.user.email !== user.email && req.user.role !== "admin") {
    //for give access to admin or only the valid user
    res.json({ message: "access denied" });
  }

  const { password, ...saveUser } = user;
  res.json(saveUser);
};
// edit one user
export const updateUser = async (req, res) => {
  const users = await getUsers();
  const index = users.findIndex((u) => u.email === req.params.email);
  if (index === -1) {
    return res.json({ message: "user noet found" });
  }
  const { name, password } = req.body;
  if (name) {
    users[index].name = name;
  }
  if (password) {
    users[index].password = await bcrypt.hash(password, 10);
  }
  setUsers(users);
  res.json({ message: "updated successfully" });
};

// delete one user
export const deleteUser = async (req, res) => {
  const users = getUsers();
  const index = users.findIndex((u) => u.email === req.params.email);

  if (index === -1) {
    return res.json({ message: "user not found" });
  }

  //   delete
  users.slice(index, 1);
  setUsers(users);
  res.json({ message: "delete successfuly" });
};
