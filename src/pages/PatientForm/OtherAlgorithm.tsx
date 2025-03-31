import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const OtherAlgorithm = ({
  handleFormData,
  otherValues,
  fallRiskAssessment,
}: any) => {
  return (
    <>
      {/* Fall Risk Score Selection */}
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Fall Risk Assessment</Form.Label>
            <Form.Select
              value={otherValues.risk_assess}
              onChange={handleFormData("other_evaluation", "risk_assess")}
            >
              <option value="">Select...</option>
              {fallRiskAssessment.map((assessment: string, index: number) => (
                <option key={index} value={assessment}>
                  {assessment}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Risk Score</Form.Label>
            <Form.Control
              type="number"
              defaultValue={otherValues.risk_score}
              onChange={handleFormData("other_evaluation", "risk_score")}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Additional Evaluation */}
      <Form.Group className="mb-3">
        <Form.Label>Additional Evaluation</Form.Label>
        <Form.Control
          name="additional_evaluation"
          as="textarea"
          rows={3}
          placeholder="Additional Evaluation"
          defaultValue={otherValues.additional_evaluation}
          onChange={handleFormData("other_evaluation", "additional_evaluation")}
        />
      </Form.Group>
    </>
  );
};

export default OtherAlgorithm;
