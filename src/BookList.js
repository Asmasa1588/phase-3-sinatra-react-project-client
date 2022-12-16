import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const BookList = () => {
  const [books, setBooks] = useState([]);
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
    </div>
  );
};
