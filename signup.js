document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");

  // Checklist elements
  const lengthCheck = document.getElementById("length");
  const upperCheck = document.getElementById("uppercase");
  const numberCheck = document.getElementById("number");
  const specialCheck = document.getElementById("special");

  // Modal elements
  const modal = document.getElementById("success-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const modalLoginBtn = document.getElementById("modal-login-btn");

  const submitBtn = form.querySelector("button");

  // Live password strength check
  password.addEventListener("input", function () {
    const val = password.value;

    toggleCheck(lengthCheck, val.length >= 8);
    toggleCheck(upperCheck, /[A-Z]/.test(val));
    toggleCheck(numberCheck, /[0-9]/.test(val));
    toggleCheck(specialCheck, /[^A-Za-z0-9]/.test(val));
  });

  function toggleCheck(element, condition) {
    if (condition) {
      element.classList.add("valid");
      element.textContent = "✅ " + element.textContent.slice(2);
    } else {
      element.classList.remove("valid");
      element.textContent = "❌ " + element.textContent.slice(2);
    }
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Basic validations
    if (password.value !== confirmPassword.value) {
      alert("Passwords do not match.");
      confirmPassword.focus();
      return;
    }

    if (!validateEmail(email.value)) {
      alert("Please enter a valid email address.");
      email.focus();
      return;
    }

    // Show loading state
    submitBtn.classList.add("loading");

    const signupSuccess = await fakeSignupApi(email.value, password.value);

    submitBtn.classList.remove("loading");

    if (signupSuccess) {
      // Show modal
      modal.classList.add("show");

      // Reset form
      form.reset();
      submitBtn.disabled = true;

      // Reset checklist UI
      [lengthCheck, upperCheck, numberCheck, specialCheck].forEach(el => {
        el.classList.remove("valid");
        el.textContent = "❌ " + el.textContent.slice(2);
      });
    } else {
      alert("Signup failed. Please try again.");
    }
  });

  // Modal close actions
  closeModalBtn.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  modalLoginBtn.addEventListener("click", () => {
    window.location.href = "login.html";
  });

  // Close modal on outside click
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });

  // Close modal on Esc key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      modal.classList.remove("show");
    }
  });

  function validateEmail(email) {
    const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return re.test(String(email).toLowerCase());
  }
});
