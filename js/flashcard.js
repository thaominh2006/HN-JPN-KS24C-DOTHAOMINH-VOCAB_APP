let flashcard = [
    {
        word: "Cat",
        meaning: "Con mèo",
        category: "Animals",
        learned: false
    },
    {
        word: "Dog",
        meaning: "Con chó",
        category: "Animals",
        learned: false
    },
    {
        word: "Bird",
        meaning: "Con chim",
        category: "Animals",
        learned: false
    },
    {
        word: "Pig",
        meaning: "Con lợn",
        category: "Animals",
        learned: false
    },
    {
        word: "Dinosaur",
        meaning: "Con khủng long",
        category: "Animals",
        learned: false
    },
    {
        word: "Snake",
        meaning: "Con rắn",
        category: "Animals",
        learned: false
    },
]
let currentIndex = 0; // luu vi tri hien tai trong mang flashcard
let learnedWord = []; // luu tru cac tu da duoc danh dau da hoc
function displayLoad(){ // hien thi the tieng anh
    let flashCard = flashcard[currentIndex];
    document.querySelector('.flashcard-front p').textContent = flashCard.meaning;
    document.querySelector('.flash-back p').textContent = flashCard.word;
}
document.querySelector('.previous-btn').addEventListener("click", function(){ // nut quay lai
    if(currentIndex > 0){
        currentIndex--;
        displayLoad();
    }
});
document.querySelector('.next-btn').addEventListener("click", function(){ // nut tiep tuc
    if(currentIndex < flashcard.length - 1){
        currentIndex++;
        displayLoad()
    }
});
document.querySelector('.mark-btn').addEventListener("click", function(){ // nut danh dau da hoc
    let card = flashcard[currentIndex];
    card.learned = !card.learned; // đảo ngược trạng thái bài học (false => true/true => false)
    if(card.learned){ // nếu true: 
        if(!learnedWord.find(item => item.word === card.word)){ // kiểm tra xem từ đã tồn tại trong dsach từ đã học chưa
            learnedWord.push(card); // push thêm vào danh sách từ đã học bên dưới
            Swal.fire({
                title: "This vocabulary has been marked as learned!",
                icon: "success",
                draggable: true
            });
        }
    }else{ // nếu false: xóa từ khỏi learnedWord
        learnedWord = learnedWord.filter(word => word.word !== card.word);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "This word already have in the list!",
        });
    }
    displayProgress();
    displayWordList();
});
function displayProgress(){ // hien thi tien do hoc
    let total = flashcard.length; // tong so luong tu co trong flashcard
    let count = flashcard.filter(item => item.learned).length; // loc nhung tu da hoc bang trang thai learned la true
    let percentage = (count / total) * 100; // so % tren thanh dai se bang tong so tu da hoc/tong so tu co trong flashcard va * 100
    document.querySelector('.progress-count p:last-child').textContent = `${count}/${total}`; // print ra
    document.querySelector('.yellow-percent').style.width = `${percentage}%`; // print ra
}
function displayWordList(){ // hien thi danh sach tu da hoc
    let tbody = document.querySelector('.flash-list');
    tbody.innerHTML = ""; //
    learnedWord.forEach(word => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${word.meaning}</td>
            <td>${word.word}</td>
            <td>Learned</td>
        `;
        tbody.appendChild(row);
    })
}
let flip = document.querySelector('.flip-inner'); // khi click vao card thi se hien ra nghia tieng viet o mat sau
let isFlip = false; // mat truoc la false, mat sau la true
document.querySelector('.flip-card').addEventListener("click", function(){
    isFlip = !isFlip; // dao nguoc i nhu o tren
    flip.style.transform = isFlip ? "rotateY(180deg)" : "rotateY(0deg)";
})