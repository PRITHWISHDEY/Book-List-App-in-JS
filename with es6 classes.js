class Book1 {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }
}
class UI {
    addbooklist(book) {
        const body = document.getElementById("book-list");
        const row = document.createElement("tr");
        row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `
        body.appendChild(row);

    }
    showalert(msg, className) {
        const div = document.createElement("div");
        div.className = `alert ${className}`
        div.appendChild(document.createTextNode(msg));

        const container = document.querySelector(".container");
        const form = document.getElementById("book-form");
        container.insertBefore(div, form);

        setTimeout(function () {
            document.querySelector(".alert").remove();

        }, 3000)

    }
    clearoutput() {
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("isbn").value = "";
    }
    deleteBook(target) {
        if (target.className == "delete") {
            target.parentElement.parentElement.remove();
        }
    }
}

class storage {
    static getbooks() {
        let books;
        if (localStorage.getItem("Books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("Books"));
            // return books;

        }
        return books;

    }
    static displayBooks() {
        const books = storage.getbooks();
        books.forEach(function (x) {
            const ui = new UI;
            ui.addbooklist(x);


        })

    }
    static addBooks(Book) {
        let store = storage.getbooks();
        store.push(Book);

        localStorage.setItem("Books", JSON.stringify(store));

    }
    static removeBooks(isbn) {
        const books = storage.getbooks();
        books.forEach(function (x, index) {
            if (x.isbn === isbn) {
                books.splice(index, 1);
            }


        })
        localStorage.setItem("Books", JSON.stringify(books));


    }
}
document.addEventListener("DOMContentLoaded", storage.displayBooks());

document.getElementById("book-form").addEventListener("submit", function (e) {
    const title = document.getElementById("title").value,
        author = document.getElementById("author").value,
        isbn = document.getElementById("isbn").value;


    const Book = new Book1(title, author, isbn);
    const newBook = new UI();
    if (title === "" || author === "" || isbn === "") {
        newBook.showalert("Please fill all the fields", "error")
    } else {
        newBook.addbooklist(Book);
        storage.addBooks(Book);
        newBook.clearoutput();
        newBook.showalert("Book Added Sucessfully", "sucess")

    }



    e.preventDefault();


})

document.getElementById("book-list").addEventListener("click", function (e) {
    const newBook = new UI();
    newBook.deleteBook(e.target);
    storage.removeBooks(e.target.parentElement.previousElementSibling.textContent);
    newBook.showalert("Book Removed Sucessfully", "sucess")

    e.preventDefault();

})