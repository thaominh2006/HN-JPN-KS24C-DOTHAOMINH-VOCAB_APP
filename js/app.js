function displayShowDashboard() { // man chuyen huong vao trang chinh
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    if (!currentUser) {
        displayShowLogin();
        return;
    }
    document.getElementById("loggin").style.display = "none";
    document.getElementById("register-card").style.display = "none";
    document.querySelector(".quizlet").style.display = "none";
    document.querySelector(".main-container").style.display = "none";
    document.querySelector(".nav-bar-create").style.display = "none";
    document.getElementById("dashboard-nav").style.display = "flex";
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("container-vocab").style.display = "none"
    document.getElementById("category-vocab").style.display = "none"
    document.getElementById("flashcard").style.display = "none";
    document.getElementById("user-hi").innerText = `Hi, ${currentUser.firstName} ${currentUser.lastName}`;
    document.getElementById("welcome-mess").innerText = `Chào mừng bạn đã quay lại học, ${currentUser.firstName} ${currentUser.lastName}!`;
}
function displayVocab() { // man chuyen huong sang trang vocabulary
    let Vocabulary = document.getElementById("Vocabulary")
    Vocabulary.style.color = "#007bff"
    let Categories = document.getElementById("Categories")
    Categories.style.color = "#666666"
    let Flashcards = document.getElementById("Flashcards")
    Flashcards.style.color = "#666666"
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    if (!currentUser) {
        displayShowLogin();
        return;
    }
    document.getElementById("loggin").style.display = "none";
    document.getElementById("register-card").style.display = "none";
    document.querySelector(".quizlet").style.display = "none";
    document.querySelector(".main-container").style.display = "none";
    document.querySelector(".nav-bar-create").style.display = "none";
    document.getElementById("dashboard-nav").style.display = "flex";
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("container-vocab").style.display = "block"
    document.getElementById("category-vocab").style.display = "none"
    document.getElementById("flashcard").style.display = "none"
    renderVocabList();
}
function displayCategories() { // man chuyen huong sang trang categories
    let Vocabulary = document.getElementById("Vocabulary")
    Vocabulary.style.color = "#666666"
    let Categories = document.getElementById("Categories")
    Categories.style.color = "#007bff"
    let Flashcards = document.getElementById("Flashcards")
    Flashcards.style.color = "#666666"
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    if (!currentUser) {
        displayShowLogin();
        return;
    }
    document.getElementById("loggin").style.display = "none";
    document.getElementById("register-card").style.display = "none";
    document.querySelector(".quizlet").style.display = "none";
    document.querySelector(".main-container").style.display = "none";
    document.querySelector(".nav-bar-create").style.display = "none";
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("container-vocab").style.display = "none"
    document.getElementById("dashboard-nav").style.display = "flex";
    document.getElementById("category-vocab").style.display = "block"
    document.getElementById("flashcard").style.display = "none";
    console.log("hello 2");
    renderCategoryList();
}


function displayFlashCard() { // man chuyen huong sang trang flashcard
    let Vocabulary = document.getElementById("Vocabulary")
    Vocabulary.style.color = "#666666"
    let Categories = document.getElementById("Categories")
    Categories.style.color = "#666666"
    let Flashcards = document.getElementById("Flashcards")
    Flashcards.style.color = "#007bff"
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    if (!currentUser) {
        displayShowLogin();
        return;
    }
    document.getElementById("category-vocab").style.display = "none";
    document.querySelector(".quizlet").style.display = "none";
    document.querySelector(".nav-bar-create").style.display = "none";
    document.getElementById("container-vocab").style.display = "none";
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("main-container").style.display = "none";
    document.getElementById("loggin").style.display = "none";
    document.getElementById("register-card").style.display = "none";
    document.getElementById("dashboard-nav").style.display = "flex";
    document.getElementById("flashcard").style.display = "block";
    displayLoad();
    displayProgress();
    displayWordList();
}
function handleLogout() { // chuyen huong ve trang dang nhap, dang ky, nav-bar
    localStorage.removeItem("currentUser");
    document.getElementById("loggin").style.display = "block";
    document.getElementById("register-card").style.display = "block";
    document.querySelector(".quizlet").style.display = "block";
    document.querySelector(".main-container").style.display = "block";
    document.querySelector(".nav-bar-create").style.display = "block";
    document.getElementById("dashboard-nav").style.display = "none";
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("container-vocab").style.display = "none";
    document.getElementById("category-vocab").style.display = "none";
    document.getElementById("flashcard").style.display = "none";
}
window.onload = function () {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    if (currentUser) {
        displayShowDashboard();
    }
}
