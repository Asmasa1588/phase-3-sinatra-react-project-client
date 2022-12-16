import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BookList } from "./BookList";
import { Book } from "./Book";
const router = createBrowserRouter([
  {
    path: "/",
    element: <BookList />,
  },
  {
    path: "/book/:id",
    element: <Book />,
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
