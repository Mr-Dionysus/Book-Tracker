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

Book.prototype.toggleRead = function () {
    switch (this.read) {
        case "Read":
            this.read = "Not Read";
            break;

        case "Not Read":
            this.read = "Read";
            break;
    }
};

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
    "Not Read"
);

const thinkingFastAndSlow = new Book(
    "Thinking, Fast and Slow",
    "Daniel Kahneman",
    "Non-fiction",
    499,
    "Read"
);

const atomicHabits = new Book(
    "Atomic Habits",
    "James Clear",
    "Self-Help",
    320,
    "Not Read"
);

const deepWork = new Book("Deep Work", "Cal Newport", "Self-Help", 137, "Read");

const gettingThingsDone = new Book(
    "Getting Things Done",
    "David Allen",
    "Self-Help",
    246,
    "Read"
);

const the4HourWorkweek = new Book(
    "The 4-Hour Workweek",
    "Timothy Ferriss",
    "Self-Help",
    308,
    "Not Read"
);

let books = document.querySelectorAll(".book");
const shelf = document.querySelector(".b-shelf");
const popUp = document.querySelector(".pop-up-menu");
const closePopUp = document.querySelector(".icon-close-pop-up");

// Show book on the screen
const showNewBook = function (newBook) {
    const bottomBorderBox = document.createElement("div");
    const book = document.createElement("div");
    const h1 = document.createElement("h1");
    const add = document.querySelector(
        ".b-shelf:nth-of-type(1) .icon-add-book"
    );

    book.dataset.order = library.length;
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

    if (newBook.read === "Read") {
        book.classList.add("book-read");
    }

    addBookToLibrary(newBook);
};

showNewBook(theHobbit);
showNewBook(thinkingFastAndSlow);
showNewBook(atomicHabits);
showNewBook(deepWork);
showNewBook(gettingThingsDone);
showNewBook(the4HourWorkweek);

window.addEventListener("click", (e) => {
    switch (e.target.className) {
        case "icon-add-book":
            popUp.classList.remove("not-visible");
            break;

        case "icon-close-pop-up":
            popUp.classList.add("not-visible");
            break;

        case "btn-add":
            e.preventDefault();
            const title = document.querySelector("#title").value;
            const author = document.querySelector("#author").value;
            const genre = document.querySelector("#genre").value;
            const pages = document.querySelector("#pages").value;

            // Add Read or Not Read info
            const read = document.querySelector("#read");
            const notRead = document.querySelector("#not-read");
            let isRead = "";
            console.log(`read = `, read);

            if (read.checked === true && notRead.checked === false) {
                isRead = read.value;
            } else if (read.checked === false && notRead.checked === true) {
                isRead = notRead.value;
            }

            const newBook = new Book(title, author, genre, pages, isRead);

            addBookToLibrary(newBook);
            showNewBook(newBook);

            document.querySelector("#title").value = "";
            document.querySelector("#author").value = "";
            document.querySelector("#genre").value = "";
            document.querySelector("#pages").value = "";

            popUp.classList.add("not-visible");
            break;
    }

    const dialog = document.querySelector("dialog");
    const deleteBook = document.querySelector(".delete-book");
    const closeDialog = document.querySelector(".close-dialog");
    const btnToggleRead = document.querySelector(".toggle-read");
    const book1 = e.target.parentElement;
    const book2 = e.target;
    const bookObj1 = library[book1.dataset.order];
    const bookObj2 = library[book2.dataset.order];

    if (
        e.target.parentElement.classList.contains("book") ||
        e.target.classList.contains("book")
    ) {
        dialog.show();
    }

    deleteBook.onclick = function () {
        if (book1.classList.contains("book")) {
            library.splice(book1.dataset.order, 1);
            book1.parentElement.remove();
        } else if (book2.classList.contains("book")) {
            library.splice(book2.dataset.order, 1);
            book2.parentElement.remove();
        }
        dialog.close();
    };

    closeDialog.onclick = function () {
        dialog.close();
    };

    btnToggleRead.onclick = function () {
        if (book1.classList.contains("book")) {
            bookObj1.toggleRead();

            switch (bookObj1.read) {
                case "Read":
                    book1.className = "book book-read";
                    break;

                case "Not Read":
                    book1.className = "book";
                    break;

                default:
                    dialog.close();
                    break;
            }
        } else if (book2.classList.contains("book")) {
            bookObj2.toggleRead();

            switch (bookObj2.read) {
                case "Read":
                    book2.className = "book book-read";
                    break;

                case "Not Read":
                    book2.className = "book";
                    break;

                default:
                    dialog.close();
                    break;
            }
        }

        dialog.close();
    };
});

