import { useEffect, useState } from "react";

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
          return <div key={book.id}> {book.title} </div>;
        })}
      </div>
    </div>
  );
};
