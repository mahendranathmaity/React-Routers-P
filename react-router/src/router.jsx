import { createBrowserRouter } from "react-router-dom";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";
import AllStudent from "./components/AllStudent";

const routes = [
  {
    path: "/",
    element: <AllStudent />,
  },
  {
    path: "/add-student",
    element: <AddStudent />,
  },
  {
    path: "/edit-student",
    element: <EditStudent />,
  },
];
const router = createBrowserRouter(routes);

export default router;
