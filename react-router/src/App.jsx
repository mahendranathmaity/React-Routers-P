import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router";
import { useState } from "react";
import { StudentContext } from "./context/StudentContext";

function App() {
  const [students, setStudents] = useState([]);
  const [selectedStudentRoll, setSelectedStudentRoll] = useState(0);

  return (
    <>
      <StudentContext.Provider
        value={{
          students,
          setStudents,
          selectedStudentRoll,
          setSelectedStudentRoll,
        }}
      >
        <RouterProvider router={router} />
      </StudentContext.Provider>
    </>
  );
}

export default App;
