const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add('popup__input_type-error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove('popup__input_type-error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  };

  if (!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(formElement, inputElement);
  };
};

const setEventListeners = (formElement) => {
  const inputsList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputsList, buttonElement);
  inputsList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(formElement, input);
      toggleButtonState(inputsList, buttonElement);
    });
  });
};

export const enableValidation = (formsList) => {
  formsList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form);
  });
};

export const clearValidation = (form) => {
  const inputsList = Array.from(form.querySelectorAll('.popup__input'));
  const buttonElement = form.querySelector('.popup__button');
  inputsList.forEach((input) => {
    hideInputError(form, input);
    input.setCustomValidity('');
  });
  toggleButtonState(inputsList, buttonElement);
};

const hasInvalidInput = (inputsList) => {
  return inputsList.some((input)=> {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputsList, buttonElement) => {
  if (hasInvalidInput(inputsList)) {
    buttonElement.classList.add('popup__button_inactive');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('popup__button_inactive');
    buttonElement.disabled = false;
  }
};