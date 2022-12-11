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
  return <div>Here we will list books</div>;
};
