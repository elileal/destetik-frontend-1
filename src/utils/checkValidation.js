const checkValidation = errors => {
  const validation = {};
  if (errors.email) validation.emailValidation = { invalid: true };
  if (errors.name) validation.nameValidation = { invalid: true };
  if (errors.password) validation.passwordValidation = { invalid: true };
  if (errors.password2) validation.password2Validation = { invalid: true };
  return validation;
};

export default checkValidation;
