const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  };

  if (!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage, {inputErrorClass, errorClass});
  } else {
    hideInputError(formElement, inputElement, {inputErrorClass, errorClass});
  };
};

const setEventListeners = (formElement, config) => {
  const inputsList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputsList, buttonElement, config);
  inputsList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(formElement, input, config);
      toggleButtonState(inputsList, buttonElement, config);
    });
  });
};

export const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
}) => {
  const formsList = Array.from(document.querySelectorAll(formSelector));
  formsList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, {formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass});
  });
};

export const clearValidation = (form, { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  const inputsList = Array.from(form.querySelectorAll(inputSelector));
  const buttonElement = form.querySelector(submitButtonSelector);
  inputsList.forEach((input) => {
    hideInputError(form, input, {inputErrorClass, errorClass});
    input.setCustomValidity('');
  });
  toggleButtonState(inputsList, buttonElement, { inactiveButtonClass });
};

const hasInvalidInput = (inputsList) => {
  return inputsList.some((input)=> {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputsList, buttonElement, {inactiveButtonClass}) => {
  if (hasInvalidInput(inputsList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};