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

export function isValidMenuItemForm(data, categories, reject) {
  // validate item name
  if (!data?.name) {
    reject(requiredInputMsg("Item name"));
    return false;
  }
  if (!isValidTextInput(data.name)) {
    reject(invalidTextInputMsg("Item name"));
    return false;
  }

  // validate description
  if (!isValidSentenceInput(data?.description)) {
    reject(invalidSentenceInputMsg("Description"));
    return false;
  }

  // validate category
  const isCategoryInList = categories.some(el => el?._id === data?.category);
  if (!isCategoryInList) {
    reject("Invalid Category");
    return false;
  }

  // validate base price
  if (!data?.basePrice) {
    reject(requiredInputMsg("Base price"));
    return false;
  }
  if (!isValidNumericInput(data.basePrice)) {
    reject(invalidNumericInputMsg("Base price"));
    return false;
  }

  // validate image
  if (!data?.image) {
    reject(requiredInputMsg("Image"));
    return false;
  }

  // validate & update sizes
  if (!validateAndUpdateListItems(data?.sizes, "Size", reject)) {
    return false;
  }

  // validate & update ingredients
  if (!validateAndUpdateListItems(data?.extraIngredientPrices, "Extra ingredient", reject)) {
    return false;
  }

  return true;
}

function validateAndUpdateListItems(items, itemType, reject) {
  let isValidItems = true;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    // validate item name
    if (!item?.name) {
      reject(requiredInputMsg(itemType + " name"));
      isValidItems = false;
      break;
    }
    if (!isValidTextInput(item.name)) {
      reject(invalidTextInputMsg(itemType + " name"));
      isValidItems = false;
      break;
    }

    // set item price as 0 if no value provided
    if (!item?.price) {
      item.price = 0;
    }

    // validate item price
    if (!isValidNumericInput(item.price)) {
      reject(invalidNumericInputMsg(itemType + " price"));
      isValidItems = false;
      break;
    }
  }

  return isValidItems;
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

export function isValidSentenceInput(input) {
  return /^[\x20-\x7E]*$/.test(input);
}

export function invalidSentenceInputMsg(fieldName) {
  return fieldName + " should contain English characters only";
}

export function requiredInputMsg(fieldName) {
  return fieldName + " is required";
}

export function setCustomValidityMsg(id, fieldName, patternMismatchMsgFunc) {
  const element = document.getElementById(id);
  setCustomValidityMsgForElement(element, fieldName, patternMismatchMsgFunc);
}

export function setCustomValidityMsgForElement(element, fieldName, patternMismatchMsgFunc) {
  element.addEventListener("input", (event) => {
    if (element.validity.patternMismatch) {
      element.setCustomValidity(patternMismatchMsgFunc(fieldName));
    } else if (element.validity.valueMissing) {
      element.setCustomValidity(requiredInputMsg(fieldName));
    } else {
      element.setCustomValidity("");
    }
  });

  element.addEventListener("invalid", (event) => {
    if (element.validity.patternMismatch) {
      element.setCustomValidity(patternMismatchMsgFunc(fieldName));
    } else if (element.validity.valueMissing) {
      element.setCustomValidity(requiredInputMsg(fieldName));
    }
  });
}

export function setCustomValidityMsgForElementList(elements, fieldName, patternMismatchMsgFunc) {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    setCustomValidityMsgForElement(element, fieldName, patternMismatchMsgFunc);
  }
}
