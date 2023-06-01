export const isInputEmpty = (input) => {
  return input.trim() === "";
};

export const isEmailInputValid = (emailInput) => {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(emailInput);
};
