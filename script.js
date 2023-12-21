const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.isRead = isRead;
  this.pages = pages;
}

function createCard(book, index) {
  const card = document.createElement("div");
  card.innerHTML = `
  <div class="card" data-value="${index}">
    <div class="title-div">
      <h3>Title:</h3>
      <p>${book.title}</p>
    </div>
    <div class="author-div">
      <h3>Author:</h3>
      <p>${book.author}</p>
    </div>
    <div class="pages-div">
      <h3>Pages:</h3>
      <p>${book.pages}</p>
    </div>
    <button class="isRead-button">${
      book.isRead == true ? "Read" : "Not Read"
    }</button>
    <button class="remove-button">Remove</button>
  </div>
  `;
  return card;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  booksContainer.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const card = createCard(book, index);
    booksContainer.append(card);
  });
}

function validateForm(){
  let isValid = true;

  if(bookTitle.value.trim() == '' || bookTitle.value == null){
    titleError.innerText = "Title Cannot be empty";
    isValid = false;
  }

  if(bookAuthor.value.trim() == "" || bookAuthor.value == null){
    authorError.innerText = "Author Cannot be empty";
    isValid = false;
  }

  if(bookPages.value == "" || bookPages.value == null || isNaN(bookPages.value) || parseInt(bookPages.value) <=0){
    pagesError.innerText = "Pages must be greater than 0";
    isValid = false;
  }

  return isValid;
}

const booksContainer = document.querySelector("#books-container");
const dialog = document.querySelector("dialog");
const addBook = document.querySelector(".add-book");
const submit = document.querySelector("#submit");
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const titleError = document.querySelector("#titleError");
const authorError = document.querySelector("#authorError");
const pagesError = document.querySelector("#pagesError");
const bookRead = document.querySelector("#is-read");
const form = document.querySelector("form");


addBook.addEventListener("click", (e) => {
  dialog.showModal();
});

submit.addEventListener("click", (e) => {
  const title = bookTitle.value;
  const author = bookAuthor.value;
  const pages = bookPages.value;
  const isRead = bookRead.checked;

  titleError.innerText = '';
  authorError.innerText = '';
  pagesError.innerText = '';

  if(validateForm()){
    const book = new Book(title, author, pages, isRead);
    addBookToLibrary(book);
    form.reset();
    dialog.close();
  }
  else{
    e.preventDefault();
  }
});
