import { useContext, useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../context/StudentContext";

function AddStudent() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const { setStudents } = useContext(StudentContext);

  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  const addStudent = () => {
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
      setStudents((currentStudents) => {
        const newStudent = {
          roll: currentStudents.length + 1,
          name,
          email,
          phone,
        };
        return [...currentStudents, newStudent];
      });
      handleClose();
      goTo("/");
    }
    console.log("Add Student :-",name,email,phone);
    
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setPhone("");
    setNameError("");
    setEmailError("");
    setPhoneError("");
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h1 className="text-center mb-4">Add Student</h1>
          <Form>
            <Form.Group className="mb-3" controlId="studentForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
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
                placeholder="email@example.com"
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
                placeholder="Enter Your Phone Number"
                onChange={(event) => {
                  setPhone(event.target.value);
                  setPhoneError("");
                }}
                value={phone}
              />
              <Form.Text className="text-danger">{phoneError}</Form.Text>
            </Form.Group>
            <Button variant="primary" onClick={addStudent} className="w-100">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddStudent;
