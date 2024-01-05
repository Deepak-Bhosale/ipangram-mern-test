import { errorMessages, status } from "../../libs/constant";
import { Request, Response, NextFunction } from "express";
import { departmentRepository } from "../../repositories/department/DepartmentRepository";

class DepartmentController {

  getAllDepartmentsData = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const options = request.query;
      const departmentData = await departmentRepository.getAllDepartment(options);
      const arr = [];
      console.log(arr);
      departmentData?.forEach((value) => {
        !value?.name && arr.push(value);
      });
      response.status(200).send({
        message: `successfully fetched departments ${await departmentRepository.countDepartments()}`,
        data: departmentData,
        status: status.SUCCESS,
      });
    } catch (error) {
      console.log("CATCH BLOCK : department controller listDepartments =>", error);
      throw next({
        error: errorMessages.BAD_REQUEST,
        message: "invalid required",
        status: status.BAD_REQUEST,
      });
    }
  };

  create = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { name } = request.body;
      const departmentExists = await departmentRepository.findOneDepartment({
        name,
      });
      if (departmentExists === null) {
            const output = await departmentRepository.createDepartment(request.body, {
              deletedAt: 0,
            });
            response.status(200).send({
              message: "successfully created department",
              data: output,
              status: status.SUCCESS,
            });
      } else {
        response.status(404).send({
          error: errorMessages.BAD_REQUEST,
          message: "Department already exists",
          status: status.BAD_REQUEST,
        });
      }
    } catch (error) {
      console.log("CATCH BLOCK : department controller create =>", error);
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
      const departmentExists = await departmentRepository.findOneDepartment({
        originalId,
      });
      if (departmentExists) {
        const updatedData = Object.assign(
          JSON.parse(JSON.stringify(departmentExists)),
          request.body
        );
        const result = await departmentRepository.updateDepartment(
          { originalId },
          updatedData,
          { deletedAt: 0 }
        );
        response.status(200).send({
          message: "successfully updated department",
          data: result,
          status: status.SUCCESS,
        });
      } else {
        throw next({
          error: errorMessages.BAD_REQUEST,
          message: "department is not exists",
          status: status.BAD_REQUEST,
        });
      }
    } catch (error) {
      console.log("CATCH BLOCK : department controller update =>", error);
      throw next({
        error: errorMessages.BAD_REQUEST,
        message: "you cannot update department exception",
        status: status.BAD_REQUEST,
      });
    }
  };

  delete = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { originalId } = request.params;
      const departmentExists = await departmentRepository.findOneDepartment({ originalId });
      if (departmentExists) {
        await departmentRepository.deleteDepartment({ originalId });
        response.status(200).send({
          message: "successfully deleted department",
          data: { originalId },
          status: status.SUCCESS,
        });
      } else {
        throw next({
          error: errorMessages.BAD_REQUEST,
          message: "department is not exists",
          status: status.BAD_REQUEST,
        });
      }
    } catch (error) {
      console.log("CATCH BLOCK : department controller delete =>", error);
      throw next({
        error: errorMessages.BAD_REQUEST,
        message: "originalId is required",
        status: status.BAD_REQUEST,
      });
    }
  };
}

export default new DepartmentController();
