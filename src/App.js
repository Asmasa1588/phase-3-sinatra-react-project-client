import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BookList } from "./BookList";
const router = createBrowserRouter([
  {
    path: "/",
    element: <BookList />,
  },
  {
    path: "/book",
    element: <div>Books page</div>,
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
