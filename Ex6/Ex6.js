var users = [
  { name: "Huy", phone: "0123456789", email: "huy@gmail.com" },
  { name: "Hậu", phone: "0987654321", email: "hau@gmail.com" },
  { name: "Kỳ", phone: "0987654321", email: "ky@gmail.com" },
];

const userTableBody = document.querySelector("#userTable tbody");
const addUserForm = document.getElementById("addUserForm");
const isEditing = false;
const editingIndex = null;

function displayUsers() {
  userTableBody.innerHTML = "";

  users.forEach(function (user, index) {
    var row = document.createElement("tr");

    var checkboxCell = document.createElement("td");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "user-checkbox";
    checkbox.dataset.index = index;
    checkboxCell.appendChild(checkbox);
    row.appendChild(checkboxCell);

    checkbox.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    for (const key in user) {
      const cell = document.createElement("td");
      cell.textContent = user[key];
      cell.addEventListener("click", function () {
        editCell(user, key, cell);
      });
      row.appendChild(cell);
    }

    const deleteCell = document.createElement("td");
    deleteCell.innerHTML = `<button onclick="deleteUser(${index})">Delete</button>`;
    row.appendChild(deleteCell);

    userTableBody.appendChild(row);
  });
}

function addUser() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;

  if (name && phone && email) {
    if (isEditing) {
      users[editingIndex] = { name: name, phone: phone, email: email };
      isEditing = false;
      editingIndex = null;
    } else {
      users.push({ name: name, phone: phone, email: email });
    }

    displayUsers();
    addUserForm.reset();
  } else {
    alert("Please fill in all fields.");
  }
}

function deleteUser(index) {
  users.splice(index, 1);
  displayUsers();
}

function deleteSelectedUsers() {
  const selectedCheckboxes = document.querySelectorAll(
    ".user-checkbox:checked"
  );

  for (var i = selectedCheckboxes.length - 1; i >= 0; i--) {
    var index = selectedCheckboxes[i].dataset.index;
    users.splice(index, 1);
  }

  displayUsers();
}

document.addEventListener("click", function (event) {
  var isClickedInsideForm = addUserForm.contains(event.target);
  if (isEditing && !isClickedInsideForm) {
    addUser();
  }
});

displayUsers();

function editCell(user, key, cell) {
  const input = document.createElement("input");
  input.value = user[key];
  input.addEventListener("blur", function () {
    saveEditedValue(user, key, input, cell);
  });

  cell.innerHTML = "";
  cell.appendChild(input);
  input.select();

  cell.addEventListener("click", function (event) {
    event.stopPropagation();
  });
}

function saveEditedValue(user, key, input, cell) {
  user[key] = input.value;
  cell.innerHTML = input.value;
}
