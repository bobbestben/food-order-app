export function isValidUserForm(data, reject) {
  // validate name
  if (!isValidTextInput(data?.name)) {
    reject(invalidTextInputMsg("Name"));
    return false;
  }

  // validate phone
  if (!isValidNumericInput(data?.phone)) {
    reject(invalidNumericInputMsg("Phone"));
    return false;
  }

  // validate street address
  if (!isValidAlphaNumericInput(data?.streetAddress)) {
    reject(invalidAlphaNumericInputMsg("Street address"));
    return false;
  }

  // validate postal code
  if (!isValidNumericInput(data?.postalCode)) {
    reject(invalidNumericInputMsg("Postal code"));
    return false;
  }

  // validate city
  if (!isValidTextInput(data?.city)) {
    reject(invalidTextInputMsg("City"));
    return false;
  }

  // validate country
  if (!isValidTextInput(data?.country)) {
    reject(invalidTextInputMsg("Country"));
    return false;
  }

  return true;
}

export function isValidTextInput(input) {
  return /^[a-zA-Z ]*$/.test(input);
}

export function invalidTextInputMsg(fieldName) {
  return fieldName + " should contain letters only";
}

export function isValidNumericInput(input) {
  return /^[0-9]*$/.test(input);
}

export function invalidNumericInputMsg(fieldName) {
  return fieldName + " should contain numbers only";
}

export function isValidAlphaNumericInput(input) {
  return /^[a-zA-Z0-9 ]*$/.test(input);
}

export function invalidAlphaNumericInputMsg(fieldName) {
  return fieldName + " should contain letters and numbers only";
}

export function setPatternMismatchMsg(id, message) {
  const element = document.getElementById(id);
  element.addEventListener("input", (event) => {
    if (element.validity.patternMismatch) {
      element.setCustomValidity(message);
    } else {
      element.setCustomValidity("");
    }
  });
}
