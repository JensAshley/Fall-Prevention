import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import SteadiOne from "./SteadiOne";
import SteadiTwo from "./SteadiTwo";
import DatePicker from "react-datepicker";
import OtherAlgorithm from "./OtherAlgorithm";

const fallRiskAssessment = [
  //"Morse Fall Scale (MFS)",
  //"John Hopkins Falls Risk Assessment Tool (JHFRAT)",
  //"STRATIFY",
  //"Tinetti Assessment Tool",
  //"Berg Balance Scale",
  "30-Second Chair Stand",
  "Timed Up & Go (TUG)",
  "4-Stage Balance Test",
  "Other",
];

const PageThree = ({
  handleFormData,
  formData,
  setFormData,
  submitForm,
}: any) => {
  const {
    evaluation,
    steadi_evaluation,
    key_questions,
    brochure,
    tug_test,
    chair_stand_test,
    balance_test,
    other_evaluation,
  } = formData;

  const [currStep, setStep] = useState(1);
  const [selectedTool, setSelectedTool] = useState(
    steadi_evaluation.screening_tool || ""
  );

  const [screening, setScreening] = useState({
    key_questions: {
      fall_last_year: key_questions.fall_last_year || "",
      fall_count: key_questions.fall_count || "",
      unsteady: key_questions.unsteady || "",
      worry_falling: key_questions.worry_falling || "",
    },
    brochure: {
      fallen_past_year: brochure.fallen_past_year || "",
      use_cane_walker: brochure.use_cane_walker || "",
      unsteady: brochure.unsteady || "",
      hold_furniture: brochure.hold_furniture || "",
      worry_falling: brochure.worry_falling || "",
      push_hand: brochure.push_hand || "",
      trouble_step: brochure.trouble_step || "",
      rush_toilet: brochure.rush_toilet || "",
      lost_feeling: brochure.lost_feeling || "",
      light_headed: brochure.light_headed || "",
      take_meds: brochure.take_meds || "",
      feel_sad: brochure.feel_sad || "",
    },
  });

  const handleScreeningChange =
    (tool: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setScreening((prevState) => ({
        ...prevState,
        [tool]: {
          ...prevState[tool as keyof typeof screening],
          [name]: value,
          ...(name === "fall_last_year" &&
            value === "no" && { fall_count: "" }),
        },
      }));
      handleFormData(tool, name)(e);
    };

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  return (
    <>
      <h2>Fall Risk Evaluation</h2>
      <Form onSubmit={submitForm}>
        {/* Date Entry */}
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Date Entry</Form.Label>
              <DatePicker
                selected={
                  evaluation.evaluation_date &&
                  !isNaN(new Date(evaluation.evaluation_date).getTime())
                    ? new Date(evaluation.evaluation_date)
                    : null
                }
                onChange={(date: Date) =>
                  handleFormData(
                    "evaluation",
                    "evaluation_date"
                  )({
                    target: { value: date },
                  })
                }
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Algorithm Selection */}
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Select Algorithm</Form.Label>
              <Form.Select
                value={evaluation.selected_algorithm}
                onChange={handleFormData("evaluation", "selected_algorithm")}
              >
                <option value="">Select...</option>
                <option value="STEADI">STEADI</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Conditionally render algorithm components */}
        {evaluation.selected_algorithm && (
          <>
            {evaluation.selected_algorithm === "STEADI" ? (
              <>
                {currStep === 1 && (
                  <SteadiOne
                    values={screening[selectedTool as keyof typeof screening]}
                    handleScreeningChange={handleScreeningChange(selectedTool)}
                    handleFormData={handleFormData}
                    nextStep={nextStep}
                    selectedTool={selectedTool}
                    setSelectedTool={setSelectedTool}
                    keyQuestionsRiskScore={
                      steadi_evaluation.key_questions_score
                    }
                    setKeyQuestionsRiskScore={(score: number) =>
                      setFormData((prevData: any) => ({
                        ...prevData,
                        steadi_evaluation: {
                          ...prevData.steadi_evaluation,
                          key_questions_score: score,
                        },
                      }))
                    }
                    brochureRiskScore={steadi_evaluation.brochure_score}
                    setBrochureRiskScore={(score: number) =>
                      setFormData((prevData: any) => ({
                        ...prevData,
                        steadi_evaluation: {
                          ...prevData.steadi_evaluation,
                          brochure_score: score,
                        },
                      }))
                    }
                  />
                )}
                {currStep === 2 && (
                  <SteadiTwo
                    values={steadi_evaluation}
                    handleFormData={handleFormData}
                    fallRiskAssessment={fallRiskAssessment}
                    prevStep={prevStep}
                  />
                )}
              </>
            ) : (
              <OtherAlgorithm
                handleFormData={handleFormData}
                otherValues={other_evaluation}
                fallRiskAssessment={fallRiskAssessment}
              />
            )}
          </>
        )}
      </Form>
    </>
  );
};

export default PageThree;
