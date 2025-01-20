import { useContext, useState } from "react";
import { Button, Table, Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../context/StudentContext";

function AllStudent() {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  const { students, setStudents, selectedStudentRoll, setSelectedStudentRoll } =
    useContext(StudentContext);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setSelectedStudentRoll(null);
    setShow(false);
  };

  const deleteHandler = (roll) => {
    setSelectedStudentRoll(roll);
    setShow(true);
  };

  const confirmDeleteHandler = () => {
    setStudents((currentStudents) => {
      let newStudent = currentStudents.filter((student) => {
        if (student.roll != selectedStudentRoll) {
          return true;
        }
      });
      return newStudent;
    });
    handleClose();
  };

  return (
    <Container>
      <div className="divider">
        <button
          className="btn btn-success addStudentButton"
          onClick={() => {
            goTo("add-student");
          }}
        >
          Add Student
        </button>
      </div>
      <div className="table-responsive">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Roll</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.roll}</td>
              <td>{student.name}</td>
              <td>{student.phone}</td>
              <td>{student.email}</td>
              <td>
                <Button
                  onClick={() => {
                    setSelectedStudentRoll(student.roll);
                    goTo("edit-student");
                  }}
                  variant="warning"
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => deleteHandler(student.roll)}
                  variant="danger"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          Do You want to update this student's Information ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            CANCEL
          </Button>
          <Button variant="primary" onClick={confirmDeleteHandler}>
            DELETE
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AllStudent;
