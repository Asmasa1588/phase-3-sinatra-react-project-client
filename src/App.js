import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BookList } from "./BookList";
import { Book } from "./Book";
import { Review } from "./Review";
const router = createBrowserRouter([
  {
    path: "/",
    element: <BookList />,
  },
  {
    path: "/book/:id",
    element: <Book />,
  },
  {
    path: "/book/:bookId/review/:reviewId",
    element: <Review />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
