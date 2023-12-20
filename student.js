


const proxyurl = 'https://cors-anywhere.herokuapp.com/';
const targetUrl = 'http://localhost:3000/';




document.addEventListener("DOMContentLoaded", function () {
  fetchStudents();
});

function addStudent() {
  const name = document.getElementById("name").value;
  const course = document.getElementById("course").value;
  const grade = document.getElementById("grade").value;

  if (name && course && grade) {
    const student = { name, course, grade };

    fetch(targetUrl, {
    
      method: "POST",
      headers: {
        'Authorization': 'Bearer YOUR_TOKEN_HERE',
        "Content-Type": "application/json",
       
      },
      body: JSON.stringify(student),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        fetchStudents();
        resetForm();
      })
      .catch((error) => console.log("Error:"));
  } else {
    alert("Please fill in all fields.");
  }
}

function fetchStudents() {
  fetch("http://localhost:3000/")
    .then((response) => response.json())
    .then((students) =>  displayStudents(students) )
    .catch((error) => console.log("Error:"));
}

function displayStudents(students) {
  console.log("students aatre ",students);
  const tableBody = document.querySelector("#studentTable tbody");
  tableBody.innerHTML = "";
  students.forEach((student) => {
    const astudent=JSON.stringify(student);
    console.log("after strereing s",astudent,astudent.name);
    const bstudent = JSON.parse(astudent);
    const row = tableBody.insertRow();
    row.innerHTML = `
            <td>${bstudent.name}</td>
            <td>${bstudent.course}</td>
            <td>${bstudent.grade}</td>
           
        `;
  });
}

function resetForm() {
  document.getElementById("studentForm").reset();
}

function deleteStudent(id) {
  console.log(id);
  fetch(`http://localhost:3000/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      fetchStudents();
    })
    .catch((error) => console.log("Error:"));
}
