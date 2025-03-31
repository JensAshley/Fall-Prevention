/**
 * MedicationTable component renders a table displaying medication details.
 * Supports both read-only and editable modes.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.medicationDetails - Array of medication detail objects.
 * @param {Function} props.handleDetailChange - Function to handle changes in medication details.
 * @param {boolean} props.readOnly - Flag to determine if the table is in read-only mode.
 *
 * @returns {JSX.Element} The rendered MedicationTable component.
 */
import React from "react";
import { Table, Form } from "react-bootstrap";

const MedicationTable = ({
  medicationDetails,
  handleDetailChange,
  readOnly,
}: any) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Medication</th>
          <th>Dose</th>
          <th>Frequency</th>
          <th>Start Date</th>
          <th>Comments</th>
        </tr>
      </thead>
      <tbody>
        {medicationDetails.map(
          (
            detail: {
              medication: string;
              dose: string;
              frequency: string;
              startDate: string;
              comments: string;
            },
            index: number
          ) => (
            <tr key={index}>
              <td>
                {readOnly ? (
                  detail.medication || "N/A"
                ) : (
                  <Form.Control
                    type="text"
                    value={detail.medication}
                    onChange={(e) =>
                      handleDetailChange(
                        "medication",
                        index,
                        "medication",
                        e.target.value
                      )
                    }
                  />
                )}
              </td>
              <td>
                {readOnly ? (
                  detail.dose || "N/A"
                ) : (
                  <Form.Control
                    type="text"
                    value={detail.dose}
                    onChange={(e) =>
                      handleDetailChange(
                        "medication",
                        index,
                        "dose",
                        e.target.value
                      )
                    }
                  />
                )}
              </td>
              <td>
                {readOnly ? (
                  detail.frequency || "N/A"
                ) : (
                  <Form.Control
                    type="text"
                    value={detail.frequency}
                    onChange={(e) =>
                      handleDetailChange(
                        "medication",
                        index,
                        "frequency",
                        e.target.value
                      )
                    }
                  />
                )}
              </td>
              <td>
                {readOnly ? (
                  detail.startDate || "N/A"
                ) : (
                  <Form.Control
                    type="date"
                    value={detail.startDate}
                    onChange={(e) =>
                      handleDetailChange(
                        "medication",
                        index,
                        "startDate",
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
                        "medication",
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

export default MedicationTable;
