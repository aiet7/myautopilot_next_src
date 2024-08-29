export const validateInput = (user) => {
  if (isInputEmpty(user.password)) return "A password is required.";
  if (isInputEmpty(user.phoneNumber)) return "A phone number is required.";
  if (isInputEmpty(user.email)) return "An email is required.";
  if (isInputEmpty(user.firstName)) return "First name is required.";
  if (isInputEmpty(user.lastName)) return "Last name is required.";
  if (isInputEmpty(user.companyName)) return "Business name is required.";
  if (isInputEmpty(user.companyAddress.street))
    return "Street name is required.";
  if (isInputEmpty(user.companyAddress.city)) return "City name is required.";
  if (isInputEmpty(user.companyAddress.zipcode)) return "Zip code is required.";
  if (isInputEmpty(user.companyAddress.state)) return "State name is required.";

  if (!isPasswordValid(user.password))
    return "Password should be at least 8 characters.";
  if (!isPhoneInputValid(user.phoneNumber))
    return "Invalid phone number format.";
  if (!isEmailInputValid(user.email)) return "Invalid email format.";
  if (!isNameInputValid(user.firstName)) return "First name is invalid.";
  if (!isNameInputValid(user.lastName)) return "Last name is invalid.";
  if (!isNameInputValid(user.companyName)) return "Business name is invalid.";
  if (!isStreetNameValid(user.companyAddress.street))
    return "Street name is invalid.";
  if (!isCityNameValid(user.companyAddress.city))
    return "City name is invalid.";
  if (!isZipCodeValid(user.companyAddress.zipcode)) return "Invalid zip code.";
  if (!isStateNameValid(user.companyAddress.state))
    return "State name is invalid.";

  return null;
};

export const validateField = (field, value) => {
  if (field === "password") {
    if (isInputEmpty(value)) return "A password is required.";
    if (!isPasswordValid(value))
      return "Password should be at least 8 characters.";
  }

  if (field === "phoneNumber") {
    if (isInputEmpty(value)) return "A phone number is required.";
    if (!isPhoneInputValid(value)) return "Invalid phone number format.";
  }

  if (field === "email" && !isInputEmpty(value) && !isEmailInputValid(value)) {
    return "Invalid email format.";
  }

  if (
    ["firstName", "lastName", "companyName"].includes(field) &&
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

export const validateTicketForm = (ticket) => {
  const errors = {};

  const {
    currentTicketTitle,
    currentTicketDescription,
    currentTicketName,
    currentTicketEmailId,
    currentTicketPhoneNumber,
    currentTicketCWCompanyId,
    currentTicketBoardId,
    currentTicketCategoryId,
    currentTicketSubCategoryId,
  } = ticket;

  if (isInputEmpty(currentTicketTitle)) {
    errors.currentTicketTitle = "Ticket Title is required";
  }

  if (isInputEmpty(currentTicketDescription)) {
    errors.currentTicketDescription = "Description is required";
  }

  if (isInputEmpty(currentTicketName) || !isNameInputValid(currentTicketName)) {
    errors.currentTicketName = "Valid Name is required";
  }

  if (
    isInputEmpty(currentTicketEmailId) ||
    !isEmailInputValid(currentTicketEmailId)
  ) {
    errors.currentTicketEmailId = "Valid Email is required";
  }

  if (
    isInputEmpty(currentTicketPhoneNumber) ||
    !isPhoneInputValid(currentTicketPhoneNumber)
  ) {
    errors.currentTicketPhoneNumber = "Phone number must be 9 or 10 digits";
  }

  if (isInputEmpty(currentTicketCWCompanyId)) {
    errors.currentTicketCWCompanyId = "Company selection is required";
  }

  if (!currentTicketBoardId) {
    errors.currentTicketBoardId = "Board selection is required";
  }

  if (!currentTicketCategoryId) {
    errors.currentTicketCategoryId = "Category selection is required";
  }

  if (!currentTicketSubCategoryId) {
    errors.currentTicketSubCategoryId = "SubCategory selection is required";
  }

  return Object.keys(errors).length ? errors : true;
};

export const isInputEmpty = (input) => {
  if (typeof input !== "string") {
    return true;
  }
  return input.trim() === "";
};

export const isEmailInputValid = (emailInput) => {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(emailInput);
};

export const isNameInputValid = (nameInput) => {
  const nameRegex = /^[a-zA-Z0-9\s]+$/;
  return nameRegex.test(nameInput);
};

export const isPhoneInputValid = (phoneInput) => {
  const cleanedInput = phoneInput.trim().replace(/\D/g, "");
  return cleanedInput.length === 9 || cleanedInput.length === 10;
};
