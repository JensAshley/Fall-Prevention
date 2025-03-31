import React from "react";
import { Card, Container, Row, Col, Table } from "react-bootstrap";
import MedicationTable from "../../components/MedicationTable";
import MentalHealthTable from "../../components/MentalHealthTable";

const Summary = ({ values, submitForm }: any) => {
  const {
    patient_info,
    emergency_contact,
    evaluation,
    steadi_evaluation,
    key_questions,
    brochure,
    other_evaluation,
  } = values;

  const renderFields = (fields: { label: string; value: any }[]) => (
    <Row>
      {fields.map((field, index) => (
        <Col key={index} className="col-md-4">
          <p>
            <strong>{field.label}:</strong> {field.value}{" "}
          </p>
        </Col>
      ))}
    </Row>
  );

  const renderScreeningTable = () => {
    if (!steadi_evaluation.screening_tool) {
      return <p>No screening tools are selected.</p>;
    }

    const questions =
      steadi_evaluation.screening_tool === "key_questions"
        ? [
            {
              label: "Has the patient fallen in the past year?",
              value: key_questions.fall_last_year,
            },
            {
              label: "How many times has the patient fallen in the past year?",
              value: key_questions.fall_count,
            },
            {
              label: "Were the patient injured?",
              value: key_questions.injured,
            },
            {
              label: "Do they feel unsteady when standing or walking?",
              value: key_questions.unsteady,
            },
            {
              label: "Do they worry about falling?",
              value: key_questions.worry_falling,
            },
          ]
        : [
            {
              label: "I have fallen in the past year.",
              value: brochure.fallen_past_year,
            },
            {
              label:
                "I use or have been advised to use a cane or walker to get around safely.",
              value: brochure.use_cane_walker,
            },
            {
              label: "Sometimes I feel unsteady when I am walking.",
              value: brochure.unsteady,
            },
            {
              label:
                "I steady myself by holding onto furniture when walking at home.",
              value: brochure.hold_furniture,
            },
            {
              label: "I am worried about falling.",
              value: brochure.worry_falling,
            },
            {
              label: "I need to push with my hands to stand up from a chair.",
              value: brochure.push_hand,
            },
            {
              label: "I have some trouble stepping up onto a curb.",
              value: brochure.trouble_step,
            },
            {
              label: "I often have to rush to the toilet.",
              value: brochure.rush_toilet,
            },
            {
              label: "I have lost some feeling in my feet.",
              value: brochure.lost_feeling,
            },
            {
              label:
                "I take medicine that sometimes makes me feel light-headed or more tired than usual.",
              value: brochure.light_headed,
            },
            {
              label: "I take medicine to help me sleep or improve my mood.",
              value: brochure.take_meds,
            },
            {
              label: "I often feel sad or depressed.",
              value: brochure.feel_sad,
            },
          ];

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <td>{question.label}</td>
              <td>{question.value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const renderPatientInfo = () => (
    <Card style={{ border: "1px solid #3569CE" }} className="mt-4">
      <Card.Body>
        <Card.Title>Patient Information</Card.Title>
        {renderFields([
          { label: "First Name", value: patient_info.first_name },
          { label: "Last Name", value: patient_info.last_name },
          {
            label: "Date of Birth",
            value: new Date(patient_info.birthday).toLocaleDateString(),
          },
          { label: "Age", value: patient_info.age },
          { label: "Gender", value: patient_info.gender },
          { label: "Phone Number", value: patient_info.phone },
          { label: "Email", value: patient_info.email },
          { label: "Home Address", value: patient_info.address },
        ])}
      </Card.Body>
    </Card>
  );

  const renderEmergencyContact = () => (
    <Card style={{ border: "1px solid #3569CE" }} className="mt-4">
      <Card.Body>
        <Card.Title>Emergency Contact</Card.Title>
        {renderFields([
          { label: "First Name", value: emergency_contact.first_name },
          { label: "Last Name", value: emergency_contact.last_name },
          { label: "Relationship", value: emergency_contact.relationship },
          { label: "Contact Number", value: emergency_contact.phone },
          { label: "Email", value: emergency_contact.email },
        ])}
      </Card.Body>
    </Card>
  );

  const renderSteadiEvaluation = () => (
    <Card style={{ border: "1px solid #3569CE" }} className="mt-4">
      <Card.Body>
        <Card.Title>STEADI Evaluation</Card.Title>
        {renderFields([
          {
            label: "Date Entry",
            value: new Date(evaluation.evaluation_date).toLocaleDateString(),
          },
          {
            label: "Selected Screening Tool",
            value:
              steadi_evaluation.screening_tool === "key_questions"
                ? "3 Key Questions"
                : steadi_evaluation.screening_tool === "brochure"
                ? "Brochure"
                : "No screening tools are selected",
          },
          {
            label: "Risk Score",
            value: evaluation.final_risk_score,
          },
        ])}
        <Card style={{ border: "1px solid #165555" }} className="mt-2">
          <Card.Body>
            <Card.Title>Screening</Card.Title>
            {renderScreeningTable()}
          </Card.Body>
        </Card>
        <Card style={{ border: "1px solid #165555" }} className="mt-2">
          <Card.Body>
            <Card.Title>Assessment</Card.Title>
            <Card style={{ border: "1px solid #B4D1CD" }} className="mt-2">
              <Card.Body>
                <Card.Title>Gait, Strength, & Balance Evaluation</Card.Title>
                {renderFields([
                  {
                    label: "Fall Risk Assessment",
                    value: steadi_evaluation.risk_assess,
                  },
                ])}
                {steadi_evaluation.risk_assess === "Timed Up & Go (TUG)" && (
                  <p>
                    <strong>Time:</strong> {steadi_evaluation.tug_test?.time}{" "}
                    seconds
                  </p>
                )}
                {steadi_evaluation.risk_assess === "30-Second Chair Stand" && (
                  <p>
                    <strong>Number of Stands:</strong>{" "}
                    {steadi_evaluation.chair_stand_test?.stands}
                  </p>
                )}
                {steadi_evaluation.risk_assess === "4-Stage Balance Test" && (
                  <>
                    <p>
                      <strong>Side-by-Side Stand:</strong>{" "}
                      {steadi_evaluation.balance_test?.side_by_side} seconds
                    </p>
                    <p>
                      <strong>Semi-Tandem Stand:</strong>{" "}
                      {steadi_evaluation.balance_test?.semi_tandem} seconds
                    </p>
                    <p>
                      <strong>Tandem Stand:</strong>{" "}
                      {steadi_evaluation.balance_test?.tandem} seconds
                    </p>
                    <p>
                      <strong>One-Foot Stand:</strong>{" "}
                      {steadi_evaluation.balance_test?.one_foot} seconds
                    </p>
                  </>
                )}
              </Card.Body>
            </Card>
            <Card style={{ border: "1px solid #B4D1CD" }} className="mt-2">
              <Card.Body>
                <Card.Title>Medication Details</Card.Title>
                <MedicationTable
                  medicationDetails={steadi_evaluation.medication_details}
                  readOnly
                />
              </Card.Body>
            </Card>
            <Card style={{ border: "1px solid #B4D1CD" }} className="mt-2">
              <Card.Body>
                <Card.Title>Mental Health Details</Card.Title>
                <MentalHealthTable
                  mentalHealthDetails={steadi_evaluation.mental_health_details}
                  readOnly
                />
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>
      </Card.Body>
    </Card>
  );

  const renderOtherEvaluation = () => (
    <Card style={{ border: "1px solid #3569CE" }} className="mt-4">
      <Card.Body>
        <Card.Title>Other Evaluation</Card.Title>
        {renderFields([
          {
            label: "Date Entry",
            value: new Date(evaluation.evaluation_date).toLocaleDateString(),
          },
          { label: "Fall Risk Score", value: other_evaluation.risk_assess },
          { label: "Risk Score", value: other_evaluation.risk_score },
          {
            label: "Additional Evaluation",
            value: other_evaluation.additional_evaluation,
          },
        ])}
      </Card.Body>
    </Card>
  );

  // Structure of the Summary Page
  return (
    <Container>
      <h2>Summary</h2>
      {renderPatientInfo()}
      {renderEmergencyContact()}
      {evaluation.selected_algorithm === "STEADI"
        ? renderSteadiEvaluation()
        : renderOtherEvaluation()}
    </Container>
  );
};

export default Summary;
