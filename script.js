// script.js

// Correct form selector
const registerForm = document.querySelector(".form_style");
const loginForm = document.getElementById("loginForm");
const togglePasswordIcons = document.querySelectorAll(".toggle-password");
const googleBtn = document.getElementById("googleLogin");
const appleBtn = document.getElementById("appleLogin");
const displayError = document.querySelector(".display_error");

// Utils
function showMessage(showErrorMessage, message, isError = true) {

  const oldMsg = showErrorMessage.querySelector("small");
  if (oldMsg) oldMsg.remove();

  const msg = document.createElement("small");
  msg.textContent = message;
  msg.style.color = isError ? "red" : "green";
  showErrorMessage.appendChild(msg);
  setTimeout(() => msg.remove(), 3000);
}

function validateEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

function validatePassword(password) {
  const minLength = /.{8,}/;
  const hasUppercase = /[A-Z]/;
  const hasLowercase = /[a-z]/;
  const hasNumber = /\d/;
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/;

  return (
    minLength.test(password) &&
    hasUppercase.test(password) &&
    hasLowercase.test(password) &&
    hasNumber.test(password) &&
    hasSymbol.test(password)
  );
}

// Toggle password visibility
if (togglePasswordIcons) {
  togglePasswordIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const input = document.getElementById(icon.dataset.toggle);
      const img = icon.querySelector("img");
      if (input.type === "password") {
        input.type = "text";
        img.src = "img/openeye.png";
      } else {
        input.type = "password";
        img.src = "img/closeye.png";
      }
    });
  });
}

// ✅ Registration logic (bind to correct <form>)
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;
    const confirm = document.getElementById("regConfirmPassword").value;
    const terms = document.getElementById("regTerms");

    if (!name || !email || !password || !confirm || !terms.checked) {
      return showMessage(displayError, "All fields are required.");
    }

    if (!validateEmail(email)) {
      return showMessage(displayError, "Invalid email format.");
    }

    if (!validatePassword(password)) {
      return showMessage(
        displayError,
        "Password must include uppercase, lowercase, number, symbol and be at least 8 characters."
      );
    }

    if (password !== confirm) {
      return showMessage(displayError, "Passwords do not match.");
    }

    if (!terms.checked) {
      return showMessage(displayError, "Please agree to terms.");
    }

    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    showMessage(displayError, "Registration successful!", false);
    registerForm.reset();
    setTimeout(() => {
      window.location.href = "wel.html";
    }, 500); // slight delay for message display
  });
}

// Login logic
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!email || !password) {
      return showMessage(displayError, "Both fields are required.");
    }

    if (
      !savedUser ||
      savedUser.email !== email 
    ) {
      return showMessage(displayError, "Invalid email.");
    }

    if (savedUser.password !== password) {
      return showMessage(displayError, "Invalid password.");
    }

    showMessage(displayError, "Login successful!", false);
    loginForm.reset();
  });
}        // demo comment for git commit checks

// Social login
function handleSocialLogin() {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  if (savedUser) {
    alert("Logged in with: " + savedUser.email);
  } else {
    alert("Redirecting to register (no user found)");
  }
}

if (googleBtn) googleBtn.addEventListener("click", handleSocialLogin);
if (appleBtn) appleBtn.addEventListener("click", handleSocialLogin);
