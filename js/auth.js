function displayShowRegister() { // show man dang ky
    document.getElementById("register-card").style.display = "block";
    document.getElementById("loggin").style.display = "none"
    document.querySelector(".quizlet").style.display = "none"
    document.querySelector(".main-container").style.display = "none"
    document.querySelector(".nav-bar-create").style.display = "flex"
    document.getElementById("dashboard-nav").style.display = "none"
    document.getElementById("dashboard").style.display = "none"
    document.getElementById("container-vocab").style.display = "none"
    displayClearError();
};
function displayShowLogin() { // show man dang nhap
    document.getElementById("loggin").style.display = "block"
    document.getElementById("register-card").style.display = "none"
    document.querySelector(".quizlet").style.display = "none"
    document.querySelector(".main-container").style.display = "none"
    document.querySelector(".nav-bar-create").style.display = "flex";
    document.getElementById("dashboard-nav").style.display = "none"
    document.getElementById("dashboard").style.display = "none"
    document.getElementById("container-vocab").style.display = "none"
    displayClearError();
}
function displayRegister() { // chuc nang dang ky
    let firstName = document.getElementById("first-name").value.trim();
    let lastName = document.getElementById("last-name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("pass").value;
    let confirmPass = document.getElementById("confirm-pass").value;
    displayClearError();
    let isValid = true;
    if (!firstName) {
        displayShowError("First name cannot be blank", "first-name-error");
        isValid = false;
    }
    if (!lastName) {
        displayShowError("Last name cannot be blank", "last-name-error")
        isValid = false;
    }
    let emailCheck = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    let indexUser = JSON.parse(localStorage.getItem("users")) || [];
    let emailElement = indexUser.some(user => user.email === email);
    if (!emailCheck.test(email)) {
        displayShowError("Invalid email!", "email-error")
        isValid = false;
    } else if (emailElement) {
        displayShowError("Email already exists!", "email-error")
        isValid = false;
    }
    let passCheck = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    if (!passCheck.test(password)) {
        displayShowError("Password must be at least 8 characters, including uppercase letters, lowercase letters, and at least one number", "pass-error")
        isValid = false;
    }
    // function isValidPass(password){
    //     if(password.length < 8){
    //         return false;
    //     }
    //     let upperCase = false;
    //     let lowerCase = false;
    //     let number = false;
    //     for(let i of password){
    //         if(i >= 'A' && i <= 'Z'){
    //             return true;
    //         }else if(i >= 'a' && i <= 'z'){
    //             return true;
    //         }else if(i >= '0' && i <= '9'){
    //             return true;
    //         }
    //         return false;
    //     }
    //     if(isValidPass(password)){
    //         displayShowError("Password must be at least 8 characters, including uppercase letters, lowercase letters, at least one number", "pass-error")
    //         isValid = false;
    //     }
    // }
    if (password !== confirmPass) {
        displayShowError("Confirm Password does not match Password", "confirm-pass-error")
        isValid = false;
    }
    if (isValid) {
        let user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        };
        indexUser.push(user);
        localStorage.setItem("users", JSON.stringify(indexUser));
        Swal.fire({
            title: "Register successful! Please login",
            icon: "success",
            draggable: true
        });
        displayShowLogin();
        document.getElementById("register-card").querySelectorAll("input").forEach(input => input.value = "");
    }
}
function displayLogin() { // chuc nang dang nhap
    let email = document.getElementById("login-email").value.trim();
    let pass = document.getElementById("login-pass").value.trim();

    displayClearError();
    let isValid = true;
    if (!email) {
        displayShowError("Email cannot be blank", "login-email-error")
        isValid = false;
    }
    if (!pass) {
        displayShowError("Password cannot be blank!", "login-pass-error")
        isValid = false;
    }
    if (isValid) {
        let indexUser = JSON.parse(localStorage.getItem("users")) || [];
        let user = indexUser.find(user => user.email === email && user.password === pass)
        if (!user) {
            displayShowError("Email or Password is incorrect", "login-email-error");
            displayShowError("", "login-pass-error");
        } else {
            Swal.fire({
                title: "Login successful!",
                icon: "success",
                draggable: true
            });
            localStorage.setItem("currentUser", JSON.stringify(user))
            displayShowDashboard();
            document.getElementById("login-email").value = ""
            document.getElementById("login-pass").value = ""
        }
    }
}
function displayLogout() { // chuc nang dang xuat
    document.getElementById("logout-modal").style.display = "block";
    document.getElementById("yes-btn-logout").onclick = function () {
        displayCloseModal('logout-modal');
        handleLogout();
        displayShowLogin();
    }
}
function displayClick() { // click vao VocabApp thi quay lai trang dang ky
    displayShowRegister();
}
function displayShowError(mess, errorId) { // hien thi loi
    let errorElement = document.getElementById(errorId);
    if(errorElement){
        errorElement.innerText = mess
        errorElement.style.display = "block"
    }
}
function displayClearError() { // an loi
    let errors = document.querySelectorAll('.error')
    errors.forEach(error => {
        error.innerText = "";
        error.style.display = "none"
    });
}

