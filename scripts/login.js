let userFound = false;
let users = [];
let currentUser;

/**
 * Initializes the login process by fetching user data and checking "Remember Me" settings.
 *
 * This function retrieves the user list from the database, checks if "Remember Me" and
 * associated user data are stored in localStorage, and if so, populates the login form
 * with the remembered user's credentials. It then attempts to log in automatically.
 *
 * @async
 * @function loginInit
 * @returns {Promise<void>} - Resolves once the initialization process is complete.
 */
async function loginInit() {
    users = await getData("users");
    if (users) {
        userIds = Object.keys(users);
        let remeberMe = getFromLocalStorage("rememberMe");
        let remeberMeUser = getFromLocalStorage("rememberMeUser");
        if (remeberMe && remeberMeUser) {
            document.getElementById("email").value = remeberMeUser.email;
            document.getElementById("password").value = remeberMeUser.password;
            document.getElementById("myCheckbox").checked = remeberMe;
            login();
        }
    }
}

/**
 * Handles the login process by validating the user input and checking the database.
 *
 * This function retrieves the user's input, searches for a matching user in the database,
 * and validates the form. If both the input is valid and the user exists in the database,
 * the `userLogin` function is called to complete the login process. Otherwise, form errors
 * are displayed.
 *
 * @async
 * @function login
 * @returns {Promise<void>} - Resolves once the login process is complete.
 */
async function login() {
    userFound = searchUserInDatabase(getInputs());
    if (checkForm() && userFound) {
        userLogin();
    } else {
        checkForm();
    }
}

/**
 * Validates the login form by checking email and password fields for correctness.
 *
 * This function resets any previous error states, validates email and password, and
 * displays appropriate error messages if the input is invalid or the user is not found.
 *
 * @function checkForm
 * @returns {boolean} True if the form passes validation, false otherwise.
 */
function checkForm() {
    let emailError = document.getElementById(`email-error`);
    let email = document.getElementById("email");
    let passwordError = document.getElementById(`password-error`);
    let password = document.getElementById("password");

    resetFormErrors([emailError, passwordError], [email, password]);
    renderError(emailError, passwordError, email, password);
    return true;
}

/**
 * Renders error messages for invalid form fields.
 *
 * @function renderError
 * @param {HTMLElement} emailError - The error element for the email field.
 * @param {HTMLElement} passwordError - The error element for the password field.
 * @param {HTMLElement} email - The email input field.
 * @param {HTMLElement} password - The password input field.
 * @returns {boolean} True if no errors are found, false otherwise.
 */
function renderError(emailError, passwordError, email, password) {
    let mailCheck = checkEmail(email.value, emailError);
    let passwordCheck = checkPassword(password.value, passwordError);

    if (mailCheck && passwordCheck) {
        if (!userFound) {
            showError(emailError, email, "Email or Password is not correct");
            showError(passwordError, password);
        }
        return true;
    }
    if (!mailCheck) showError(emailError, email);
    if (!passwordCheck) showError(passwordError, password);
    return false;
}

/**
 * Resets all form errors and removes visual error indicators.
 *
 * @function resetFormErrors
 * @param {HTMLElement[]} errorElements - Array of error message elements to reset.
 * @param {HTMLElement[]} inputElements - Array of input fields to clear error styles.
 */
function resetFormErrors(errorElements, inputElements) {
    errorElements.forEach((errorElement) => {
        if (errorElement) {
            errorElement.innerHTML = "";
            errorElement.style.display = "none";
            errorElement.classList.remove("shake");
        }
    });

    inputElements.forEach((inputElement) => {
        if (inputElement) inputElement.classList.remove("red-border");
    });
}

/**
 * Displays an error message and applies error styles to the input field.
 *
 * @function showError
 * @param {HTMLElement} textRef - The error message element.
 * @param {HTMLElement} input - The input field to apply error styles.
 * @param {string} [errorMessage] - Optional error message to display.
 */
