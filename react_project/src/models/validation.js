export const validateName = (name) => {
  if (!name) {
    return 'This field is required';
  }
  if (name.length < 2 || name.length > 256) {
    return 'Name must be between 2 and 256 characters';
  }
  return '';
};

export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return 'Email is required';
  }
  if (email.length < 5) {
    return 'Email must be at least 5 characters long';
  }
  if (!emailPattern.test(email)) {
    return 'Invalid email format';
  }
  return '';
};

export const validatePhone = (phone) => {
  const phonePattern = /^0\d{8,10}$/;
  if (!phone) {
    return 'Phone is required';
  }
  if (!phonePattern.test(phone)) {
    return 'Phone must be a standard Israeli phone number';
  }
  return '';
};

export const validatePassword = (password) => {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{9,}$/;
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 7 || password.length > 20) {
    return 'Password must be between 7 and 20 characters';
  }
  if (!passwordPattern.test(password)) {
    return 'Password must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number, and one of the following characters: !@#$%^&*-';
  }
  return '';
};

export const validateUrl = (url) => {
  const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  if (url && !urlPattern.test(url)) {
    return 'Invalid URL format';
  }
  return '';
};

export const validateAddressField = (field) => {
  if (!field) {
    return 'This field is required';
  }
  if (field.length < 2 || field.length > 256) {
    return 'Field must be between 2 and 256 characters';
  }
  return '';
};

export const validateHouseNumber = (houseNumber) => {
  if (!houseNumber) {
    return 'House Number is required';
  }
  if (isNaN(houseNumber) || houseNumber < 2 || houseNumber > 256) {
    return 'House Number must be a number between 2 and 256';
  }
  return '';
};

export const validateZip = (zip) => {
  if (!zip) {
    return 'ZIP Code is required';
  }
  if (isNaN(zip) || zip < 2 || zip > 256) {
    return 'ZIP Code must be a number between 2 and 256';
  }
  return '';
};

export const validateBoolean = (bool) => {
  if (typeof bool !== 'boolean') {
    return 'This field is required';
  }
  return '';
};
