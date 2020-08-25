// book constructor
function book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;

}

function UI() {

}
UI.prototype.addbooklist = function (book) {
    // console.log(book);
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
UI.prototype.showalert = function (msg, className) {
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
UI.prototype.clearoutput = function () {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
}
UI.prototype.deleteBook = function (target) {
    if (target.className == "delete") {
        target.parentElement.parentElement.remove();
    }

}

document.getElementById("book-form").addEventListener("submit", function (e) {
    const title = document.getElementById("title").value,
        author = document.getElementById("author").value,
        isbn = document.getElementById("isbn").value;


    const Book = new book(title, author, isbn);
    const newBook = new UI();
    if (title === "" || author === "" || isbn === "") {
        newBook.showalert("Please fill all the fields", "error")
    } else {
        newBook.addbooklist(Book);
        newBook.clearoutput();
        newBook.showalert("Book Added Sucessfully", "sucess")

    }



    e.preventDefault();


})

document.getElementById("book-list").addEventListener("click", function (e) {
    const newBook = new UI();
    newBook.deleteBook(e.target);
    newBook.showalert("Book Removed Sucessfully", "sucess")

    e.preventDefault();

})