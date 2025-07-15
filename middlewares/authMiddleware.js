import { configDotenv } from "dotenv";
import { verify } from "jsonwebtoken";
configDotenv();

export default function (req, res, next) {
  const AuthHeader = req.header("Authorization");

  if (!AuthHeader || !AuthHeader.startsWith("Bearer ")) {
    return res.json({ message: "no token found" });
  }

  const token = AuthHeader.split(" ")[1];
  try {
    const decode = verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    res.json({ message: "invalid or expired token" });
  }
}
