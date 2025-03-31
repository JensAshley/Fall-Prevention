/**
 * A card component that displays an incomplete form with options to complete or delete it.
 *
 * @component
 * @param {IncompleteFormProps} props - The props for the component.
 * @returns {JSX.Element} The rendered IncompleteFormCard component.
 */
import React from "react";
import { Button } from "react-bootstrap";

/**
 * Card display info:
 *      Patient Last, First Name
 *      Last Saved: [Date and Time]
 *      Completion: [Percentage]
 */

interface IncompleteFormProps {
  form: any;
  onClick: () => void;
  onDelete: () => void;
}

const IncompleteFormCard: React.FC<IncompleteFormProps> = ({
  form,
  onClick,
  onDelete,
}) => {
  const { data, lastSaved, completionPercent } = form;
  const patientName =
    (data?.patient_info?.last_name || "[No last name]") +
    ", " +
    (data?.patient_info?.first_name || "[No first name]");
  const lastSavedText = `Last Saved: ${new Date(lastSaved).toLocaleString()}`;
  const completionStatus = `${completionPercent || 0}%`;

  return (
    <div
      style={{
        border: "2px solid #ccc",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        margin: "10px",
        position: "relative",
        maxWidth: "300px",
        maxHeight: "300px",
      }}
    >
      <div
        style={{
          width: "50%",
          height: "200px",
          backgroundColor: "#f0f0f0",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span>Patient's Image</span>
      </div>
      <div style={{ textAlign: "center" }}>
        <h5>{patientName}</h5>
        <p>{lastSavedText}</p>
        <p>Completion: {completionStatus}</p>
        <Button
          onClick={onClick}
          variant={"primary"}
          style={{
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          {completionPercent === 100 ? "Review and Submit ✅︎" : "Continue ✎"}
        </Button>
      </div>
      <Button
        onClick={(e) => {
          if (window.confirm("CONFIRM DELETION?\nPatient data will be lost.")) {
            e.stopPropagation();
            onDelete();
          }
        }}
        variant={"danger"}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        𐄂
      </Button>
    </div>
  );
};

export default IncompleteFormCard;
