const library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
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

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read");
const bookName = new Book("Test", "T. T. Test", 100, "read");

// Add book on webpage
const shelf = document.querySelector(".b-shelf");
const book = document.createElement("div");
book.className = "b-book";
const add = document.querySelector(".b-shelf:nth-of-type(1) .icon-add-book");
shelf.insertBefore(book, add);

const books = document.querySelectorAll(".b-book");

window.addEventListener("click", (e) => {
    console.log(e.target);
});

for (let i = 0; i < books.length; i++) {
    const selectedBook = books[i];
    const selectedMargin = `${(i + 1) * -60}%`;
    console.log(`selectedMargin = `, selectedMargin);
    selectedBook.style.marginLeft = `${selectedMargin}`;
}
// Need to make -50% of margin on every book and -50 every other book
// Change font-size of name of book by multiply default num to number of symbols
