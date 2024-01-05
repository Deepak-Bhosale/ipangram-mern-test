import * as express from "express";
import { userRouter } from "./controllers/user";
import { departmentRouter } from "./controllers/department";

const router: express.Router = express.Router();

router.use("/user", userRouter);
router.use('/department', departmentRouter)

export default router;