function showError(textRef, input, errorMessage) {
    if (textRef) {
        textRef.style.display = "block";
        textRef.classList.add("shake");
        setTimeout(() => {
            textRef.classList.remove("shake");
        }, 200);
    }
    if (input) input.classList.add("red-border");
    if (errorMessage) textRef.innerHTML = errorMessage;
}

/**
 * Retrieves user inputs from the login form.
 *
 * @function getInputs
 * @returns {Object} An object containing the email and password values.
 */
function getInputs() {
    return {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };
}

/**
 * Retrieves the status of the "Remember Me" checkbox.
 *
 * This function checks the current state of the checkbox with the ID "myCheckbox"
 * and returns whether it is checked or not.
 *
 * @function getCheckboxStatus
 * @returns {boolean} - Returns `true` if the checkbox is checked, otherwise `false`.
 */
function getCheckboxStatus() {
    return document.getElementById("myCheckbox").checked;
}

/**
 * Checks the database for a matching user with the provided credentials.
 *
 * @function searchUserInDatabase
 * @param {Object} inputs - An object containing the email and password to search.
 * @returns {boolean} True if a matching user is found, false otherwise.
 */
function searchUserInDatabase(inputs) {
    for (let index = 0; index < userIds.length; index++) {
        let userId = userIds[index];
        let searchCurrentUser = users[userId];

        if (
            searchCurrentUser.email == inputs.email &&
            searchCurrentUser.password == inputs.password
        ) {
            currentUser = searchCurrentUser;
            return true;
        }
    }
    return false;
}

/**
 * Logs the user in by saving their details to localStorage and redirects to the summary page.
 *
 * This function stores the logged-in user's details in localStorage and navigates
 * to the summary page. If "Remember Me" is checked, the user's credentials are saved
 * for future logins.
 *
 * @function userLogin
 */
function userLogin() {
    if (currentUser) {
        localStorage.setItem("user", currentUser.name);
        localStorage.setItem("userId", currentUser.id);
        saveToLocalStorage("rememberMe", getCheckboxStatus());
        saveToLocalStorage("rememberMeUser", currentUser);

        window.location.href = "summary.html";
    }
}

/**
 * Redirects the user to the summary page as a guest.
 *
 * This function sets the user's name to "Guest" in localStorage and navigates
 * the browser to the summary page. It is used for users who do not log in but
 * still wish to proceed to the summary page.
 *
 * @function goSummary
 */
function goSummary() {
    localStorage.setItem("user", "Guest");
    window.location.href = "summary.html";
}

function goSummery() {
    localStorage.setItem("user", "Guest");
    window.location.href = "summary.html";
}

/**
 * Toggles the password icon based on the input value and type.
 * This function changes the icon displayed next to the password input field depending on the input value
 * and whether the password field is currently hidden or shown.
 * @function toggleVisibilityPsw
 */
function tooglePasswortIcon() {
    let inputRef = document.getElementById("password");
    let imgRef = document.getElementById("password-img");
    if (inputRef.value.length > 0 && inputRef.type !== "text") {
        imgRef.src = "./assets/icons/visibility_off.png";
    } else if (inputRef.type !== "text") {
        imgRef.src = "./assets/icons/lock.png";
    }
}

/**
 * Toggles the visibility of the password input field.
 * This function changes the input field type between "password" and "text",
 * as well as updates the corresponding visibility icon based on the current field value.
 * @function tooglePasswortVisability
 */
function tooglePasswortVisability() {
    let inputRef = document.getElementById("password");
    let imgRef = document.getElementById("password-img");
    if (inputRef.type === "password" && inputRef.value.length > 0) {
        inputRef.type = "text";
        imgRef.src = "./assets/icons/visibility.png";
    } else if (inputRef.value.length > 0) {
        inputRef.type = "password";
        imgRef.src = "./assets/icons/visibility_off.png";
    }
}
