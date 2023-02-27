import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const BookList = () => {
  const [books, setBooks] = useState([]);
  const [showCreateBookForm, setShowCreateBookForm] = useState(false);
  const initialBookFormState = {
    author: "",
    title: "",
    year: "",
    pages: "",
  };
  const [bookForm, setBookForm] = useState(initialBookFormState);
  useEffect(() => {
    fetch("http://localhost:9292/books")
      .then((res) => res.json())
      .then((receivedBooks) => {
        setBooks(receivedBooks);
        console.log({ receivedBooks });
      });
  }, []);
  return (
    <div>
      <h1>Books List</h1>
      <div>
        {books.map((book) => {
          return (
            <div
              key={book.id}
              onClick={() => {
                console.log(book.id);
              }}
            >
              <Link to={`/book/${book.id}`}>{book.title}</Link>
            </div>
          );
        })}
      </div>
      <div className="add-book-form">
        <button
          onClick={() => {
            setShowCreateBookForm(true);
          }}
        >
          Add a New Book
        </button>
        {showCreateBookForm && (
          <form
            onChange={(event) => {
              setBookForm((prev) => {
                return { ...prev, [event.target.name]: event.target.value };
              });
            }}
            onSubmit={(event) => {
              event.preventDefault();
              console.log({ bookForm });
              fetch("http://localhost:9292/books", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(bookForm),
              })
                .then((res) => res.json())
                .then((createdBook) => {
                  setBooks((prev) => [...prev, createdBook]);
                  setBookForm(initialBookFormState);
                  setShowCreateBookForm(false);
                });
            }}
          >
            <label>Title</label>
            <input name="title" value={bookForm.title} />
            <label>Author</label>
            <input name="author" value={bookForm.author} />
            <label>Year</label>
            <input name="year" value={bookForm.year} />
            <label>Pages</label>
            <input name="pages" value={bookForm.pages} />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};
