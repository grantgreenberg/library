class Book {
    constructor(title, author, read = false) {
        this.title = title;
        this.author = author;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBookByTitle(title) {
        this.books = this.books.filter(book => book.title !== title);
    }

    displayBooks(libraryDiv) {
        libraryDiv.textContent = '';

        this.books.forEach(book => {
            const newBookDiv = document.createElement('div');
            newBookDiv.classList.add('book-card');

            const elements = [
                {
                    tag: 'p',
                    class: 'book-title',
                    text: `Title: ${book.title}`
                },
                {
                    tag: 'p',
                    text: `Author: ${book.author}`
                },
                {
                    tag: 'p',
                    class: book.read ? 'read-yes' : 'read-no',
                    text: `Read: ${book.read ? 'Yes' : 'No'}`,
                    statusClass: 'read-status'
                },
                {
                    tag: 'button',
                    class: 'toggle-read',
                    text: 'Toggle Read'
                },
                {
                    tag: 'button',
                    class: 'remove-book',
                    text: 'Remove Book'
                },
            ];

            elements.forEach(({ tag, class: className, text, statusClass }) => {
                const element = document.createElement(tag);
                element.classList.add(className);
                element.textContent = text;

                if (statusClass) {
                    element.classList.add(statusClass);
                }

                newBookDiv.appendChild(element);
            });

            libraryDiv.appendChild(newBookDiv);
        });
    }
}

class DisplayController {
    constructor(library, libraryDiv, dialogButton, dialogForm, submitForm, cancelForm) {
        this.library = library;
        this.libraryDiv = libraryDiv;
        this.dialogButton = dialogButton;
        this.dialogForm = dialogForm;
        this.submitForm = submitForm;
        this.cancelForm = cancelForm;

        this.dialogButton.addEventListener('click', () => {
            this.dialogForm.showModal();
        });

        this.submitForm.addEventListener('click', (event) => {
            event.preventDefault();
            this.handleFormSubmission();
        });

        this.cancelForm.addEventListener('click', (event) => {
            event.preventDefault();
            this.refreshLibrary();
            this.dialogForm.close();
        });

        this.libraryDiv.addEventListener('click', (event) => {
            this.handleBookCardClick(event);
        });
    }

    handleFormSubmission() {
        const formTitle = document.querySelector('#title');
        const formAuthor = document.querySelector('#author');
        const formRead = document.querySelector('#read');

        if (isValidForm(formTitle) && isValidForm(formAuthor) && isValidForm(formRead)) {
            const newBook = new Book(formTitle.value, formAuthor.value, formRead.checked);
            this.library.addBook(newBook);
            this.refreshLibrary();
            this.dialogForm.close();
        } else {
            alert('Invalid inputs. Please check your title and author for special characters.');
        }
    }

    handleBookCardClick(event) {
        const target = event.target;

        if (target.classList.contains('toggle-read')) {
            // Code for toggling read status
            const bookCard = target.closest('.book-card');
            const readStatus = bookCard.querySelector('.read-status');
            const bookTitle = bookCard.querySelector('.book-title').textContent.slice(7);

            const book = this.library.books.find(book => book.title === bookTitle);

            if (book) {
                book.toggleRead();
                this.refreshLibrary();
            }
        }

        if (target.classList.contains('remove-book')) {
            // Code for removing a book
            const bookCard = target.closest('.book-card');
            const bookTitle = bookCard.querySelector('.book-title').textContent.slice(7);
            this.library.removeBookByTitle(bookTitle);
            this.refreshLibrary();
        }
    }

    refreshLibrary() {
        this.library.displayBooks(this.libraryDiv);
    }
}

const myLibrary = new Library();
const libraryDiv = document.querySelector('.library');
const dialogButton = document.querySelector('.add-book-button');
const dialogForm = document.querySelector('.dialog');
const submitForm = document.querySelector('.submit-form');
const cancelForm = document.querySelector('.cancel-form');

const displayController = new DisplayController(myLibrary, libraryDiv, dialogButton, dialogForm, submitForm, cancelForm);
displayController.refreshLibrary();

function isValidForm(inputElement) {
    const pattern = new RegExp(inputElement.pattern);
    return pattern.test(inputElement.value);
}
