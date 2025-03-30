import React, { useState } from "react";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is loaded

function App() {
  const [formData, setFormdata] = useState({
    uname: "",
    uphone: "",
    uemail: "",
    umessage: "",
    index: "",
  });

  const [userData, setUserdata] = useState([]);

  const getValue = (event) => {
    setFormdata({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const currentUserFormData = {
      uname: formData.uname,
      uphone: formData.uphone,
      uemail: formData.uemail,
      umessage: formData.umessage,
    };

    if (formData.index === "") {
      const isDuplicate = userData.some(
        (v) => v.uemail === formData.uemail || v.uphone === formData.uphone
      );

      if (isDuplicate) {
        toast.error("Email or Phone already exists");
      } else {
        setUserdata([...userData, currentUserFormData]);
        setFormdata({
          uname: "",
          uphone: "",
          uemail: "",
          umessage: "",
          index: "",
        });
      }
    } else {
      const editIndex = parseInt(formData.index, 10);
      const isDuplicate = userData.some(
        (v, i) =>
          (v.uemail === formData.uemail || v.uphone === formData.uphone) &&
          i !== editIndex
      );

      if (!isDuplicate) {
        const updatedData = [...userData];
        updatedData[editIndex] = currentUserFormData;
        setUserdata(updatedData);
        setFormdata({
          uname: "",
          uphone: "",
          uemail: "",
          umessage: "",
          index: "",
        });
      } else {
        toast.error("Email or Phone already exists");
      }
    }
  };

  const deleteRow = (index) => {
    setUserdata(userData.filter((_, i) => i !== index));
    toast.success("Data Deleted");
  };

  const editRow = (index) => {
    setFormdata({ ...userData[index], index: index.toString() });
  };

  return (
    <Container>
      <ToastContainer />
      <Container>
        <Row>
          <Col className="text-center py-5">
            <h1>Enquiry Form</h1>
          </Col>
        </Row>
        <Row>
          <Col lg={5}>
            <Form onSubmit={handleSubmit}>
              <div className="pb-3">
                <label className="form-label">Name</label>
                <input
                  name="uname"
                  onChange={getValue}
                  type="text"
                  className="form-control"
                  value={formData.uname}
                />
              </div>
              <div className="pb-3">
                <label className="form-label">Phone</label>
                <input
                  name="uphone"
                  onChange={getValue}
                  value={formData.uphone}
                  type="number"
                  className="form-control"
                />
              </div>
              <div className="pb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="uemail"
                  onChange={getValue}
                  value={formData.uemail}
                  className="form-control"
                />
              </div>
              <div className="pb-3">
                <label className="form-label">Message</label>
                <textarea
                  name="umessage"
                  onChange={getValue}
                  value={formData.umessage}
                  rows={3}
                  className="form-control"
                />
              </div>
              <button className="btn btn-primary">
                {formData.index !== "" ? "Update" : "Save"}
              </button>
            </Form>
          </Col>
          <Col lg={7}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.length > 0 ? (
                  userData.map((obj, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{obj.uname}</td>
                      <td>{obj.uphone}</td>
                      <td>{obj.uemail}</td>
                      <td>{obj.umessage}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm me-2"
                          onClick={() => deleteRow(i)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => editRow(i)}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>No Data Found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default App;
