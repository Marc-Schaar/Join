let input;

let nameInputRef = document.getElementById("name");
let emailInputRef = document.getElementById("email");
let passwordInputRef = document.getElementById("password");
let confirmPasswordInputRef = document.getElementById("confirm-password");
let checkboxInputRef = document.getElementById("myCheckbox");

let nameErrorRef = document.getElementById("name-error");
let emailErrorRef = document.getElementById("email-error");
let passwordErrorRef = document.getElementById("password-error");
let confirmPasswordErrorRef = document.getElementById("confirm-password-error");
let checkboxErrorRef = document.getElementById("checkbox-error");

/**
 * Initialize the sign-up process by fetching user data.
 * Retrieves the existing users from the backend.
 */
async function signUpInit() {
    users = await getData("users");
    if (users) {
        userIds = Object.keys(users);
    }
}

/**
 * Handles the sign-up process, validates the input, and either submits the data
 * or displays validation errors.
 */
async function signUp() {
    input = getInput();
    let { nameExists, emailExists } = checkNameEmail();
    let passwordMatch = checkPasswordIdentical();
    resetFormErrorsSignUp();
    let nameValid = checkName(nameInputRef.value, nameErrorRef);
    let emailValid = checkEmail(emailInputRef.value, emailErrorRef);

    if (
        input.checkbox &&
        !nameExists &&
        !nameExists &&
        !emailExists &&
        passwordMatch &&
        nameValid &&
        emailValid
    ) {
        await postSignUpData(input.name, input.email, input.password);
    } else {
        renderFormValidationsError(
            emailExists,
            passwordMatch,
            nameValid,
            emailValid
        );
    }

    /**
     * Renders validation error messages based on the provided parameters.
     * @param {boolean} emailExists - Indicates if the email already exists.
     * @param {boolean} passwordMatch - Indicates if passwords match.
     * @param {boolean} nameValid - Indicates if the name input is valid.
     * @param {boolean} emailValid - Indicates if the email input is valid.
     */
    function renderFormValidationsError(
        emailExists,
        passwordMatch,
        nameValid,
        emailValid
    ) {
        if (emailExists) toggleDialog("dialog-already-exists");
        if (!nameValid) showError(nameErrorRef, nameInputRef);
        if (!emailValid) showError(emailErrorRef, emailInputRef);
        if (!passwordMatch) {
            showError(
                passwordErrorRef,
                passwordInputRef,
                "Passwords do not match"
            );
            showError(confirmPasswordErrorRef, confirmPasswordInputRef);
        }
        if (passwordInputRef.value.length <= 3) {
            showError(
                passwordErrorRef,
                passwordInputRef,
                "Password is too short. Minimum 4 characters required."
            );
        }
        if (checkboxInputRef && !checkboxInputRef.checked) {
            showError(
                checkboxErrorRef,
                checkboxInputRef,
                "You must agree to the Privacy Policy."
            );
        }
    }
}

/**
 * Resets all form errors for the sign-up form.
 */
function resetFormErrorsSignUp() {
    resetFormErrors(
        [
            nameErrorRef,
            emailErrorRef,
            passwordErrorRef,
            confirmPasswordErrorRef,
            checkboxErrorRef,
        ],
        [
            nameInputRef,
            emailInputRef,
            passwordInputRef,
            confirmPasswordInputRef,
            checkboxInputRef,
        ]
    );
}

/**
 * Collects and returns the user input from the form.
 * @returns {Object} Input values from the sign-up form.
 */
function getInput() {
    return {
        name: nameInputRef.value,
        email: emailInputRef.value,
        password: passwordInputRef.value,
        checkbox: checkboxInputRef.checked,
    };
}

/**
 * Checks if the password and confirm password inputs match.
 * @returns {boolean} True if passwords match, otherwise false.
 */
function checkPasswordIdentical() {
    return passwordInputRef.value === confirmPasswordInputRef.value
        ? true
        : false;
}

/**
 * Checks if the provided name or email already exists in the user list.
 * @returns {Object} Contains boolean values for nameExists and emailExists.
 */
function checkNameEmail() {
    let nameExists = false;
    let emailExists = false;
    if (userIds) {
        userIds.forEach((id) => {
            let currentUser = users[id];

            if (currentUser.name === input.name) nameExists = true;
            if (currentUser.email === input.email) emailExists = true;
        });
        return { nameExists, emailExists };
    } else return { nameExists, emailExists };
}

/**
 * Submits the sign-up data to the backend.
 */
async function postSignUpData() {
    await postData((path = "/users"), (data = userTemplate()));
    clearInputs();
    toogleDialog("dialog-signup-succes");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000);
}

/**
 * Creates a user object for the sign-up process.
 * @returns {Object} The user data template.
 */
function userTemplate() {
    return {
        name: input.name,
        email: input.email,
        password: input.password,
        color: "#29ABE3",
        phone: "",
    };
}

/**
 * Clears all inputs in the sign-up form.
 */
function clearInputs() {
    nameInputRef.value = "";
    emailInputRef.value = "";
    passwordInputRef.value = "";
    confirmPasswordInputRef.value = "";
    checkboxInputRef.checked = false;
}

/**
 * Toggles a dialog box with the specified ID.
 * @param {string} id - The ID of the dialog element.
 */
function toogleDialog(id) {
    document.getElementById(id).classList.add("dialog-active");

    setTimeout(function () {
        document.getElementById(id).classList.remove("dialog-active");
    }, 2000);
}
