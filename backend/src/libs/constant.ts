import * as mongoose from "mongoose";

export const ADMIN_DATA = {
  originalId: new mongoose.Types.ObjectId(),
  firstName: "Deepak",
  lastName: "Bhosale",
  email: "deepak.bhosale@gmail.com",
  role: "manager",
  password: 'Deepak@123'
};

export const errorMessages = {
  BAD_NAME_REQUEST: "Name is required",
  BAD_REQUEST: "Error Message",
  BAD_ID_REQUEST: "ID is wrong",
  BAD_BUNIT_REQUEST: "Bussiness unit is required",
  BAD_LOCATION: "Location is required",
  BAD_CONTACT: "Contact No is required",
  UNAUTHORIZED_ACCESS: "Unauthorized",
  BAD_TOKEN_REQUEST: "Token not found",
  BAD_PASSWORD_REQUEST: " Password is required",
  BAD_EMAIL_REQUEST: "Email ID is required",
  BAD_ROLE_REQUEST: "Role is mendtary or wrong",
  BAD_ORIGINALID_REQUEST: "OriginalID is Mendetary or worng",
};

export const status = {
  BAD_REQUEST: 404,
  UNAUTHORIZED: 403,
  SUCCESS: 200,
  BAD_INTERNAL_REQUEST: 500,
};

