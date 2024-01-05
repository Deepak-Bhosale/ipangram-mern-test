import { Router } from "express";
import department from "./departmentController";
import authmiddleware from "../../libs/routes/authmiddleware";

const departmentRouter: Router = Router();
departmentRouter
  .get("/allDepartmentsData", department.getAllDepartmentsData)
  .post("/", department.create)
  .put("/:originalId", department.update)
  .delete("/:originalId", department.delete)

export default departmentRouter;
