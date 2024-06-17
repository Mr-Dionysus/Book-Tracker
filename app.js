const library = [];

function Book(title, author, genre, pages, read) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.read = read;
    this.info = () => {
        return `${title} by ${author}, ${pages} pages, ${read}`;
    };
}

function addBookToLibrary(book) {
    return library.push(book);
}

function displayBooks(library) {
    for (let i = 0; i < library.length; i++) {
        // Show book on the page
    }
}

function sortBooks(library) {
    // Sort books by genre
}

const theHobbit = new Book(
    "The Hobbit",
    "J.R.R. Tolkien",
    "Fantasy",
    295,
    "not read"
);

const thinkingFastAndSlow = new Book(
    "Thinking, Fast and Slow",
    "Daniel Kahneman",
    "Non-fiction",
    499,
    "not read"
);

const test = new Book(
    "1234567890123456",
    "Author",
    "Genre",
    0,
    "read or not read"
);
// Add book on webpage

let books = document.querySelectorAll(".book");
const shelf = document.querySelector(".b-shelf");
const popUp = document.querySelector(".pop-up-menu");
const closePopUp = document.querySelector(".icon-close-pop-up");

library.push(theHobbit);
library.push(thinkingFastAndSlow);
const showNewBook = function (newBook) {
    const bottomBorderBox = document.createElement("div");
    const book = document.createElement("div");
    const h1 = document.createElement("h1");
    const add = document.querySelector(
        ".b-shelf:nth-of-type(1) .icon-add-book"
    );

    h1.innerText = newBook.title;
    const h1Length = h1.innerText.length;
    const fontSizeCoefficient = (h1Length - 15) * 0.05;
    h1.style.fontSize = `${1.2 - fontSizeCoefficient}rem`;
    bottomBorderBox.className = "b-book";
    book.className = "book";
    book.append(h1);
    bottomBorderBox.append(book);
    shelf.insertBefore(bottomBorderBox, add);
    books = document.querySelectorAll(".book");
};
showNewBook(theHobbit);
showNewBook(thinkingFastAndSlow);
showNewBook(theHobbit);
showNewBook(theHobbit);
showNewBook(theHobbit);
showNewBook(thinkingFastAndSlow);
showNewBook(thinkingFastAndSlow);
showNewBook(thinkingFastAndSlow);
showNewBook(test);

books[0].addEventListener("click", (e) => {});

window.addEventListener("click", (e) => {
    console.log(`e.target = `, e.target);
    if (e.target.className === "icon-add-book") {
        popUp.classList.remove("not-visible");
    }

    if (e.target.className === "icon-close-pop-up") {
        popUp.classList.add("not-visible");
    }

    if (e.target.className === "btn-add") {
        e.preventDefault();
        const title = document.querySelector("#title").value;
        const author = document.querySelector("#author").value;
        const genre = document.querySelector("#genre").value;
        const pages = document.querySelector("#pages").value;

        const newBook = new Book(title, author, genre, pages, "read");
        library.push(newBook);

        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#genre").value = "";
        document.querySelector("#pages").value = "";

        const bottomBorderBox = document.createElement("div");
        const book = document.createElement("div");
        const h1 = document.createElement("h1");
        const add = document.querySelector(
            ".b-shelf:nth-of-type(1) .icon-add-book"
        );

        h1.innerText = title;
        bottomBorderBox.className = "b-book";
        book.className = "book";
        book.append(h1);
        bottomBorderBox.append(book);
        shelf.insertBefore(bottomBorderBox, add);
        popUp.classList.add("not-visible");
        books = document.querySelectorAll(".book");
    }

    if (e.target.tagName === "H1" || e.target.className === "book") {
        if (e.target.parentElement.className === "book") {
            library.forEach((book) => {
                if (book.title === e.target.innerText) {
                    const hiddenBox = document.createElement("div");
                    const bBook = e.target.parentElement.parentElement;
                    const bookPopUp = document.createElement("div");

                    hiddenBox.className = "hidden-box";
                    bookPopUp.className = "book-pop-up";
                    hiddenBox.append(bookPopUp);
                    bBook.append(hiddenBox);
                    setTimeout(() => {
                        bookPopUp.style.opacity = "1";
                    }, 1);

                    console.log(
                        `e.target.parentElement.parentElement = `,
                        e.target.parentElement.parentElement
                    );

                    console.log(`e.target.tagName = `, e.target.tagName);
                }
            });
        }
    }

    if (e.target.tagName === "BODY" || e.target.className === "b-shelf") {
        const hiddenBox = document
            .querySelector(".b-book > .hidden-box")
            .remove();
    }
});

// Change font-size of name of book by multiply default num to number of symbols

const libraryWidth = window.innerWidth - 320;
const booksOnShelf = 4 + Math.floor(libraryWidth / 50);
shelf.style.gridTemplateColumns = `repeat(${booksOnShelf}, 40px)`;

window.addEventListener("resize", (e) => {
    const libraryWidth = window.innerWidth - 320;
    const booksOnShelf = 4 + Math.floor(libraryWidth / 50);
    shelf.style.gridTemplateColumns = `repeat(${booksOnShelf}, 40px)`;
});
