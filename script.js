let myLibrary = [];

function Book(title, author, read = 0) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.read = read;
};

function addBookToLibrary() {
  // do stuff here
    const libraryDiv = document.querySelector('.library');

    libraryDiv.textContent = '';

    myLibrary.forEach(obj => {

        let newBookDiv = document.createElement('div');
        newBookDiv.classList.add('book-card');

        let bookTitle = document.createElement('p');
        let bookAuthor = document.createElement('p');
        let bookRead = document.createElement('p');
        let readButton = document.createElement('button');
        let removeButton = document.createElement('button');

        bookTitle.classList.add('book-title');

        readButton.classList.add('toggle-read');
        readButton.textContent = 'Toggle Read';

        removeButton.classList.add('remove-book');
        removeButton.textContent = 'Remove Book';

        bookTitle.textContent = `Title: ${obj.title}`;
        bookAuthor.textContent = `Author: ${obj.author}`;
        
        if (obj.read == 1) {
            bookRead.textContent = 'Read: Yes';
            bookRead.classList.add('read-yes');
            bookRead.classList.add('read-status');
        }
        else {
            bookRead.textContent = 'Read: No';
            bookRead.classList.add('read-no');
            bookRead.classList.add('read-status');
        }

        newBookDiv.appendChild(bookTitle);
        newBookDiv.appendChild(bookAuthor);
        newBookDiv.appendChild(bookRead);
        newBookDiv.appendChild(readButton);
        newBookDiv.appendChild(removeButton);

        libraryDiv.appendChild(newBookDiv);

    });

};

const dialogButton = document.querySelector('.add-book-button');
const dialogForm = document.querySelector('.dialog');
const submitForm = document.querySelector('.submit-form');
const cancelForm = document.querySelector('.cancel-form');

dialogButton.addEventListener('click', () => {

    dialogForm.showModal();

});

submitForm.addEventListener('click', (event) => {

    event.preventDefault();

    let formTitle = document.querySelector('#title');
    let formAuthor = document.querySelector('#author');
    let formRead = document.querySelector('#read');

    if (isValidForm(formTitle) && isValidForm(formAuthor) && isValidForm(formRead)) {
        let newBook = new Book(formTitle.value, formAuthor.value, formRead.value);
        myLibrary.push(newBook);
        addBookToLibrary();
        dialogForm.close();
    } else {
        alert('Invalid inputs. Please check your title and author for special characters. The Read input should be either 1 or 0.');
    }

});


function isValidForm(inputElement) {
    const pattern = new RegExp(inputElement.pattern);
    return pattern.test(inputElement.value);
}

cancelForm.addEventListener('click', (event) => {

    event.preventDefault();

    addBookToLibrary();

    dialogForm.close();

});


document.querySelector('.library').addEventListener('click', (event) => {

    const target = event.target;

    if (target.classList.contains('toggle-read')) {

        const bookCard = target.closest('.book-card');
        const readStatus = bookCard.querySelector('.read-status');

        if (readStatus.classList.contains('read-yes')) {

            readStatus.textContent = 'Read: No';
            readStatus.classList.replace('read-yes', 'read-no');

        } else {

            readStatus.textContent = 'Read: Yes';
            readStatus.classList.replace('read-no', 'read-yes');

        }
    }

    if (target.classList.contains('remove-book')) {

        const bookCard = target.closest('.book-card');
        const bookTitle = bookCard.querySelector('.book-title').textContent.slice(7);

        myLibrary = myLibrary.filter(book => book.title !== bookTitle);

        addBookToLibrary();
    }
});