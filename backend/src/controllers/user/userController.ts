import { errorMessages, status } from "../../libs/constant";
import { Request, Response, NextFunction } from "express";
import { userRepository } from "../../repositories/user/UserRepository";
import * as jwt from "jsonwebtoken";
import { configuration } from "../../config/configuration";

class UserController {

  getAllUsersData = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const options = request.query;
      const userData = await userRepository.getAllUser(options);
      const arr = [];
      console.log(arr);
      userData?.forEach((value) => {
        !value?.role && arr.push(value);
      });
      response.status(200).send({
        message: `successfully fetched users ${await userRepository.countUsers()}`,
        data: userData,
        status: status.SUCCESS,
      });
    } catch (error) {
      console.log("CATCH BLOCK : user controller listUsers =>", error);
      throw next({
        error: errorMessages.BAD_REQUEST,
        message: "invalid required",
        status: status.BAD_REQUEST,
      });
    }
  };

  create = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { email, role } = request.body;
      console.log('role', role);
      const userExists = await userRepository.findOneUser({
        email,
      });
      if (userExists === null) {
          if (email.match("[a-z0-9A-Z]+@gmail.com$")) {
            const output = await userRepository.createUser(request.body, {
              deletedAt: 0,
            });
            response.status(200).send({
              message: "successfully created user",
              data: output,
              status: status.SUCCESS,
            });
          } else {
            response.status(404).send({
              error: errorMessages.BAD_REQUEST,
              message: "enter a valid emailId",
              status: status.BAD_REQUEST,
            });
          }
      } else {
        response.status(404).send({
          error: errorMessages.BAD_REQUEST,
          message: "User already exists",
          status: status.BAD_REQUEST,
        });
      }
    } catch (error) {
      console.log("CATCH BLOCK : user controller create =>", error);
      throw next({
        error: errorMessages.BAD_REQUEST,
        message: "details are required",
        status: status.BAD_REQUEST,
      });
    }
  };

  createStudent = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { email, role } = request.body;
      const userExists = await userRepository.findOneUser({
        email,
      });
      if (userExists === null) {
          if (email.match("[a-z0-9A-Z]+@gmail.com$")) {
            const output = await userRepository.createUser(request.body, {
              deletedAt: 0,
            });
            response.status(200).send({
              message: "successfully created Student",
              data: output,
              status: status.SUCCESS,
            });
          } else {
            response.status(404).send({
              error: errorMessages.BAD_REQUEST,
              message: "enter a valid emailId",
              status: status.BAD_REQUEST,
            });
          }
      } else {
        response.status(404).send({
          error: errorMessages.BAD_REQUEST,
          message: "Student already exists",
          status: status.BAD_REQUEST,
        });
      }
    } catch (error) {
      console.log("CATCH BLOCK : user controller create =>", error);
      throw next({
        error: errorMessages.BAD_REQUEST,
        message: "details are required",
        status: status.BAD_REQUEST,
      });
    }
  };

  update = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { originalId } = request.params;
      const userExists = await userRepository.findOneUser({
        originalId,
      });
      if (userExists) {
        const updatedData = Object.assign(
          JSON.parse(JSON.stringify(userExists)),
          request.body
        );
        const result = await userRepository.updateUser(
          { originalId },
          updatedData,
          { deletedAt: 0 }
        );
        response.status(200).send({
          message: "successfully updated user",
          data: result,
          status: status.SUCCESS,
        });
      } else {
        throw next({
          error: errorMessages.BAD_REQUEST,
          message: "user is not exists",
          status: status.BAD_REQUEST,
        });
      }
    } catch (error) {
      console.log("CATCH BLOCK : user controller update =>", error);
      throw next({
        error: errorMessages.BAD_REQUEST,
        message: "you cannot update user exception",
        status: status.BAD_REQUEST,
      });
    }
  };

  delete = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { originalId } = request.params;
      const userExists = await userRepository.findOneUser({ originalId });
      if (userExists) {
        await userRepository.deleteUser({ originalId });
        response.status(200).send({
          message: "successfully deleted user",
          data: { originalId },
          status: status.SUCCESS,
        });
      } else {
        throw next({
          error: errorMessages.BAD_REQUEST,
          message: "user is not exists",
          status: status.BAD_REQUEST,
        });
      }
    } catch (error) {
      console.log("CATCH BLOCK : user controller delete =>", error);
      throw next({
        error: errorMessages.BAD_REQUEST,
        message: "originalId is required",
        status: status.BAD_REQUEST,
      });
    }
  };

  async generateToken(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const user = await userRepository.findOneUser({ email, password });
      const token = jwt.sign(
        {data: user},
        configuration.jwt_secret,
      );
      const userRole = user.role
      const userData = {
        originalId: user?.originalId,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        role: user?.role,
        location: user?.location,
      }
      if (user) {
        res.status(200).send({
          message: "token created successfully",
          data: { token, userRole, user: userData },
          status: "success",
        });
      } else {
        next({
          error: "Incorrect Password",
          message: "Please enter correct Password",
          status: 400,
        });
      }
      if (!user) {
        res.status(404).send({
          error: "Incorrect User",
          message: "token not created",
          status: "error",
        });
      }
    } catch (err) {
      next({
        error: "Incorrect email and Password mentioned",
        message: "Please enter a correct email and password",
        status: 400,
      });
    }
  }
}

export default new UserController();
