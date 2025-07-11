 document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const submitBtn = form.querySelector("button");
  const errorDiv = document.getElementById("login-error");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorDiv.style.display = "none";

    const emailVal = email.value.trim();
    const passwordVal = password.value;

    if (!emailVal || !passwordVal) {
      showError("Please enter both email and password.");
      return;
    }

    // Password validation
    const isValid = passwordVal.length >= 8 &&
                    /[A-Z]/.test(passwordVal) &&
                    /[0-9]/.test(passwordVal) &&
                    /[^A-Za-z0-9]/.test(passwordVal);

    if (!isValid) {
      showError("Password format is incorrect. Follow the password hint.");
      password.focus();
      return;
    }

    // Success message
    localStorage.setItem("token", "mock-token-123");
    submitBtn.disabled = true;
    submitBtn.textContent = "Logging in...";
    
    setTimeout(() => {
      alert("Login successful!");
      window.location.href = "index.html";
    }, 1000);
  });

  function showError(msg) {
    errorDiv.textContent = msg;
    errorDiv.style.display = "block";
  }
});
 
 