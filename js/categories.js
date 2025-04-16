let category = [
    {
        id: 1,
        name: "Animals",
        description: "Word related to animals",
    },
    {
        id: 2,
        name: "Hobbies",
        description: "Word related to leisure activities",
    },
    {
        id: 3,
        name: "Foods",
        description: "Word related to foods"
    },
    {
        id: 4,
        name: "Sports",
        description: "Word related to sport"
    }
];
let currentPageCate = 1;
let pageCate = 3;
function loadCateFilterOptions() { // tạo các tùy chọn cho bộ lọc danh mục
    let cateFilter = document.getElementById("cate-filter");
    cateFilter.innerHTML = '<option value="All Categories">All Categories</option>'; // xoa cu thiet lap moi
    category.forEach(item => {
        let option = document.createElement("option");
        option.value = item.name; // gia tri = category name
        option.textContent = item.name; // noi dung hien thi = category name
        cateFilter.appendChild(option);
    });
}
function displayCateOpen() {
    document.getElementById("add-edit-modal-cate").style.display = "block";
    document.getElementById("modal-title-cate").innerText = "Add New Category";
    document.getElementById("cate-form").reset();
    document.getElementById("cate-form").onsubmit = displayAddNewCate;
}
function displayCloseModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}
function displayAddNewCate(event) {
    event.preventDefault(); // ngăn sự kiện form mặc định
    let name = document.getElementById("modal-cate-name").value.trim();
    let description = document.getElementById("modal-cate-des").value.trim();
    if (!name || !description) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Name or Description cannot be blank!",
        });
        return;
    }
    let exist = category.some(item => item.name.toLowerCase() === name.toLowerCase()); // khong phan biet 
    if (exist) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "This word already exist!",
        });
        return;
    }
    let newCate = {
        id: category.length + 1,
        name: name,
        description: description
    };
    category.push(newCate);
    renderCategoryList(1);
    loadCateFilterOptions();
    displayLoadCategoryOptions();
    displayCloseModal('add-edit-modal-cate');
}
function renderCategoryList(pageNum = 1, list = category) {
    currentPageCate = pageNum; // Save the current page number to currentPageCate
    let tbody = document.getElementById("vocab-list-cate");
    tbody.innerHTML = ""; // delete old data

    let startIndex = (pageNum - 1) * pageCate;
    let endIndex = startIndex + pageCate;
    let panigatedList = list.slice(startIndex, endIndex) // cut mot doan du lieu tu start toi end - 1

    panigatedList.forEach(item => { 
        let row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td>
                    <a href="#" class="action-edit" onclick="displayEditCateModal(${item.id - 1})">Edit</a>
                    <a href="#" class="action-delete" onclick="displayDeleteCateModal(${item.id - 1})">Delete</a>
                </td>
            </tr>
            `;
        tbody.innerHTML += row
    });
    displayCatePanigation();
}
function displayEditCateModal(index) {
    let item = category[index];
    document.getElementById("add-edit-modal-cate").style.display = "block";
    document.getElementById("modal-title-cate").innerText = "Edit Category" // cap nhat tieu de
    document.getElementById("modal-cate-name").value = item.name;
    document.getElementById("modal-cate-des").value = item.description;
    document.getElementById("cate-form").onsubmit = function (event) {
        event.preventDefault();
        let name = document.getElementById("modal-cate-name").value.trim();
        let description = document.getElementById("modal-cate-des").value.trim();
        if (!name || !description) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Name or Description cannot be blank!",
            })
            return;
        }
        let exist = category.some((cat, idx) => idx !== index && cat.name.toLowerCase() === name.toLowerCase())
        if (exist) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "This name already exist!",
            })
            return;
        }
        let oldName = category[index].name;
        category[index] = { // gan new object
            id: item.id,
            name: name,
            description: description
        }
        updateVocabCategories(oldName, name);
        renderCategoryList();
        renderVocabList();
        displayLoadCategoryOptions();
        displayCloseModal('add-edit-modal-cate');
    }
}
function displayDeleteCateModal(index) {
    document.getElementById("modal-dele-cate").style.display = "block";
    document.getElementById("submit-cate").onclick = function () {
        let cate = category[index].name;
        deleteVocabByCategory(cate);
        category.splice(index, 1)
        category.forEach((item, i) => item.id = i + 1);
        renderCategoryList();
        renderVocabList();
        displayLoadCategoryOptions();
        loadCateFilterOptions();
        displayCloseModal('modal-dele-cate');
    }
}
function displaySearchCate() {
    let searchCate = document.getElementById("search-cate").value.toLowerCase();
    let filteredList = category.filter(item => item.name.toLowerCase().includes(searchCate)); //if item.name turn to lowercase and contain searchCate (keep it) 
    renderCategoryList(1, filteredList) // return to page 1
}
function displayCatePanigation() {
    let totalPages = Math.ceil(category.length / pageCate);
    let panigationContainer = document.getElementById("cate-panigation");

    panigationContainer.innerHTML = "";

    let prevBtn = document.createElement("button");
    prevBtn.textContent = "Previous";
    prevBtn.disabled = currentPageCate === 1; // vô hiệu hóa nếu page = 1;
    prevBtn.onclick = function () {
        if (currentPageCate > 1) {
            currentPageCate--;
            renderCategoryList(currentPageCate);
        }
    };
    panigationContainer.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
        let pageBtn = document.createElement("button");
        pageBtn.textContent = i;
        pageBtn.className = (i === currentPageCate) ? "active" : ""; // sử dụng toán tử ternary operator
        pageBtn.onclick = function () {
            currentPageCate = i;
            renderCategoryList(currentPageCate);
        };
        panigationContainer.appendChild(pageBtn);
    }

    let nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.disabled = currentPageCate === totalPages;
    nextBtn.onclick = function () {
        if (currentPageCate < totalPages) {
            currentPageCate++;
            renderCategoryList(currentPageCate);
        }
    };
    panigationContainer.appendChild(nextBtn); // them phan tu vao cuoi
}

function getCategoryList() {
    return category;
}
document.addEventListener("DOMContentLoaded", function () {
    renderCategoryList();
    loadCateFilterOptions()
    renderVocabList();
});
