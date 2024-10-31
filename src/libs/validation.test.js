import { isValidAddressInputs, isValidAlphaNumericInput, isValidMenuItemForm, isValidNumericInput, isValidSentenceInput, isValidTextInput, isValidUserForm } from './validation';

// isValidTextInput()
test('test isValidTextInput() with valid input (contains letters and spaces only) - returns true', () => {
  expect.assertions(1);
  expect(isValidTextInput("this is a VALID text input")).toBe(true);
});

test('test isValidTextInput() with invalid input (contains number) - returns false', () => {
  expect.assertions(1);
  expect(isValidTextInput("this is an INV4L1D text input")).toBe(false);
});

// isValidNumericInput()
test('test isValidNumericInput() with valid input (contains numbers only) - returns true', () => {
  expect.assertions(1);
  expect(isValidNumericInput("1234567890")).toBe(true);
});

test('test isValidNumericInput() with invalid input (contains letter) - returns false', () => {
  expect.assertions(1);
  expect(isValidNumericInput("123456789O")).toBe(false);
});

// isValidAlphaNumericInput()
test('test isValidAlphaNumericInput() with valid input (contains letters, numbers and spaces only) - returns true', () => {
  expect.assertions(1);
  expect(isValidAlphaNumericInput("this is a V4L1D 4LPH4NUM3R1C input")).toBe(true);
});

test('test isValidAlphaNumericInput() with invalid input (contains special character) - returns false', () => {
  expect.assertions(1);
  expect(isValidAlphaNumericInput("this is an 1NV@L1D @LPH@NUM3R1C input")).toBe(false);
});

// isValidSentenceInput()
test('test isValidSentenceInput() with valid input (contains printable ASCII characters only) - returns true', () => {
  expect.assertions(1);
  expect(isValidSentenceInput("this is a V@L!D 53NT3NC3 input")).toBe(true);
});

test('test isValidSentenceInput() with invalid input (contains non-ASCII character) - returns false', () => {
  expect.assertions(1);
  expect(isValidSentenceInput("this is an 1NV@L!D 53NT3NC3 input。")).toBe(false);
});

// isValidAddressInputs()
const validAddressInputs = {
  phone: 91234567,
  streetAddress: '123 Street ABC',
  postalCode: 123456,
  city: 'Singapore',
  country: 'Singapore',
};

