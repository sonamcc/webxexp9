document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
    const message = document.getElementById("message");
    const collegeList = document.getElementById("collegeList");
  
    const existingUsernames = ["sonam123", "johnDoe", "techxuser"];
  
    // Load college names using AJAX
    const xhrCollege = new XMLHttpRequest();
    xhrCollege.open("GET", "colleges.json", true);
    xhrCollege.onload = function () {
      if (xhrCollege.status === 200) {
        const colleges = JSON.parse(xhrCollege.responseText);
        colleges.forEach(college => {
          const option = document.createElement("option");
          option.value = college;
          collegeList.appendChild(option);
        });
      }
    };
    xhrCollege.send();
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const name = document.getElementById("name").value.trim();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
  
      if (name === "") {
        showMessage("Name cannot be empty", "red");
        return;
      }
  
      const isUsernameTaken = existingUsernames.includes(username);
      if (isUsernameTaken) {
        showMessage("Username already exists", "red");
      } else if (password !== confirmPassword) {
        showMessage("Passwords do not match", "red");
      } else {
        showMessage("Successfully Registered", "green");
      }
    });
  
    function showMessage(msg, color) {
      message.style.color = color;
      message.textContent = msg;
      message.classList.add("show");
    }
  });
  