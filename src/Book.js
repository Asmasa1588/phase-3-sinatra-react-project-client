import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState();
  useEffect(() => {
    fetch(`http://localhost:9292/books/${id}`)
      .then((res) => res.json())
      .then((receivedBook) => {
        setBook(receivedBook);
      });
  }, [id]);
  return (
    <div>
      <Link to={`/`}>Back</Link>
      {book && (
        <div>
          <div>
            <div>Title: {book.title}</div>
            <div>Year: {book.year}</div>
            <div>Author: {book.author}</div>
            <div>Pages: {book.pages}</div>
          </div>
          <div>
            <h2>Reviews:</h2>
            {(book.reviews || []).map((review) => {
              return <p key={review.id}>{review.review}</p>;
            })}
          </div>
        </div>
      )}
    </div>
  );
};
