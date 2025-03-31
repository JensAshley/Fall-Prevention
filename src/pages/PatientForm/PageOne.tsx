import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";

// Define the step components for each section of the form
const PageOne = ({ handleFormData, values, submitForm }: any) => {
  return (
    <>
      <h2>Patient Information</h2>
      <Form onSubmit={submitForm}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="John"
                defaultValue={values.first_name}
                onChange={handleFormData("patient_info", "first_name")}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Doe"
                defaultValue={values.last_name}
                onChange={handleFormData("patient_info", "last_name")}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <br></br>
              {/* Fixed DatePicker */}
              <DatePicker
                // selected={values.birthday}
                selected={
                  values.birthday && !isNaN(new Date(values.birthday).getTime())
                    ? new Date(values.birthday)
                    : null
                }
                onChange={(date: Date) =>
                  handleFormData(
                    "patient_info",
                    "birthday"
                  )({
                    target: { value: date },
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                defaultValue={values.age}
                onChange={handleFormData("patient_info", "age")}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                defaultValue={values.gender}
                onChange={handleFormData("patient_info", "gender")}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                defaultValue={values.phone}
                onChange={handleFormData("patient_info", "phone")}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                defaultValue={values.email}
                onChange={handleFormData("patient_info", "email")}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Home Address</Form.Label>
              <Form.Control
                type="tel"
                defaultValue={values.address}
                onChange={handleFormData("patient_info", "address")}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default PageOne;
