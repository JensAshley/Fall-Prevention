import React, { useEffect, useState } from "react";
import { getDatabase } from "firebase/database";
import { ref, push, child, update } from "firebase/database";
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { mapStateToProps } from "../../app/store";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { Button, Container } from "react-bootstrap";
import NavBar from "../../components/NavBar";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import PageThree from "./PageThree";
import Summary from "./Summary";
import ProgressSteps from "../../components/ProgressSteps";
import { initialFormData } from "./formData";
import app from "../../app/firebaseSetup";

const db = getFirestore(app);

const NewPatient = () => {
  const [step, setStep] = useState(1); // Manage the current step
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();
  const location = useLocation();

  // Progress to next or previous step
  // const nextStep = () => setStep(step + 1);
  const nextStep = () => {
    if (step === 3) {
      // Update the final risk score based on the selected tool
      const finalRiskScore =
        formData.steadi_evaluation?.screening_tool === "key_questions"
          ? formData.steadi_evaluation?.key_questions_score
          : formData.steadi_evaluation?.brochure_score;
      setFormData((prevState) => ({
        ...prevState,
        evaluation: {
          ...prevState.evaluation,
          final_risk_score: finalRiskScore?.toString() || "",
        },
      }));
    }
    setStep(step + 1);
  };
  const prevStep = () => setStep(step - 1);

  // Page Labels for Progress Steps
  const stepLabels = [
    "Patient Info",
    "Emergency Contact",
    "Evaluation",
    "Summary",
  ];

  const pages = stepLabels.length; // Total pages (updated if more pages are added)

  const calculateCompletionPercentage = (
    currentStep: number,
    totalSteps: number
  ) => {
    return Math.round((currentStep / totalSteps) * 100);
  };

  // Update name_lower whenever first_name or last_name changes
  useEffect(() => {
    const full_name =
      `${formData.patient_info.first_name} ${formData.patient_info.last_name}`.trim();
    const name_lower = full_name.toLowerCase();

    setFormData((prevState) => ({
      ...prevState,
      patient_info: {
        ...prevState.patient_info,
        name_lower: name_lower,
      },
    }));
  }, [formData.patient_info.first_name, formData.patient_info.last_name]);

  // Load form data from Firebase
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const formId = queryParams.get("formId");
    if (formId) {
      const loadFormData = async () => {
        const docRef = doc(db, "incomplete", formId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data().data);
          const data = docSnap.data().data;
          // Parsing date strings to Date objects
          data.patient_info.birthday = new Date(data.patient_info.birthday);
          data.evaluation.evaluation_date = new Date(
            data.evaluation.evaluation_date
          );
          setFormData(data);
        }
      };
      loadFormData();
    }
  }, [location]);

  // Save form data to Firebase
  const handleSave = async () => {
    const queryParams = new URLSearchParams(location.search);
    let formId = queryParams.get("formId");

    if (!formId) {
      formId = new Date().getTime().toString(); // Generate a new formId if it doesn't exist
      navigate(`/newpatient?formId=${formId}`, { replace: true });
    }
    const updatedForm = {
      id: formId,
      // data: formData,
      // Fixed date format for Firestore
      data: {
        ...formData,
        patient_info: {
          ...formData.patient_info,
          birthday: formData.patient_info.birthday.toISOString(),
        },
        evaluation: {
          ...formData.evaluation,
          evaluation_date: formData.evaluation.evaluation_date.toISOString(),
        },
      },
      lastSaved: new Date().getTime(),
      completionPercent: calculateCompletionPercentage(step, pages),
    };

    await setDoc(doc(db, "incomplete", formId), updatedForm);
    alert("Form data saved!");
  };

  // Handle input change
  // const handleInputChange =
  //   (section: string, input: string) =>
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { value } = e.target;
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       [section]: {
  //         ...prevState[section as keyof typeof formData],
  //         [input]: value,
  //       },
  //     }));
  //   };

  const handleInputChange =
    (section: string, field: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFormData((prevState: any) => {
        const updatedSection = { ...prevState[section] };
        const fieldParts = field.split(".");

        if (fieldParts.length === 1) {
          updatedSection[field] = value;
        } else {
          let nestedField = updatedSection;
          for (let i = 0; i < fieldParts.length - 1; i++) {
            nestedField = nestedField[fieldParts[i]];
          }
          nestedField[fieldParts[fieldParts.length - 1]] = value;
        }

        return {
          ...prevState,
          [section]: updatedSection,
        };
      });
    };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const obj = { ...formData };

    // Remove unselected algorithm data
    if (obj.evaluation.selected_algorithm === "STEADI") {
      delete obj.other_evaluation;
    } else if (obj.evaluation.selected_algorithm === "Other") {
      delete obj.steadi_evaluation;
      delete obj.key_questions;
      delete obj.brochure;
      // delete obj.tug_test;
      // delete obj.chair_stand_test;
      // delete obj.balance_test;
    }

    const newPostKey = push(child(ref(getDatabase()), "posts")).key;
    const updates: { [key: string]: any } = {};
    updates["/" + newPostKey] = obj;
    await update(ref(getDatabase(), "/patients"), updates);

    // Add to Firebase database if completed
    const db = getFirestore();
    await addDoc(collection(db, "patients"), obj);

    // Remove the form from Firestore
    const queryParams = new URLSearchParams(location.search);
    const formId = queryParams.get("formId");
    if (formId) {
      await deleteDoc(doc(db, "incomplete", formId));
    }

    navigate("/home");
  };

  // Structure of the Patient Form
  return (
    <div className="main" style={{ display: "flex", flexDirection: "row" }}>
      {/* Vertical Navbar */}
      <NavBar />

      {/* Form */}
      <Container className="content" style={{ padding: "2rem", flex: 1 }}>
        <ProgressSteps
          currStep={step}
          totalSteps={pages}
          stepLabels={stepLabels}
        />
        {step === 1 && (
          <PageOne
            handleFormData={handleInputChange}
            values={formData.patient_info}
            submitForm={handleFormSubmit}
          />
        )}
        {step === 2 && (
          <PageTwo
            handleFormData={handleInputChange}
            values={formData.emergency_contact}
            submitForm={handleFormSubmit}
          />
        )}
        {step === 3 && (
          <PageThree
            handleFormData={handleInputChange}
            formData={formData}
            setFormData={setFormData}
            submitForm={handleFormSubmit}
          />
        )}
        {step === 4 && (
          <Summary values={formData} submitForm={handleFormSubmit} />
        )}

        {/* Navigation Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2rem",
          }}
        >
          {step > 1 && (
            <Button variant="primary" onClick={prevStep}>
              ← Back
            </Button>
          )}
          {step < pages && (
            <Button variant="primary" onClick={nextStep}>
              Next →
            </Button>
          )}
          {step === pages && (
            <Button variant="success" onClick={handleFormSubmit}>
              Submit
            </Button>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2rem",
            bottom: "2rem",
          }}
        >
          <Button
            onClick={handleSave}
            style={{
              color: "white",
              backgroundColor: "#00A9B5",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Save Form 🖫
          </Button>
          <Button variant="warning" onClick={() => navigate("/home")}>
            Cancel / Exit
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default connect(mapStateToProps)(NewPatient);
