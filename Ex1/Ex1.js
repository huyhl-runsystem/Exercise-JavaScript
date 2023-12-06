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
  /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/((19|20)\d\d)$/;
const phoneRegex = /^0\d{9}$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,30}$/;

function submitForm() {
  displayFullName.textContent = fullNameInput.value;
  displayEmail.textContent = emailInput.value;
  displayPhone.textContent = phoneInput.value;
  displayBirthday.textContent = birthdayInput.value;

  handleImageUpload();
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

function clearErrors() {
  fullNameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";
  birthdayError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";
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
    validateForm(event);
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

function validateForm(event) {
  const fullName = fullNameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const birthday = birthdayInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  let isValid = true;

  fullNameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";
  birthdayError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";

  if (fullName === "") {
    fullNameError.textContent = "Full Name cannot be empty";
    isValid = false;
  }

  if (email === "") {
    emailError.textContent = "Email cannot be empty";
    isValid = false;
  } else if (!emailRegex.test(email)) {
    emailError.textContent = "Invalid email format";
    isValid = false;
  }

  if (phone === "") {
    phoneError.textContent = "Phone cannot be empty";
    isValid = false;
  } else if (!phoneRegex.test(phone)) {
    phoneError.textContent = "Invalid phone format (should start with 0)";
    isValid = false;
  }

  if (birthday === "") {
    birthdayError.textContent = "Birthday cannot be empty";
    isValid = false;
  } else if (!birthdayRegex.test(birthday)) {
    birthdayError.textContent =
      "Invalid birthday format (should be dd/mm/YYYY)";
    isValid = false;
  }

  if (password === "") {
    passwordError.textContent = "Password cannot be empty";
    isValid = false;
  } else if (!passwordRegex.test(password)) {
    passwordError.textContent =
      "Password must be 8-30 characters, start with a letter, and include at least one digit, one special character, and one uppercase letter.";
    isValid = false;
  }

  if (confirmPassword === "") {
    confirmPasswordError.textContent = "Confirm Password cannot be empty";
    isValid = false;
  } else if (confirmPassword !== password) {
    confirmPasswordError.textContent = "Passwords do not match";
    isValid = false;
  }

  if (!isValid) {
    event.preventDefault();
  } else {
    submitForm();
  }

  fullNameInput.addEventListener("input", function () {
    clearErrorIfValid(fullNameInput, fullNameError);
  });

  emailInput.addEventListener("input", function () {
    clearErrorIfValid(emailInput, emailError);
  });

  phoneInput.addEventListener("input", function () {
    clearErrorIfValid(phoneInput, phoneError);
  });

  birthdayInput.addEventListener("input", function () {
    clearErrorIfValid(birthdayInput, birthdayError);
  });

  passwordInput.addEventListener("input", function () {
    clearErrorIfValid(passwordInput, passwordError);
  });

  confirmPasswordInput.addEventListener("input", function () {
    clearErrorIfValid(confirmPasswordInput, confirmPasswordError);
  });

  function clearErrorIfValid(input, errorSpan) {
    if (input.checkValidity()) {
      errorSpan.textContent = "";
    }
  }
  function validatePhone() {
    const phone = phoneInput.value.trim();
    const isValid = phoneRegex.test(phone);

    if (!isValid) {
      phoneError.textContent = "Invalid phone format";
    }

    return isValid;
  }
  phoneInput.addEventListener("input", function () {
    validatePhone(); // Kiểm tra tính hợp lệ
    clearErrorIfValid(phoneInput, phoneError);
  });
}
