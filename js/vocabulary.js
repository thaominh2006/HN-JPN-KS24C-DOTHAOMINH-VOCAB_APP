let vocabularyList = [
    {
        id: 1,
        word: "Cat",
        mean: "con mèo",
        cate: "Animals",
        example: "meo meo"
    },
    {
        id: 2,
        word: "Dog",
        mean: "con chó",
        cate: "Animals",
        example: "gau gau"
    },
    {
        id: 3,
        word: "Listen to music",
        mean: "nghe nhạc",
        cate: "Hobbies",
        example: "Dancing in the dark"
    },
    {
        id: 4,
        word: "Watching TV",
        mean: "xem tv",
        cate: "Hobbies",
        example: "cartoon"
    },
    {
        id: 5,
        word: "Pig",
        mean: "con lợn",
        cate: "Animals",
        example: "ec ec"
    },
    {
        id: 6,
        word: "Do charity",
        mean: "làm từ thiện",
        cate: "Hobbies",
        example: "money"
    },
];
let currentPageVocab = 1;
let pageVocab = 4;
function displayVocabOpen(currentPage = 1) {
    console.log("hello");
    
    displayLoadCategoryOptions();
    document.getElementById('add-edit-modal').style.display = "block";
    document.getElementById("modal-title").innerText = "Add New Word";
    let form = document.getElementById("vocab-form");
    form.reset();
    form.onsubmit = function (event) {
        event.preventDefault();
        displayAddNewWord(currentPage);
    }
}
function displayCloseModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}
function displayAddNewWord(currentPage) {
    let word = document.getElementById("modal-word").value;
    let mean = document.getElementById("modal-mean").value;
    let cate = document.getElementById("modal-cate").value;
    let example = document.getElementById("modal-ex").value;
    if (!word || !mean || !cate || !example) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Word or mean or category or example cannot be blank!",
        });
        return; 
    }
    let vocabList = vocabularyList;
    let newWord = {
        id: vocabularyList.length + 1,
        word: word,
        mean: mean,
        cate: cate,
        example: example
    };
    vocabularyList.push(newWord);
    renderVocabList(currentPage)
    displayCloseModal("add-edit-modal");
    populateCateFilter()
}
function renderVocabList(pageNum = currentPageVocab, list = vocabularyList) {
    let tbody = document.getElementById("vocab-list")
    tbody.innerHTML = "";
    let startIndex = (pageNum - 1) * pageVocab;
    let endIndex = startIndex + pageVocab;
    let panigatedList = list.slice(startIndex, endIndex)
    panigatedList.forEach((item) => {
        let row =
            `
        <tr>
            <td>${item.word}</td>
            <td>${item.mean}</td>
            <td>${item.cate}</td>
            <td>${item.example}</td>
            <td>
                <a href="#" class="action-edit" onclick="displayEditModal(${item.id - 1})">Edit</a>
                <a href="#" class="action-delete" onclick="displayDeleteModal(${item.id - 1})">Delete</a>
            </td>
        </tr>
        `;
        tbody.innerHTML += row
    });
    currentPage = pageNum;
    displayVocabPanigation();
}
function displayEditModal(index) {
    let item = vocabularyList[index];
    document.getElementById("add-edit-modal").style.display = "block";
    document.getElementById("modal-title").innerText = "Edit Word";
    displayLoadCategoryOptions();
    document.getElementById("modal-word").value = item.word;
    document.getElementById("modal-mean").value = item.mean;
    document.getElementById("modal-cate").value = item.cate;
    document.getElementById("modal-ex").value = item.example;
    document.getElementById("vocab-form").onsubmit = function (event) {
        event.preventDefault();
        let word = document.getElementById("modal-word").value
        let mean = document.getElementById("modal-mean").value
        let cate = document.getElementById("modal-cate").value
        let example = document.getElementById("modal-ex").value;
        if (!word || !mean || !cate || !example) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
            })
            return;
        }
        let exists = vocabularyList.some((item, idx) => idx !== index && item.word.toLowerCase() === word.toLowerCase())
        if (exists) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
            })
            return;
        }
        vocabularyList[index] = {
            id: item.id,
            word: word,
            mean: mean,
            cate: cate,
            example: example
        }
        renderVocabList();
        displayCloseModal('add-edit-modal');
        populateCateFilter()
    }
}
function displayDeleteModal(index) {
    document.getElementById("modal-delete").style.display = "block";
    document.getElementById("submit-delete-btn").onclick = function () {
        vocabularyList.splice(index, 1)
        renderVocabList();
        displayCloseModal('modal-delete');
        populateCateFilter()
    }
}
function displaySearch() {
    let searchItem = document.getElementById("search-name").value.toLowerCase();
    let category = document.getElementById("cate-filter").value;
    let filterList = vocabularyList.filter(item => item.word.toLowerCase().includes(searchItem) && (category === "All Categories" || item.cate === category));
    renderVocabList(1, filterList);
}
let cateFilter = document.getElementById("cate-filter")
cateFilter.addEventListener("change", function () {
    let selectValue = cateFilter.value;
    let filterList = selectValue === "All Categories"
        ? vocabularyList
        : vocabularyList.filter(item => item.cate === selectValue);
    renderVocabList(1, filterList)
})
function displayVocabPanigation() {
    let totalPages = Math.ceil(vocabularyList.length / pageVocab);
    let panigationContainer = document.getElementById("vocab-panigation");

    panigationContainer.innerHTML = "";

    let prevBtn = document.createElement("button");
    prevBtn.textContent = "Previous";
    prevBtn.disabled = currentPageVocab === 1;
    prevBtn.onclick = function () {
        if (currentPageVocab > 1) {
            currentPageVocab--;
            renderVocabList(currentPageVocab);
        }
    };
    panigationContainer.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
        let pageBtn = document.createElement("button");
        pageBtn.textContent = i;
        pageBtn.className = (i === currentPageVocab) ? "active" : "";
        pageBtn.onclick = function () {
            currentPageVocab = i;
            renderVocabList(currentPageVocab);
        };
        panigationContainer.appendChild(pageBtn);
    }

    let nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.disabled = currentPageVocab === totalPages;
    nextBtn.onclick = function () {
        if (currentPageVocab < totalPages) {
            currentPageVocab++;
            renderVocabList(currentPageVocab);
        }
    };
    panigationContainer.appendChild(nextBtn);
}

function deleteVocabByCategory(cateName) {
    vocabularyList = vocabularyList.filter(item => item.cate !== cateName);
    vocabularyList.forEach((item, i) => item.id = i + 1);
}
function updateVocabCategories(oldName, newName) {
    vocabularyList.forEach(item => {
        if (item.cate === oldName) {
            item.cate = newName;
        }
    });
}
function displayLoadCategoryOptions() {
    updateCateSelectOption();
}
function populateCateFilter() {
    updateCateSelectOption();
}
document.addEventListener("DOMContentLoaded", function () {
    renderVocabList();
    populateCateFilter();
});