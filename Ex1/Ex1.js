const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const birthdayInput = document.getElementById("birthday");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

const displayFullName = document.getElementById("displayFullName");
const displayEmail = document.getElementById("displayEmail");
const displayPhone = document.getElementById("displayPhone");
const displayBirthday = document.getElementById("displayBirthday");

const fullNameError = document.getElementById("fullNameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const birthdayError = document.getElementById("birthdayError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

const avatarUpload = document.getElementById("avatar-upload");
const imageUpload = document.getElementById("image-upload");
const labelAvatarUpload = document.getElementById("label-avatar-upload");
const avatarPreview = document.getElementById("avatar-preview");
const imagePreview = document.getElementById("image-preview");

const infoForm = document.getElementById("infoForm");
const inputs = document.querySelectorAll("#infoForm input");
const addButton = document.getElementById("add-button");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const birthdayRegex =
  /^(0[1-9]|[12][0-9]|3[01])\-(0[1-9]|1[0-2])\-((19|20)\d\d)$/;
const phoneRegex = /^0\d{9}$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,30}$/;

var isValid = true;

function submitForm() {
  displayFullName.textContent = fullNameInput.value;
  displayEmail.textContent = emailInput.value;
  displayPhone.textContent = formatPhoneNumber(phoneInput.value);
  displayBirthday.textContent = formatdate(birthdayInput.value);

  handleImageUpload();
}

function formatPhoneNumber(phoneNumber) {
  const cleanedNumber = phoneNumber.replace(/\D/g, "");

  const formattedNumber = `${cleanedNumber.substr(0, 3)}
  -${cleanedNumber.substr(3, 3)}-${cleanedNumber.substr(6)}`;

  return formattedNumber;
}

function formatdate(dateInput) {
  var date = new Date(dateInput);
  dateInput = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  return dateInput;
}

function handleImageUpload() {
  if (imageUpload.files.length > 0) {
    var file = imageUpload.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
      avatarPreview.style.backgroundImage = "url(" + e.target.result + ")";
      imagePreview.style.display = "none";
    };

    reader.readAsDataURL(file);
  } else {
    avatarPreview.style.backgroundImage = "none";
    imagePreview.style.display = "block";
  }
}

function showImage(input) {
  var file = input.files[0];
  var reader = new FileReader();

  reader.onload = function (e) {
    avatarUpload.style.backgroundImage = "url(" + e.target.result + ")";
    labelAvatarUpload.style.display = "none";
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    avatarUpload.style.backgroundImage = "none";
    labelAvatarUpload.style.display = "block";
  }
}

function clearError(err) {
  err.textContent = "";
}

function resetForm() {
  inputs.forEach((input) => {
    input.value = "";
  });

  displayFullName.textContent = "";
  displayEmail.textContent = "";
  displayPhone.textContent = "";
  displayBirthday.textContent = "";

  imageUpload.value = "";
  labelAvatarUpload.style.display = "block";

  avatarPreview.style.backgroundImage = "none";
  imagePreview.style.display = "block";

  clearErrors();
}

function formatLastNameFirstLetter(str) {
  return str.replace(/(?:^|\s)\S/g, function (char) {
    return char.toUpperCase();
  });
}
fullNameInput.addEventListener("blur", function () {
  this.value = formatLastNameFirstLetter(this.value);
});

document.addEventListener("DOMContentLoaded", function () {
  infoForm.addEventListener("submit", function (event) {
    event.preventDefault();
  });

  addButton.addEventListener("click", function (event) {
    if (validateForm()) {
      submitForm();
    }
  });

  imageUpload.addEventListener("change", function () {
    showImage(this);
  });
});

document.addEventListener("keydown", function (event) {
  var isShiftKey = event.shiftKey;
  var isDeleteKey = event.key === "Delete";

  if (isShiftKey) {
    if (validateForm()) {
      submitForm();
    }
  }

  if (isDeleteKey) {
    resetForm();
  }
});

function validateForm() {
  return isValid;
}

function Validate(element, errorElement) {
  var value = element.value.trim();
  isValid = true;
  var formatError = `Invalid ${element.id} format`;
  const regexLists = {
    email: emailRegex,
    birthday: birthdayRegex,
    phone: phoneRegex,
    password: passwordRegex,
  };

  switch (element.id) {
    case "fullName":
      if (value === "") {
        errorElement.textContent = `${element.id} cannot be empty`;
        isValid = false;
      }
      break;
    case "email":
      formatError = "Invalid email format";
      if (value === "") {
        errorElement.textContent = `${element.id} cannot be empty`;
        isValid = false;
      } else if (!regexLists[element.id].test(value)) {
        errorElement.textContent = formatError;
        isValid = false;
      }
      break;
    // case "birthday":
    //   value = formatdate(value)
    //   formatError = "Invalid birthday format (should be dd/mm/YYYY)"
    //   if (value === "") {
    //     errorElement.textContent = `${element.id} cannot be empty`;
    //     isValid = false;
    //   } else if (!regexLists[element.id].test(value)) {
    //     errorElement.textContent = formatError
    //     isValid = false;
    //   }
    //   break;
    case "phone":
      formatError =
        "Invalid phone format (must have 10 numbers and start with 0)";
      if (value === "") {
        errorElement.textContent = `${element.id} cannot be empty`;
        isValid = false;
      } else if (!regexLists[element.id].test(value)) {
        errorElement.textContent = formatError;
        isValid = false;
      }
      break;
    case "password":
      formatError =
        "Password must be 8-30 characters, start with a letter, and include at least one digit, one special character, and one uppercase letter.";
      if (value === "") {
        errorElement.textContent = `${element.id} cannot be empty`;
        isValid = false;
      } else if (!regexLists[element.id].test(value)) {
        errorElement.textContent = formatError;
        isValid = false;
      }
      break;
    case "confirmPassword":
      formatError = "Passwords do not match";
      if (value === "") {
        errorElement.textContent = `${element.id} cannot be empty`;
        isValid = false;
      } else if (value !== passwordInput.value) {
        errorElement.textContent = formatError;
        isValid = false;
      }
      break;
  }

  if (isValid) {
    errorElement.textContent = "";
  }
}

emailInput.addEventListener("input", function () {
  Validate(emailInput, emailError);
});

fullNameInput.addEventListener("input", function () {
  Validate(fullNameInput, fullNameError);
});

phoneInput.addEventListener("input", function () {
  Validate(phoneInput, phoneError);
});

birthdayInput.addEventListener("input", function () {
  Validate(birthdayInput, birthdayError);
});

passwordInput.addEventListener("input", function () {
  Validate(passwordInput, passwordError);
});

confirmPasswordInput.addEventListener("input", function () {
  Validate(confirmPasswordInput, confirmPasswordError);
});
