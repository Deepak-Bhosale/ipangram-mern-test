import { Router } from "express";
import user from "./userController";
import authmiddleware from "../../libs/routes/authmiddleware";

const userRouter: Router = Router();
userRouter
  .get("/allUsersData", user.getAllUsersData)
  .post("/", user.create)
  .post("/createStudent", authmiddleware, user.createStudent)
  .put("/:originalId", user.update)
  .delete("/:originalId", user.delete)
  .post("/generateToken", user.generateToken);

export default userRouter;
