import { log } from "console";
import express from "express";
import router from "./routes/authRoute";
const app = express;

app.use(express.json());
app.use("/api", router);

app.listen(3000, () => {
  log("server running on http://localhost:3000");
});
