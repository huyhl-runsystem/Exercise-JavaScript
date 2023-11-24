var students = [
  { name: "Huy", phone: "0123456789", email: "huy@gmail.com" },
  { name: "Hậu", phone: "0987654321", email: "hau@gmail.com" },
  { name: "Kỳ", phone: "0987654321", email: "ky@gmail.com" },
];

var studentTableBody = document.querySelector("#studentTable tbody");
var addStudentForm = document.getElementById("addStudentForm");
var isEditing = false; // Biến để kiểm tra xem có ở chế độ chỉnh sửa hay không
var editingIndex = null; // Chỉ số của sinh viên đang được chỉnh sửa

function displayStudents() {
  // Xóa dữ liệu cũ
  studentTableBody.innerHTML = "";

  students.forEach(function (student, index) {
    var row = document.createElement("tr");
    row.innerHTML = `
                  <td><input type="checkbox" class="student-checkbox" data-index="${index}"></td>
                  <td>${student.name}</td>
                  <td>${student.phone}</td>
                  <td>${student.email}</td>
                  <td>
                      <button onclick="editStudent(${index})">Edit</button>
                      <button onclick="deleteStudent(${index})">Delete</button>
                  </td>
              `;
    studentTableBody.appendChild(row);
  });
}

function addStudent() {
  var name = document.getElementById("name").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;

  if (name && phone && email) {
    if (isEditing) {
      // Nếu đang ở chế độ chỉnh sửa, cập nhật thông tin sinh viên
      students[editingIndex] = { name: name, phone: phone, email: email };
      isEditing = false;
      editingIndex = null;
    } else {
      // Ngược lại, thêm sinh viên mới
      students.push({ name: name, phone: phone, email: email });
    }

    displayStudents(); // Cập nhật bảng hiển thị
    // Reset form và chuyển về chế độ thêm mới
    addStudentForm.reset();
  } else {
    alert("Please fill in all fields.");
  }
}

function deleteStudent(index) {
  students.splice(index, 1);
  displayStudents(); // Cập nhật bảng hiển thị
}

function deleteSelectedStudents() {
  var selectedCheckboxes = document.querySelectorAll(
    ".student-checkbox:checked"
  );

  // Lặp qua danh sách checkbox được chọn và xóa sinh viên từ mảng
  for (var i = selectedCheckboxes.length - 1; i >= 0; i--) {
    var index = selectedCheckboxes[i].dataset.index;
    students.splice(index, 1);
  }

  displayStudents(); // Cập nhật bảng hiển thị
}

// Sự kiện click trên document để lưu thông tin khi thoát khỏi chế độ chỉnh sửa
document.addEventListener("click", function (event) {
  var isClickedInsideForm = addStudentForm.contains(event.target);
  if (isEditing && !isClickedInsideForm) {
    addStudent();
  }
});

displayStudents();

function editStudent(index) {
  var student = students[index];

  // Điền thông tin sinh viên vào form
  document.getElementById("name").value = student.name;
  document.getElementById("phone").value = student.phone;
  document.getElementById("email").value = student.email;

  // Đặt chế độ chỉnh sửa và chỉ số của sinh viên đang được chỉnh sửa
  isEditing = true;
  editingIndex = index;
}
