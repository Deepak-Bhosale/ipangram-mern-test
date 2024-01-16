import { errorMessages } from '../../libs/constant';

export default Object.freeze({
  get: {},
  userProfileData: {},
  getAllUsersData: {},
  create: {
    firstName: {
      errorMessage: errorMessages.BAD_NAME_REQUEST,
      in: ['body'],
      isLength: {
        errorMassage: errorMessages.BAD_NAME_REQUEST,
        options: { min: 3 },
      },
    },
    lastName: {
      errorMessage: errorMessages.BAD_NAME_REQUEST,
      in: ['body'],
      isLength: {
        errorMassage: errorMessages.BAD_NAME_REQUEST,
        options: { min: 3 },
      },
    },
    email: {
      errorMessage: errorMessages.BAD_EMAIL_REQUEST,
      regex:'[a-z0-9A-Z]+@gmail.com$',
      in: ['body'],
      isLength: {
        errorMassage: errorMessages.BAD_EMAIL_REQUEST,
        options: { min: 6 },
      },
    },
    password: {
      errorMessage: errorMessages.BAD_PASSWORD_REQUEST,
      in: ['body'],
      isLength: {
        errorMassage: errorMessages.BAD_PASSWORD_REQUEST,
        options: { min: 6 },
      },
    },
  },
  update: {
    originalId: {
      string: true,
      exist: true,
      errorMessage: errorMessages.BAD_ORIGINALID_REQUEST,
      in: ['params'],
    },
  },
  delete: {
    originalId: {
      string: true,
      exist: true,
      errorMessage: errorMessages.BAD_ORIGINALID_REQUEST,
      in: ['params'],
    },
  },
});
