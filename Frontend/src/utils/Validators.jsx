export const validateEmail = (email) => {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const lengthValid = password.length >= 8 && password.length <= 16;
  return hasUpperCase && hasSpecialChar && lengthValid;
};

export const validateName = (name) => {
  return name.length >= 20 && name.length <= 60;
};

export const validateAddress = (address) => {
  return address.length <= 400;
};