test('test isValidAddressInputs() with valid address inputs - returns true', () => {
  let isValid;
  const promise = new Promise((resolve, reject) => {
    isValid = isValidAddressInputs(validAddressInputs, true, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).resolves.toMatch("RESOLVED");
  expect(isValid).toBe(true);
});

// isValidAddressInputs() - phone number
test('test isValidAddressInputs() with missing phone number - returns false', () => {
  let isValid;
  const addressInputs = { ...validAddressInputs };
  addressInputs.phone = null;
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidAddressInputs(addressInputs, true, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Phone number is required");
  expect(isValid).toBe(false);
});

test('test isValidAddressInputs() with empty phone number - returns false', () => {
  let isValid;
  const addressInputs = { ...validAddressInputs };
  addressInputs.phone = '';
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidAddressInputs(addressInputs, true, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Phone number is required");
  expect(isValid).toBe(false);
});

test('test isValidAddressInputs() with invalid phone number - returns false', () => {
  let isValid;
  const addressInputs = { ...validAddressInputs };
  addressInputs.phone = '9123 4567';
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidAddressInputs(addressInputs, true, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Phone number should contain numbers only");
  expect(isValid).toBe(false);
});

// isValidAddressInputs() - street address
test('test isValidAddressInputs() with missing street address - returns false', () => {
  let isValid;
  const addressInputs = { ...validAddressInputs };
  addressInputs.streetAddress = null;
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidAddressInputs(addressInputs, true, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Street address is required");
  expect(isValid).toBe(false);
});

test('test isValidAddressInputs() with empty street address - returns false', () => {
  let isValid;
  const addressInputs = { ...validAddressInputs };
  addressInputs.streetAddress = '';
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidAddressInputs(addressInputs, true, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Street address is required");
  expect(isValid).toBe(false);
});

test('test isValidAddressInputs() with invalid street address - returns false', () => {
  let isValid;
  const addressInputs = { ...validAddressInputs };
  addressInputs.streetAddress = '123 @ Street ABC';
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidAddressInputs(addressInputs, true, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Street address should contain letters and numbers only");
  expect(isValid).toBe(false);
});

// isValidAddressInputs() - postal code
test('test isValidAddressInputs() with missing postal code - returns false', () => {
  let isValid;
  const addressInputs = { ...validAddressInputs };
  addressInputs.postalCode = null;
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidAddressInputs(addressInputs, true, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Postal code is required");
  expect(isValid).toBe(false);
});

test('test isValidAddressInputs() with empty postal code - returns false', () => {
  let isValid;
  const addressInputs = { ...validAddressInputs };
  addressInputs.postalCode = '';
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidAddressInputs(addressInputs, true, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Postal code is required");
  expect(isValid).toBe(false);
});

test('test isValidAddressInputs() with invalid postal code - returns false', () => {
  let isValid;
  const addressInputs = { ...validAddressInputs };
  addressInputs.postalCode = '123456A';
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidAddressInputs(addressInputs, true, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Postal code should contain numbers only");
  expect(isValid).toBe(false);
});

// isValidAddressInputs() - city
test('test isValidAddressInputs() with missing city - returns false', () => {
  let isValid;
  const addressInputs = { ...validAddressInputs };
  addressInputs.city = null;
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidAddressInputs(addressInputs, true, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("City is required");
  expect(isValid).toBe(false);
});

test('test isValidAddressInputs() with empty city - returns false', () => {
  let isValid;
  const addressInputs = { ...validAddressInputs };
  addressInputs.city = '';
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidAddressInputs(addressInputs, true, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("City is required");
  expect(isValid).toBe(false);
});

test('test isValidAddressInputs() with invalid city - returns false', () => {
  let isValid;
  const addressInputs = { ...validAddressInputs };
  addressInputs.city = 'New York City A1';
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidAddressInputs(addressInputs, true, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("City should contain letters only");
  expect(isValid).toBe(false);
});

// isValidAddressInputs() - country
test('test isValidAddressInputs() with missing country - returns false', () => {
  let isValid;
  const addressInputs = { ...validAddressInputs };
  addressInputs.country = null;
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidAddressInputs(addressInputs, true, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Country is required");
  expect(isValid).toBe(false);
});

test('test isValidAddressInputs() with empty country - returns false', () => {
  let isValid;
  const addressInputs = { ...validAddressInputs };
  addressInputs.country = '';
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidAddressInputs(addressInputs, true, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Country is required");
  expect(isValid).toBe(false);
});

test('test isValidAddressInputs() with invalid country - returns false', () => {
  let isValid;
  const addressInputs = { ...validAddressInputs };
  addressInputs.country = 'USA!';
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidAddressInputs(addressInputs, true, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Country should contain letters only");
  expect(isValid).toBe(false);
});

// isValidUserForm()
const validUserFormInputs = {
  name: 'New USER name',
  ...validAddressInputs,
};

test('test isValidUserForm() with valid user form inputs - returns true', () => {
  let isValid;
  const promise = new Promise((resolve, reject) => {
    isValid = isValidUserForm(validUserFormInputs, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).resolves.toMatch("RESOLVED");
  expect(isValid).toBe(true);
});

const emptyUserFormInputs = {
  name: '',
  phone: '',
  streetAddress: '',
  postalCode: '',
  city: '',
  country: '',
};

test('test isValidUserForm() with empty user form inputs - returns true', () => {
  let isValid;
  const promise = new Promise((resolve, reject) => {
    isValid = isValidUserForm(emptyUserFormInputs, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).resolves.toMatch("RESOLVED");
  expect(isValid).toBe(true);
});


test('test isValidUserForm() with invalid name - returns false', () => {
  let isValid;
  const userFormInputs = { ...validUserFormInputs };
  userFormInputs.name = 'New US3R name';
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidUserForm(userFormInputs, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Name should contain letters only");
  expect(isValid).toBe(false);
});

// isValidMenuItemForm()
const categories = [
  {
    "_id": "1"
  },
  {
    "_id": "2"
  }
];

const validMenuItemFormInputs = {
  name: "New Item Name",
  description: "New item on the menu. Try now!!",
  category: categories[0]._id,
  basePrice: 10,
  image: "https://test.s3.com/test.png",
  sizes: [
    {
      "name": "small",
      "price": null,
    },
    {
      "name": "medium",
      "price": 3,
    },
    {
      "name": "large",
      "price": 5,
    }
  ],
  extraIngredientPrices: [
    {
      "name": "lettuce",
      "price": 1,
    },
    {
      "name": "carrots",
      "price": 2,
    }
  ]
};

test('test isValidMenuItemForm() with valid menu item form inputs - returns true', () => {
  let isValid;
  const promise = new Promise((resolve, reject) => {
    isValid = isValidMenuItemForm(validMenuItemFormInputs, categories, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).resolves.toMatch("RESOLVED");
  expect(isValid).toBe(true);
});

test('test isValidMenuItemForm() with empty description, sizes, and extra ingredients - returns true', () => {
  let isValid;
  const menuItemFormInputs = { ...validMenuItemFormInputs };
  menuItemFormInputs.description = '';
  menuItemFormInputs.sizes = [];
  menuItemFormInputs.extraIngredientPrices = [];
  const promise = new Promise((resolve, reject) => {
    isValid = isValidMenuItemForm(menuItemFormInputs, categories, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).resolves.toMatch("RESOLVED");
  expect(isValid).toBe(true);
});

// isValidMenuItemForm() - item name
test('test isValidMenuItemForm() with missing item name - returns false', () => {
  let isValid;
  const menuItemFormInputs = { ...validMenuItemFormInputs };
  menuItemFormInputs.name = null;
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidMenuItemForm(menuItemFormInputs, categories, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Item name is required");
  expect(isValid).toBe(false);
});

test('test isValidMenuItemForm() with empty item name - returns false', () => {
  let isValid;
  const menuItemFormInputs = { ...validMenuItemFormInputs };
  menuItemFormInputs.name = '';
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidMenuItemForm(menuItemFormInputs, categories, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Item name is required");
  expect(isValid).toBe(false);
});

test('test isValidMenuItemForm() with invalid item name - returns false', () => {
  let isValid;
  const menuItemFormInputs = { ...validMenuItemFormInputs };
  menuItemFormInputs.name = 'New Item 2';
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidMenuItemForm(menuItemFormInputs, categories, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Item name should contain letters only");
  expect(isValid).toBe(false);
});

// isValidMenuItemForm() - description
test('test isValidMenuItemForm() with invalid description - returns false', () => {
  let isValid;
  const menuItemFormInputs = { ...validMenuItemFormInputs };
  menuItemFormInputs.description = '新品';
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidMenuItemForm(menuItemFormInputs, categories, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Description should contain English characters only");
  expect(isValid).toBe(false);
});

// isValidMenuItemForm() - category
test('test isValidMenuItemForm() with invalid category - returns false', () => {
  let isValid;
  const menuItemFormInputs = { ...validMenuItemFormInputs };
  menuItemFormInputs.category = '3';
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidMenuItemForm(menuItemFormInputs, categories, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Invalid Category");
  expect(isValid).toBe(false);
});

// isValidMenuItemForm() - base price
test('test isValidMenuItemForm() with missing base price - returns false', () => {
  let isValid;
  const menuItemFormInputs = { ...validMenuItemFormInputs };
  menuItemFormInputs.basePrice = null;
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidMenuItemForm(menuItemFormInputs, categories, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Base price is required");
  expect(isValid).toBe(false);
});

test('test isValidMenuItemForm() with empty base price - returns false', () => {
  let isValid;
  const menuItemFormInputs = { ...validMenuItemFormInputs };
  menuItemFormInputs.basePrice = '';
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidMenuItemForm(menuItemFormInputs, categories, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Base price is required");
  expect(isValid).toBe(false);
});

test('test isValidMenuItemForm() with invalid base price - returns false', () => {
  let isValid;
  const menuItemFormInputs = { ...validMenuItemFormInputs };
  menuItemFormInputs.basePrice = '-2';
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidMenuItemForm(menuItemFormInputs, categories, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Base price should contain numbers only");
  expect(isValid).toBe(false);
});

// isValidMenuItemForm() - image
test('test isValidMenuItemForm() with missing image - returns false', () => {
  let isValid;
  const menuItemFormInputs = { ...validMenuItemFormInputs };
  menuItemFormInputs.image = null;
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidMenuItemForm(menuItemFormInputs, categories, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Image is required");
  expect(isValid).toBe(false);
});

test('test isValidMenuItemForm() with empty image - returns false', () => {
  let isValid;
  const menuItemFormInputs = { ...validMenuItemFormInputs };
  menuItemFormInputs.image = '';
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidMenuItemForm(menuItemFormInputs, categories, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Image is required");
  expect(isValid).toBe(false);
});

// isValidMenuItemForm() - size name
test('test isValidMenuItemForm() with missing size name when size list is not empty - returns false', () => {
  let isValid;
  const menuItemFormInputs = { ...validMenuItemFormInputs };
  menuItemFormInputs.sizes = structuredClone(validMenuItemFormInputs.sizes);
  menuItemFormInputs.sizes[0].name = null;
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidMenuItemForm(menuItemFormInputs, categories, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Size name is required");
  expect(isValid).toBe(false);
});

test('test isValidMenuItemForm() with empty size name when size list is not empty - returns false', () => {
  let isValid;
  const menuItemFormInputs = { ...validMenuItemFormInputs };
  menuItemFormInputs.sizes = structuredClone(validMenuItemFormInputs.sizes);
  menuItemFormInputs.sizes[0].name = '';
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidMenuItemForm(menuItemFormInputs, categories, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Size name is required");
  expect(isValid).toBe(false);
});

test('test isValidMenuItemForm() with invalid size name when size list is not empty - returns false', () => {
  let isValid;
  const menuItemFormInputs = { ...validMenuItemFormInputs };
  menuItemFormInputs.sizes = structuredClone(validMenuItemFormInputs.sizes);
  menuItemFormInputs.sizes[0].name = 'size 2XL';
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidMenuItemForm(menuItemFormInputs, categories, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Size name should contain letters only");
  expect(isValid).toBe(false);
});

// isValidMenuItemForm() - size price
test('test isValidMenuItemForm() with invalid size price when size list is not empty - returns false', () => {
  let isValid;
  const menuItemFormInputs = { ...validMenuItemFormInputs };
  menuItemFormInputs.sizes = structuredClone(validMenuItemFormInputs.sizes);
  menuItemFormInputs.sizes[0].price = '2 dollars';
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidMenuItemForm(menuItemFormInputs, categories, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Size price should contain numbers only");
  expect(isValid).toBe(false);
});

// isValidMenuItemForm() - extra ingredient name
test('test isValidMenuItemForm() with missing extra ingredient name when extra ingredient list is not empty - returns false', () => {
  let isValid;
  const menuItemFormInputs = { ...validMenuItemFormInputs };
  menuItemFormInputs.extraIngredientPrices = structuredClone(validMenuItemFormInputs.extraIngredientPrices);
  menuItemFormInputs.extraIngredientPrices[0].name = null;
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidMenuItemForm(menuItemFormInputs, categories, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Extra ingredient name is required");
  expect(isValid).toBe(false);
});

test('test isValidMenuItemForm() with empty extra ingredient name when extra ingredient list is not empty - returns false', () => {
  let isValid;
  const menuItemFormInputs = { ...validMenuItemFormInputs };
  menuItemFormInputs.extraIngredientPrices = structuredClone(validMenuItemFormInputs.extraIngredientPrices);
  menuItemFormInputs.extraIngredientPrices[0].name = '';
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidMenuItemForm(menuItemFormInputs, categories, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Extra ingredient name is required");
  expect(isValid).toBe(false);
});

test('test isValidMenuItemForm() with invalid extra ingredient name when extra ingredient list is not empty - returns false', () => {
  let isValid;
  const menuItemFormInputs = { ...validMenuItemFormInputs };
  menuItemFormInputs.extraIngredientPrices = structuredClone(validMenuItemFormInputs.extraIngredientPrices);
  menuItemFormInputs.extraIngredientPrices[0].name = '3 eggs';
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidMenuItemForm(menuItemFormInputs, categories, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Extra ingredient name should contain letters only");
  expect(isValid).toBe(false);
});

// isValidMenuItemForm() - extra ingredient price
test('test isValidMenuItemForm() with invalid extra ingredient price when extra ingredient list is not empty - returns false', () => {
  let isValid;
  const menuItemFormInputs = { ...validMenuItemFormInputs };
  menuItemFormInputs.extraIngredientPrices = structuredClone(validMenuItemFormInputs.extraIngredientPrices);
  menuItemFormInputs.extraIngredientPrices[0].price = '1.23';
  const promise = new Promise((_resolve, reject) => {
    isValid = isValidMenuItemForm(menuItemFormInputs, categories, reject);
    resolve("RESOLVED");
  });
  expect.assertions(2);
  expect(promise).rejects.toMatch("Extra ingredient price should contain numbers only");
  expect(isValid).toBe(false);
});
