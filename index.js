import express from "express";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import { errorHandler } from "./middlewares/errorHandlers.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
