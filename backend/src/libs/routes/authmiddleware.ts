import * as jwt from "jsonwebtoken";
import { configuration } from "../../config/configuration";
import { Response, NextFunction } from "express";
import { userRepository } from "../../repositories/user/UserRepository";
import { resolve } from "path";

export default async (request: any, response: Response, next: NextFunction) => {
    try {
    const token = request.header("Authorization");
    console.log('Inside auth token is ', token);
    const { jwt_secret } = configuration;

    if (token) {
      const { data }: any = jwt.verify(token, jwt_secret);
      console.log('decoded token is', data);

      const userExists = await userRepository.findOneUser({
        originalId: data.originalId,
      });
      const hasPermission = userExists.role === 'parent';
      console.log('userExists', userExists);
      if (!userExists) {
        response.send({
          error: "not exits",
          message: "Permission Denied",
          status: 404,
        });
      }
      if (!hasPermission){
        response.send({
            error: "no Permission",
            message: "Permission Denied",
            status: 404,
        })
      }
      request.user = data;
      next();
    } else {
      response.status(404).send({
        message: "Token Not Found",
        status: 404,
      });
    }
  } catch (error) {
    console.log("CATCH BLOCK : AuthMiddleware =>", error);
  }
};
