let userFound = false;
let users = [];
let currentUser;
let remeberMe;
let remeberMeUser;
let passwordInput = document.getElementById("password");

function toogleVisabiltyPsw() {
    let inputRef = document.getElementById("password");
    let imgRef = document.getElementById("password-img");
    if (inputRef.type === "password") {
        inputRef.type = "text";
        //Bild Einfügen
        // imgRef.src =
    } else {
        inputRef.type = "password";
    }
}

/**
 * Initializes the login process by fetching user data and checking for the "Remember Me" option.
 * If the "Remember Me" option is enabled, it auto-fills the form and triggers the login.
 */
async function loginInit() {
    users = await getData("users");
    if (users) {
        userIds = Object.keys(users);
        let remeberMe = getFromLocalStorage("rememberMe");
        let remeberMeUser = getFromLocalStorage("rememberMeUser");
        if (remeberMe && remeberMeUser) {
            document.getElementById("email").value = remeberMeUser.email;
            passwordInput.value = remeberMeUser.password;
            document.getElementById("myCheckbox").checked = remeberMe;
            login();
        }
    }
}

/**
 * Handles the login process by retrieving input values and searching for the user in the database.
 * Displays error styles if the login fails.
 */
async function login() {
    let isUserFound = searchUserInDatabase(getInputs());
    if (checkForm() && isUserFound) {
        userLogin();
    } else {
        showError();
    }
}

function checkForm() {
    let emailError = document.getElementById(`email-error`);
    email = document.getElementById("email");
    let passwordError = document.getElementById(`password-error`);

    emailError.innerHTML = "";
    passwordError.innerHTML = "";
    let mailCheck = checkEmail(email.value, emailError);
    // let passwordCheck = checkPhone(phone, phoneError);
    if (true == mailCheck) {
        return true;
    }
    addErrorClasses(emailError, passwordError);
    return false;
}

function showError() {
    console.log("Nutzer nicht gefunden", users);
}

function getInputs() {
    let emailInput = document.getElementById("email").value;
    let passwordInput = document.getElementById("password").value;
    return { email: emailInput, password: passwordInput };
}

function getCheckboxStatus() {
    let checkboxRef = document.getElementById("myCheckbox");
    if (checkboxRef.checked) return true;
    else return false;
}

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
 * @param {HTMLElement} remeberMeRef - The checkbox element for the "Remember Me" option.
 * @param {string} userId - The ID of the logged-in user.
 */
function userLogin() {
    if (currentUser) {
        localStorage.setItem("user", currentUser.name);
        localStorage.setItem("userId", currentUser.id);
        saveToLocalStorage("rememberMe", getCheckboxStatus());
        saveToLocalStorage("rememberMeUser", currentUser);

        window.location.href = "summary.html";
    } else {
        console.log("Fehler: currentUser ist nicht definiert.");
    }
}

/**
 * Adds a shake animation to the provided error element.
 *
 * @param {HTMLElement} Error - The element to shake.
 */
function shake(Error) {
    Error.classList.add("shake");
    setTimeout(() => {
        Error.classList.remove("shake");
    }, 300);
}

/**
 * Applies error styles to the email input field based on validation.
 *
 * @param {string} emailInput - The email entered by the user.
 */
function emailInputErrorStyle(emailInput) {
    let userEmailError = document.getElementById("email-error");
    let userEmailContainer = document.getElementById("email-input-container");
    checkIfEmailInputFilled(emailInput, userEmailError, userEmailContainer);
    checkIfEmailHaveAnAtt(emailInput, userEmailError, userEmailContainer);
}

/**
 * Checks if the email input field is empty and applies appropriate error styles.
 *
 * @param {string} emailInput - The email entered by the user.
 * @param {HTMLElement} userEmailError - The element displaying the email error message.
 * @param {HTMLElement} userEmailContainer - The container for the email input field.
 */
function checkIfEmailInputFilled(
    emailInput,
    userEmailError,
    userEmailContainer
) {
    if (emailInput === "") {
        userEmailError.textContent = "Please enter your Email!";
        userEmailError.classList.add("visible");
        userEmailContainer.classList.add("red-border");
        shake(userEmailError);
    } else {
        userEmailError.classList.remove("visible");
        userEmailContainer.classList.remove("red-border");
    }
}

/**
 * Checks if the email input contains an '@' symbol and applies error styles if it does not.
 *
 * @param {string} emailInput - The email entered by the user.
 * @param {HTMLElement} userEmailError - The element displaying the email error message.
 * @param {HTMLElement} userEmailContainer - The container for the email input field.
 */
function checkIfEmailHaveAnAtt(emailInput, userEmailError, userEmailContainer) {
    if (!containsAtSymbol(emailInput) && emailInput !== "") {
        userEmailError.textContent = "Your email isn't an email";
        userEmailError.classList.add("visible");
        userEmailContainer.classList.add("red-border");
        shake(userEmailError);
    }
}

/**
 * Checks if the email input contains an '@' symbol.
 *
 * @param {string} emailInput - The email entered by the user.
 */
function containsAtSymbol(emailInput) {
    return emailInput.includes("@");
}

/**
 * Applies error styles to the password input field based on validation.
 *
 * @param {string} passwordInput - The password entered by the user.
 * @param {string} emailInput - The email entered by the user.
 */
function passwordInputErrorStyle(passwordInput, emailInput) {
    let userPwdError = document.getElementById("password-error");
    let userPwdContainer = document.getElementById("pwd-input-container");
    checkIfPasswordInputFilled(passwordInput, userPwdError, userPwdContainer);
    checkIfPasswordMatch(passwordInput, userPwdError, emailInput);
}

/**
 * Checks if the password matches the user's password in the database and applies error styles if not.
 *
 * @param {string} passwordInput - The password entered by the user.
 * @param {HTMLElement} userPwdError - The element displaying the password error message.
 * @param {string} emailInput - The email entered by the user.
 */
function checkIfPasswordMatch(passwordInput, userPwdError, emailInput) {
    if (
        (passwordInput !== "" && passwordInput !== currentUser.password) ||
        (emailInput !== currentUser.email && passwordInput !== "")
    ) {
        userPwdError.textContent = "Email or Password isn't correct";
        userPwdError.classList.add("visible");
        shake(userPwdError);
    }
}

/**
 * Checks if the password input field is empty and applies appropriate error styles.
 *
 * @param {string} passwordInput - The password entered by the user.
 * @param {HTMLElement} userPwdError - The element displaying the password error message.
 * @param {HTMLElement} userPwdContainer - The container for the password input field.
 */
function checkIfPasswordInputFilled(
    passwordInput,
    userPwdError,
    userPwdContainer
) {
    if (passwordInput === "") {
        userPwdError.textContent = "Please enter your Password!";
        userPwdError.classList.add("visible");
        userPwdContainer.classList.add("red-border");
        shake(userPwdError);
    } else {
        userPwdError.classList.remove("visible");
        userPwdContainer.classList.remove("red-border");
    }
}

/**
 * Redirects the user to the summary page as a guest.
 */
function goSummery() {
    localStorage.setItem("user", "Guest");
    window.location.href = "summary.html";
}
