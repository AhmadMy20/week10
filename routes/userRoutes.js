import express from "express";
import userControllers from "../controller/userControllers.js";
import { authentication } from "../middlewares/authentication.js";
import { userAuthorization } from "../middlewares/authorization.js";

const router = express.Router();

router.post("/register", userControllers.register);
router.post("/login", userControllers.login);

router.get("/users", authentication, userControllers.getAllUser);
router.get("/user/:id", authentication, userControllers.getuserById);
router.put("/edit/user", authentication, userControllers.updateUser);

router.delete(
  "/delete/:id",
  authentication,
  userAuthorization,
  userControllers.deleteUser
);

export default router;
