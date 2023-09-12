import "dotenv/config"
import express from "express";
import cors from "cors";
import { router } from "./routes";
import dbConnect from "./config/mongo";
import multer from "multer";

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(router)

dbConnect().then(()=>{console.log('DB CONNECTED')})
app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
