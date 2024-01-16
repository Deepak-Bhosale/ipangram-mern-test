export const getError = (touched, errors, field) => {
  if (touched[field]) {
    console.log('error for', field);
    return errors[field] || '';
  }
  return null;
};

export const hasErrors = (errors) => Object.keys(errors).length !== 0;
export const isTouched = (touched) => Object.keys(touched).length !== 0;
