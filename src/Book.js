import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState();
  const [showCreateReviewForm, setShowCreateReviewForm] = useState(false);
  const initialCreateReviewFormState = {
    review: "",
  };
  const [createReviewForm, setCreateReviewForm] = useState(
    initialCreateReviewFormState
  );
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
              return (
                <div key={review.id}>
                  <p>
                    {review.review}
                    <button
                      onClick={() => {
                        fetch(`http://localhost:9292/reviews/${review.id}`, {
                          method: "DELETE",
                        })
                          .then((res) => res.json())
                          .then(() => {
                            fetch(`http://localhost:9292/books/${id}`)
                              .then((res) => res.json())
                              .then((receivedBook) => {
                                setBook(receivedBook);
                              });
                          });
                      }}
                    >
                      Delete
                    </button>
                  </p>
                </div>
              );
            })}
            <div>
              <button
                onClick={() => {
                  setShowCreateReviewForm(true);
                }}
              >
                Add a Review
              </button>
              {showCreateReviewForm && (
                <form
                  onChange={(event) => {
                    setCreateReviewForm((prev) => ({
                      ...prev,
                      [event.target.name]: event.target.value,
                    }));
                  }}
                  onSubmit={(event) => {
                    event.preventDefault();
                    console.log({ createReviewForm });
                    fetch(`http://localhost:9292/reviews/${id}`, {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(createReviewForm),
                    })
                      .then((res) => res.json())
                      .then((createdReview) => {
                        fetch(`http://localhost:9292/books/${id}`)
                          .then((res) => res.json())
                          .then((receivedBook) => {
                            setBook(receivedBook);
                          });
                        // setBooks((prev) => [...prev, createdBook]);
                        setCreateReviewForm(initialCreateReviewFormState);
                        setShowCreateReviewForm(false);
                      });
                  }}
                >
                  <label>Review</label>
                  <input name="review" />
                  <button type="submit">Submit</button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
