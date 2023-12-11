const myLibrary = [{title: 'Harry Potter', author: 'JK Rowling', read: 0}, 
                    {title: 'Lord of the Rings', author: 'Tolkien', read: 1}];

function Book(title, author, read = 0) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.read = read;
}

function addBookToLibrary() {
  // do stuff here
    const libraryDiv = document.querySelector('.library');

    myLibrary.forEach(obj => {

        let newBookDiv = document.createElement('div');
        newBookDiv.classList.add('book-card');

        let bookTitle = document.createElement('p');
        let bookAuthor = document.createElement('p');
        let bookRead = document.createElement('p');

        bookTitle.textContent = `Title: ${obj.title}`;
        bookAuthor.textContent = `Author: ${obj.author}`;
        
        if (obj.read === 1) {
            bookRead.textContent = 'Read: Yes';
            bookRead.classList.add('read-yes');
        }
        else {
            bookRead.textContent = 'Read: No';
            bookRead.classList.add('read-no');
        }

        newBookDiv.appendChild(bookTitle);
        newBookDiv.appendChild(bookAuthor);
        newBookDiv.appendChild(bookRead);

        libraryDiv.appendChild(newBookDiv);
    });

}

addBookToLibrary();