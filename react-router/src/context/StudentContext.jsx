import { createContext } from "react";

export const StudentContext = createContext(
  { students: [], setStudents: null, selectedStudentRoll: null, setSelectedStudentRoll: null }
);
