import * as yup from "yup";

export const editUserValidationSchema = yup.object({
  firstName: yup.string().label("First Name").required(),
  lastName: yup.string().label("Last Name").required(),
  email: yup.string().email().label("Email Address").required(),
  password: yup.string().label("Password").required(),
});

export let initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  isTouched: {},
  error: {},
  isDisabled: true,
};

