import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";

const PageTwo = ({ handleFormData, values, submitForm }: any) => {
  return (
    <>
      <h2>Emergency Contact</h2>
      <Form onSubmit={submitForm}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="John"
                defaultValue={values.first_name}
                onChange={handleFormData("emergency_contact", "first_name")}
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
                onChange={handleFormData("emergency_contact", "last_name")}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Relationship</Form.Label>
              <Form.Control
                type="text"
                defaultValue={values.relationship}
                onChange={handleFormData("emergency_contact", "relationship")}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="tel"
                defaultValue={values.phone}
                onChange={handleFormData("emergency_contact", "phone")}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="tel"
                defaultValue={values.email}
                onChange={handleFormData("emergency_contact", "email")}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default PageTwo;
