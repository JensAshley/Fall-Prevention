/**
 * MentalHealthTable component renders a table displaying mental health conditions.
 * Supports both read-only and editable modes.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.mentalHealthDetails - Array of mental health conditions.
 * @param {Function} props.handleDetailChange - Function to handle changes in the details.
 * @param {boolean} props.readOnly - Flag to determine if the table is in read-only mode.
 *
 * @returns {JSX.Element} The rendered table component.
 */
import React from "react";
import { Table, Form } from "react-bootstrap";

const MentalHealthTable = ({
  mentalHealthDetails,
  handleDetailChange,
  readOnly,
}: any) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Condition</th>
          <th>Diagnosis Date</th>
          <th>Comments</th>
        </tr>
      </thead>
      <tbody>
        {mentalHealthDetails.map(
          (
            detail: {
              condition: string;
              diagnosisDate: string;
              comments: string;
            },
            index: number
          ) => (
            <tr key={index}>
              <td>
                {readOnly ? (
                  detail.condition || "N/A"
                ) : (
                  <Form.Control
                    type="text"
                    value={detail.condition}
                    onChange={(e) =>
                      handleDetailChange(
                        "mentalHealth",
                        index,
                        "condition",
                        e.target.value
                      )
                    }
                  />
                )}
              </td>
              <td>
                {readOnly ? (
                  detail.diagnosisDate || "N/A"
                ) : (
                  <Form.Control
                    type="date"
                    value={detail.diagnosisDate}
                    onChange={(e) =>
                      handleDetailChange(
                        "mentalHealth",
                        index,
                        "diagnosisDate",
                        e.target.value
                      )
                    }
                  />
                )}
              </td>
              <td>
                {readOnly ? (
                  detail.comments || "None"
                ) : (
                  <Form.Control
                    type="text"
                    value={detail.comments}
                    onChange={(e) =>
                      handleDetailChange(
                        "mentalHealth",
                        index,
                        "comments",
                        e.target.value
                      )
                    }
                  />
                )}
              </td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  );
};

export default MentalHealthTable;
