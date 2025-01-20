import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal, Container, Row, Col } from "react-bootstrap";
import { StudentContext } from "../context/StudentContext";
import { useNavigate } from "react-router-dom";

function EditStudent() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  const { setStudents, students, selectedStudentRoll } =
    useContext(StudentContext);

  useEffect(() => {
    getStudents();
  }, [selectedStudentRoll]);

  const getStudents = () => {
    const selectedStudent = students.find(
      (student) => student.roll === selectedStudentRoll
    );
    if (selectedStudent) {
      setName(selectedStudent.name);
      setEmail(selectedStudent.email);
      setPhone(selectedStudent.phone);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const updateStudent = () => {
    setShow(true);
  };

  const confirmEditHandler = () => {
    let isValid = true;
    if (!name) {
      isValid = false;
      setNameError("Enter Student Name");
    }
    if (!email) {
      isValid = false;
      setEmailError("Enter Student Email");
    }
    if (!phone) {
      isValid = false;
      setPhoneError("Enter Student Phone Number");
    }
    if (isValid) {
      setStudents((currentStudents) =>
        currentStudents.map((student) => {
          if (student.roll === selectedStudentRoll) {
            return { ...student, name, email, phone };
          }
          return student;
        })
      );
      goTo("/");
    }
    setShow(false);
    console.log("Edit Student:-",name,email,phone)
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h1 className="text-center mb-4">Edit Student</h1>
          <Form>
            <Form.Group className="mb-3" controlId="studentForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={(event) => {
                  setName(event.target.value);
                  setNameError("");
                }}
                value={name}
              />
              <Form.Text className="text-danger">{nameError}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="studentForm.ControlInput2">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                  setEmailError("");
                }}
                value={email}
              />
              <Form.Text className="text-danger">{emailError}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="studentForm.ControlInput3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                onChange={(event) => {
                  setPhone(event.target.value);
                  setPhoneError("");
                }}
                value={phone}
              />
              <Form.Text className="text-danger">{phoneError}</Form.Text>
            </Form.Group>
            <Button variant="primary" onClick={updateStudent} className="w-100">
              UPDATE
            </Button>
          </Form>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to update this student's information?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            CANCEL
          </Button>
          <Button variant="primary" onClick={confirmEditHandler}>
            UPDATE
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default EditStudent;
