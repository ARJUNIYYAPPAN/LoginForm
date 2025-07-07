document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const nameInput = document.querySelector('input[type="text"]');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const termsCheckbox = document.querySelector('#terms');
    const signUpButton = document.querySelector('.btn');

    function showError(input, message) {
        removeError(input); // remove existing
        const error = document.createElement('small');
        error.classList.add('error-message');
        error.style.color = 'red';
        error.textContent = message;
        input.parentElement.appendChild(error);
    }

    function removeError(input) {
        const error = input.parentElement.querySelector('.error-message');
        if (error) {
            error.remove();
        }
    }

    function validateName() {
        const name = nameInput.value.trim();
        if (name === '') {
            showError(nameInput, 'Name is required.');
            return false;
        }
        removeError(nameInput);
        return true;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (email === '') {
            showError(emailInput, 'Email is required.');
            return false;
        } else if (!emailPattern.test(email)) {
            showError(emailInput, 'Enter a valid email.');
            return false;
        }
        removeError(emailInput);
        return true;
    }

    function validatePassword() {
        const password = passwordInput.value;
        if (password === '') {
            showError(passwordInput, 'Password is required.');
            return false;
        } else if (password.length < 6) {
            showError(passwordInput, 'Password must be at least 6 characters.');
            return false;
        }
        removeError(passwordInput);
        return true;
    }

    function validateTerms() {
        if (!termsCheckbox.checked) {
            alert("Please agree to the terms and conditions.");
            return false;
        }
        return true;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent default submission

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isTermsChecked = validateTerms();

        if (isNameValid && isEmailValid && isPasswordValid && isTermsChecked) {
            alert('Registration successful!');
            // You can submit data here using fetch() or XMLHttpRequest or redirect.
            form.reset(); // Optional: reset form
        } else {
            console.log('Form validation failed.');
        }
    });

    // Optional: live validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);

    localStorage.setItem("user", JSON.stringify({ name: "", email: "", password: "" }));
    const savedUser = JSON.parse(localStorage.getItem("user")); 
    if (savedUser && savedUser.name) {
        nameInput.value = savedUser.name;
        emailInput.value = savedUser.email;
        passwordInput.value = savedUser.password;
    }
    signUpButton.addEventListener('click', function () {
        if (validateName() && validateEmail() && validatePassword() && validateTerms()) {
            localStorage.setItem("user", JSON.stringify({
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                password: passwordInput.value
            }));
            alert('Registration successful!');
            form.reset();
        }
    });
    // Optional: Toggle password visibility
    const togglePasswordIcon = document.querySelector('.toggle-password');
    if (togglePasswordIcon) {
        togglePasswordIcon.addEventListener('click', function () {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                togglePasswordIcon.textContent = '🙈'; // Hide icon
            } else {
                passwordInput.type = 'password';
                togglePasswordIcon.textContent = '👁️'; // Show icon
            }
        });
    }
    

});
