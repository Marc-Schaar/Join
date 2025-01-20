let input;

async function signUpInit() {
    users = await getData("users");
    if (users) {
        userIds = Object.keys(users);
    }
    console.log("User:", users, "User Ids", userIds);
}

async function signUp() {
    input = getInput();
    let { nameExists, emailExists } = checkNameEmail();
    let passwordMatch = checkPassword();

    if (input.checkbox && !nameExists && !emailExists && passwordMatch) {
        console.log("User can sign up.");
        await postSignUpData(input.name, input.email, input.email);
    } else {
        console.log("User already exists or conditions not met.");
    }
}

function getInput() {
    let nameInputRef = document.getElementById("name");
    let emailInputRef = document.getElementById("email");
    let passwordRef = document.getElementById("password");
    let checkboxRef = document.getElementById("myCheckbox");
    return {
        name: nameInputRef.value,
        email: emailInputRef.value,
        password: passwordRef.value,
        checkbox: checkboxRef.checked,
    };
}

function checkPassword() {
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirm-password");

    return password.value === confirmPassword.value ? true : false;
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
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirm-password").value = "";
    document.getElementById("checkbox");
}

function toogleDialog(id) {
    document.getElementById(id).classList.add("dialog-active");

    setTimeout(function () {
        document.getElementById(id).classList.remove("dialog-active");
        window.location.href = "index.html";
    }, 2000);
}
