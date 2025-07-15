import { configDotenv } from "dotenv";
import { readFile, writeFile } from "node:fs/promises";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

configDotenv();

export const getUsers = async () => {
  try {
    const data = await readFile("users.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") return []; //if file not found
    throw error;
  }
};

export const setUsers = async (users) => {
  await writeFile("users.json", JSON.stringify(users, null, 2));
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const users = await getUsers();

  const user = users.find((u) => u.email === email);
  if (user) {
    return res.json({ message: "user already exist" });
  }
  const role = user.email === "admin01@gmail.com" ? "admin" : "user";

  const hashPassword = await bcrypt.hash(password, 10);
  users.push({ name, email, password: hashPassword, role });
  await setUsers(users);
  res.json({ message: "register successfully" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const users = await getUsers();

  const user = users.find((u) => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.json({ message: "user not found" });
  }

  const token = sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};

export const dashboard = (req, res) => {
  res.json({ message: `welcome ${req.user.name}` });
};
