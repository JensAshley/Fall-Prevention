import React from "react";
import { Table, Form } from "react-bootstrap";

interface QuestionTableProps {
  questions: { name: string; label: string }[];
  values: { [key: string]: string };
  handleScreeningChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const QuestionTable: React.FC<QuestionTableProps> = ({
  questions,
  values,
  handleScreeningChange,
}) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Question</th>
          <th>Yes</th>
          <th>No</th>
        </tr>
      </thead>
      <tbody>
        {questions.map((question) => (
          <tr key={question.name}>
            <td>{question.label}</td>
            {question.name === "fall_count" ? (
              <td colSpan={2} style={{ width: "100px" }}>
                <Form.Control
                  type="text"
                  name={question.name}
                  value={values[question.name]}
                  onChange={handleScreeningChange}
                />
              </td>
            ) : (
              <>
                <td>
                  <Form.Check
                    type="radio"
                    name={question.name}
                    value="yes"
                    checked={values[question.name] === "yes"}
                    onChange={handleScreeningChange}
                  />
                </td>
                <td>
                  <Form.Check
                    type="radio"
                    name={question.name}
                    value="no"
                    checked={values[question.name] === "no"}
                    onChange={handleScreeningChange}
                  />
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default QuestionTable;
