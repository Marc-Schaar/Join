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

async function signUpInit() {
    console.log(
        nameInputRef,
        emailInputRef,
        passwordInputRef,
        confirmPasswordInputRef,
        checkboxInputRef,

        nameErrorRef,
        emailErrorRef,
        passwordErrorRef,
        confirmPasswordErrorRef,
        checkboxErrorRef
    );
    users = await getData("users");
    if (users) {
        userIds = Object.keys(users);
    }
}

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
                "Password does not match"
            );
            showError(confirmPasswordErrorRef, confirmPasswordInputRef);
        }
        if (passwordInputRef.value.length === 0) {
            showError(
                passwordErrorRef,
                passwordInputRef,
                "Password is required"
            );
        }
        if (checkboxInputRef && !checkboxInputRef.checked) {
            showError(
                checkboxErrorRef,
                checkboxInputRef,
                "You must agree to the Privacy Policy"
            );
        }
    }
}

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

function getInput() {
    return {
        name: nameInputRef.value,
        email: emailInputRef.value,
        password: passwordInputRef.value,
        checkbox: checkboxInputRef.checked,
    };
}

function checkPasswordIdentical() {
    return passwordInputRef.value === confirmPasswordInputRef.value
        ? true
        : false;
}

function checkNameEmail() {
    let nameExists = false;
    let emailExists = false;

    userIds.forEach((id) => {
        let currentUser = users[id];

        if (currentUser.name === input.name) nameExists = true;
        if (currentUser.email === input.email) emailExists = true;
    });
    return { nameExists, emailExists };
}

async function postSignUpData() {
    await postData((path = "/users"), (data = userTemplate()));
    clearInputs();
    toogleDialog("dialog-signup-succes");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000);
}

function userTemplate() {
    return {
        name: input.name,
        email: input.email,
        password: input.password,
        color: "#29ABE3",
    };
}

function clearInputs() {
    nameInputRef.value = "";
    emailInputRef.value = "";
    passwordInputRef.value = "";
    confirmPasswordInputRef.value = "";
    checkboxInputRef.checked = false;
}

function toogleDialog(id) {
    document.getElementById(id).classList.add("dialog-active");

    setTimeout(function () {
        document.getElementById(id).classList.remove("dialog-active");
    }, 2000);
}