window.addEventListener("mouseover", (e) => {
    if (
        (e.target.tagName === "H1" ||
            e.target.className === "book" ||
            e.target.className === "b-book") &&
        (e.target.parentElement.className === "book" ||
            e.target.parentElement.className === "book book-chosen" ||
            e.target.parentElement.className === "book book-read")
    ) {
        library.forEach((book) => {
            if (book.title === e.target.innerText) {
                const allPopUpMenu = document.querySelectorAll(".book-pop-up");
                allPopUpMenu.forEach((onePopUpMenu) => {
                    onePopUpMenu.style.opacity = "0";
                });

                const allBooks = document.querySelectorAll(".book.book-chosen");
                allBooks.forEach((oneBook) => {
                    if (oneBook.classList.contains("book-read")) {
                        oneBook.className = "book book-read";
                    } else {
                        oneBook.className = "book";
                    }
                });

                const hiddenBoxDelete = document.querySelector(
                    ".b-book > .hidden-box"
                );

                if (hiddenBoxDelete) {
                    hiddenBoxDelete.remove();
                }

                const hiddenBox = document.createElement("div");
                const bBook = e.target.parentElement.parentElement;
                const bookPopUp = document.createElement("div");

                hiddenBox.className = "hidden-box";
                bookPopUp.className = "book-pop-up";
                e.target.parentElement.classList.add("book-chosen");
                bookPopUp.style.opacity = "1";

                const bookTitle = document.createElement("span");
                bookTitle.innerHTML = book.title;
                const bookWhatTitle = document.createElement("p");
                bookWhatTitle.innerHTML = "Title: ";
                bookPopUp.append(bookWhatTitle);
                bookWhatTitle.append(bookTitle);

                const bookAuthor = document.createElement("span");
                bookAuthor.innerHTML = book.author;
                const bookWhatAuthor = document.createElement("p");
                bookWhatAuthor.innerHTML = "Author: ";
                bookPopUp.append(bookWhatAuthor);
                bookWhatAuthor.append(bookAuthor);

                const bookGenre = document.createElement("span");
                bookGenre.innerHTML = book.genre;
                const bookWhatGenre = document.createElement("p");
                bookWhatGenre.innerHTML = "Genre: ";
                bookPopUp.append(bookWhatGenre);
                bookWhatGenre.append(bookGenre);

                const bookPages = document.createElement("span");
                bookPages.innerHTML = book.pages;
                const bookHowManyPages = document.createElement("p");
                bookHowManyPages.innerHTML = "Pages: ";
                bookPopUp.append(bookHowManyPages);
                bookHowManyPages.append(bookPages);

                const bookRead = document.createElement("span");
                bookRead.innerHTML = book.read;
                const bookIsRead = document.createElement("p");
                bookIsRead.innerHTML = "Is Read: ";
                bookPopUp.append(bookIsRead);
                bookIsRead.append(bookRead);

                hiddenBox.append(bookPopUp);
                bBook.append(hiddenBox);

                setTimeout(() => {
                    bookPopUp.style.opacity = "1";
                }, 1000);
            }
        });
    }

    if (e.target.tagName === "BODY" || e.target.className === "b-shelf") {
        const hiddenBox = document.querySelector(".b-book > .hidden-box");
        if (hiddenBox) {
            setTimeout(() => {
                hiddenBox.remove();
            }, 1000);
            hiddenBox.style.opacity = "0";
        }

        const bookChosen = document.querySelector(".book.book-chosen");
        const bookChosenRead = document.querySelector(
            ".book.book-chosen.book-read"
        );

        if (bookChosenRead) {
            bookChosenRead.className = "book book-read";
        } else if (bookChosen) {
            bookChosen.className = "book";
        }
    }
});

const libraryWidth = window.innerWidth - 320;
const booksOnShelf = 4 + Math.floor(libraryWidth / 50);
shelf.style.gridTemplateColumns = `repeat(${booksOnShelf}, 40px)`;

window.addEventListener("resize", (e) => {
    const libraryWidth = window.innerWidth - 320;
    const booksOnShelf = 4 + Math.floor(libraryWidth / 50);
    shelf.style.gridTemplateColumns = `repeat(${booksOnShelf}, 40px)`;
});
