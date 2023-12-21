const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.isRead = isRead;
  this.pages = pages;
}

function createCard(book, index) {
  const card = document.createElement("div");
  card.setAttribute("class","card");
  card.setAttribute("data-value",`${index}`);
  card.innerHTML = `
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
  `;
  return card;
}

function displayBooks(){
  booksContainer.innerHTML = "";
  for(let index = 0 ; index < myLibrary.length ; index++){
    const card = createCard(myLibrary[index], index);
    booksContainer.append(card);
  }

  const isReadButtons = document.querySelectorAll(".card > .isRead-button");
  for(let isReadButton of isReadButtons){
    if(isReadButton.innerText.trim() == 'Read'){
      isReadButton.style.backgroundColor = "green";
    }
    else if(isReadButton.innerText.trim() == "Not Read"){
      isReadButton.style.backgroundColor = "red";
    }
  }
}


function addBookToLibrary(book) {
  if(book){
  myLibrary.push(book);
}
  displayBooks();

  const removeButtons = document.querySelectorAll(".card > .remove-button");
  for(let removeButton of removeButtons){
    removeButton.addEventListener("click",(e)=>{
      const index = parseInt(removeButton.parentNode.attributes["data-value"].value);  
      myLibrary.splice(index,1);
      addBookToLibrary();
    })
  }

  const readButtons = document.querySelectorAll(".card > .isRead-button");
  for(let readButton of readButtons){
    readButton.addEventListener("click",(e) => {
      if(readButton.innerText == "Read"){
        readButton.innerText = "Not Read";
        readButton.style.backgroundColor = "red";
      }
      else{
        readButton.innerText = "Read";
        readButton.style.backgroundColor = "green";
      }
    })
  }
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

  if(bookPages.value == "" || parseInt(bookPages.value) <=0){
    pagesError.innerHTML = "Pages must be a number<br> greater than 0";
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