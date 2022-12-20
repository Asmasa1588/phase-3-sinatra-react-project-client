import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const Review = () => {
  const { bookId, reviewId } = useParams();
  const [review, setReview] = useState("");
  useEffect(() => {
    fetch(`http://localhost:9292/reviews/${reviewId}`)
      .then((res) => res.json())
      .then((receivedReview) => {
        setReview(receivedReview.review);
      });
  }, [reviewId]);
  return (
    <div>
      <h2>Edit Review</h2>
      <input
        value={review}
        onChange={(event) => {
          setReview(event.target.value);
        }}
      />
      <button
        onClick={() => {
          fetch(`http://localhost:9292/reviews/${reviewId}`, {
            method: "PATCH",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ review }),
          })
            .then((res) => res.json())
            .then(() => {
              //in case we need to do stuff after updating the review
            });
        }}
      >
        Edit
      </button>
      <Link to={`/book/${bookId}`}>Go back to the review's books</Link>
    </div>
  );
};
