import * as yup from "yup";

export const employeeTableColumn = [
  {
    label: 'First Name',
    value: 'firstName',
  },
  {
    label: 'Last Name',
    value: 'lastName',
  },
  {
    label: 'Email',
    value: 'email',
  },
  {
    label: 'Role',
    value: 'role',
  },
  {
    label: 'Location',
    value: 'location',
  },
//   {
//     label: 'Department',
//     value: 'department',
//   },
];

export const addUserState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  location: '',
  isTouched: {},
  error: {},
  isDisabled: true,
};

export const addDepartmentState = {
  department: '',
  isTouched: {},
  error: {},
  isDisabled: true,
};

export const addDepartmentValidationSchema = yup.object({
  department: yup.string().label('Department').required(),
});

export const addUserValidationSchema = yup.object({
  firstName: yup.string().label('First Name').required(),
  lastName: yup.string().label('Last Name').required(),
  email: yup.string().email().label('Email Address').required(),
  password: yup.string()
    .required('Password is required')
    .matches(/[a-z]/, 'At least one lowercase character is required')
    .matches(/[A-Z]/, 'At least one uppercase character is required')
    .matches(/[0-9]/, 'At least one number is required')
    .matches(/[^a-zA-Z0-9]/, 'At least one special character is required')
    .min(6, 'Password must be at least 6 characters long'),
  location: yup.string().label('Location').required(),

});

