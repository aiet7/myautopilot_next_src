export const validateInput = (user) => {
  console.log(user)
  if (isInputEmpty(user.password)) return "A password is required.";
  if (!isPasswordValid(user.password))
    return "Password should be at least 8 characters.";

  if (isInputEmpty(user.businessPhone)) return "A phone number is required.";
  if (!isPhoneInputValid(user.businessPhone))
    return "Invalid phone number format.";

  if (
    !isInputEmpty(user.businessEmail) &&
    !isEmailInputValid(user.businessEmail)
  )
    return "Invalid email format.";

  if (!isInputEmpty(user.firstName) && !isNameInputValid(user.firstName))
    return "First name is invalid.";

  if (!isInputEmpty(user.lastName) && !isNameInputValid(user.lastName))
    return "Last name is invalid.";

  if (!isInputEmpty(user.businessName) && !isNameInputValid(user.businessName))
    return "Business name is invalid.";

  if (
    !isInputEmpty(user.address.street) &&
    !isStreetNameValid(user.address.street)
  )
    return "Street name is invalid.";

  if (!isInputEmpty(user.address.city) && !isCityNameValid(user.address.city))
    return "City name is invalid.";

  if (
    !isInputEmpty(user.address.zipcode) &&
    !isZipCodeValid(user.address.zipcode)
  )
    return "Invalid zip code.";

  if (
    !isInputEmpty(user.address.state) &&
    !isStateNameValid(user.address.state)
  )
    return "State name is invalid.";

  return null;
};

export const validateField = (field, value) => {
  if (field === "password") {
    if (isInputEmpty(value)) return "A password is required.";
    if (!isPasswordValid(value))
      return "Password should be at least 8 characters.";
  }

  if (field === "businessPhone") {
    if (isInputEmpty(value)) return "A phone number is required.";
    if (!isPhoneInputValid(value)) return "Invalid phone number format.";
  }

  if (
    field === "businessEmail" &&
    !isInputEmpty(value) &&
    !isEmailInputValid(value)
  ) {
    return "Invalid email format.";
  }

  if (
    ["firstName", "lastName", "businessName"].includes(field) &&
    !isInputEmpty(value) &&
    !isNameInputValid(value)
  ) {
    return `${field} is invalid.`;
  }

  if (field === "street" && !isInputEmpty(value) && !isStreetNameValid(value)) {
    return "Street name is invalid.";
  }
  if (field === "city" && !isInputEmpty(value) && !isCityNameValid(value)) {
    return "City name is invalid.";
  }
  if (field === "zipcode" && !isInputEmpty(value) && !isZipCodeValid(value)) {
    return "Invalid zip code.";
  }
  if (field === "state" && !isInputEmpty(value) && !isStateNameValid(value)) {
    return "State name is invalid.";
  }

  return null;
};

export const isInputEmpty = (input) => {
  console.log(input)
  return input.trim() === "";
};

export const isEmailInputValid = (emailInput) => {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(emailInput);
};

export const isNameInputValid = (nameInput) => {
  const nameRegex = /^[a-zA-Z\s]+$/;
  return nameRegex.test(nameInput);
};

export const isPhoneInputValid = (phoneInput) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneInput);
};

export const isStreetNameValid = (streetName) => {
  const streetRegex = /^[a-zA-Z0-9\s]+$/;
  return streetRegex.test(streetName);
};

export const isCityNameValid = (cityName) => {
  const cityRegex = /^[a-zA-Z\s]+$/;
  return cityRegex.test(cityName);
};

export const isZipCodeValid = (zipCode) => {
  const zipCodeRegex = /^\d{5}$/;
  return zipCodeRegex.test(zipCode);
};

export const isStateNameValid = (stateName) => {
  const stateRegex = /^[a-zA-Z\s]+$/;
  return stateRegex.test(stateName);
};

export const isPasswordValid = (password) => {
  return password.length >= 8;
};
