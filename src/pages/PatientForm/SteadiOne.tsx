import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import QuestionTable from "../../components/QuestionTable";

const SteadiOne = ({
  values = {
    fall_last_year: "",
    fall_count: "",
    injured: "",
    unsteady: "",
    worry_falling: "",
  },
  handleScreeningChange,
  handleFormData,
  nextStep,
  selectedTool,
  setSelectedTool,
  keyQuestionsRiskScore,
  setKeyQuestionsRiskScore,
  brochureRiskScore,
  setBrochureRiskScore,
}: any) => {
  const [fallLastYear, setFallLastYear] = useState(values.fall_last_year);
  const [isAtRisk, setIsAtRisk] = useState(false);

  // Update fallLastYear state when values.fall_last_year changes
  useEffect(() => {
    setFallLastYear(values.fall_last_year);
  }, [values.fall_last_year]);

  const keyQuestions = [
    {
      name: "fall_last_year",
      label: "Has the patient fallen in the past year?",
    },
    ...(fallLastYear === "yes"
      ? [
          {
            name: "fall_count",
            label: "How many times has the patient fallen in the past year?",
          },
          {
            name: "injured",
            label: "Were the patient injured?",
          },
        ]
      : []),
    {
      name: "unsteady",
      label: "Do they feel unsteady when standing or walking?",
    },
    { name: "worry_falling", label: "Do they worry about falling?" },
  ];

  const brochureQuestions = [
    { name: "fallen_past_year", label: "I have fallen in the past year." },
    {
      name: "use_cane_walker",
      label:
        "I use or have been advised to use a cane or walker to get around safely.",
    },
    { name: "unsteady", label: "Sometimes I feel unsteady when I am walking." },
    {
      name: "hold_furniture",
      label: "I steady myself by holding onto furniture when walking at home.",
    },
    { name: "worry_falling", label: "I am worried about falling." },
    {
      name: "push_hand",
      label: "I need to push with my hands to stand up from a chair.",
    },
    {
      name: "trouble_step",
      label: "I have some trouble stepping up onto a curb.",
    },
    { name: "rush_toilet", label: "I often have to rush to the toilet." },
    { name: "lost_feeling", label: "I have lost some feeling in my feet." },
    {
      name: "light_headed",
      label:
        "I take medicine that sometimes makes me feel light-headed or more tired than usual.",
    },
    {
      name: "take_meds",
      label: "I take medicine to help me sleep or improve my mood.",
    },
    { name: "feel_sad", label: "I often feel sad or depressed." },
  ];

  const handleToolSelection = (tool: string) => {
    setSelectedTool(tool);
    handleFormData(
      "steadi_evaluation",
      "screening_tool"
    )({
      target: { value: tool },
    });
  };

  const calculateRiskScore = (answers: any, tool: string) => {
    if (tool === "key_questions") {
      const { fall_last_year, unsteady, worry_falling } = answers;
      if (
        fall_last_year === "yes" ||
        unsteady === "yes" ||
        worry_falling === "yes"
      ) {
        return 4;
      }
      return 0;
    } else if (tool === "brochure") {
      let score = 0;
      for (const key in answers) {
        if (answers[key] === "yes") {
          if (key === "fallen_past_year" || key === "use_cane_walker") {
            score += 2;
          } else {
            score += 1;
          }
        }
      }
      return score;
    }
    return 0;
  };

  const handleChange = (
    e: any,
    tool: string,
    setRiskScore: (score: number) => void
  ) => {
    handleScreeningChange(e);
    const newValues = { ...values, [e.target.name]: e.target.value };
    const newRiskScore = calculateRiskScore(newValues, tool);
    setRiskScore(newRiskScore);
    setIsAtRisk(newRiskScore >= 4);
    handleFormData(
      "steadi_evaluation",
      `${tool}_score`
    )({ target: { value: newRiskScore.toString() } });
    console.log("Risk Score: ", newRiskScore);
    console.log("Answered Questions: ", newValues);
  };

  const getRiskStatus = (score: number) => {
    return score >= 4 ? "At Risk" : "Not At Risk";
  };

  const riskScore =
    selectedTool === "key_questions"
      ? keyQuestionsRiskScore
      : brochureRiskScore;
  const riskStatus = getRiskStatus(riskScore);
  const riskColor = riskStatus === "At Risk" ? "red" : "green";

  return (
    <>
      <h3>STEADI Fall Risk Screening</h3>
      <Row>
        <Col style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant={selectedTool === "key_questions" ? "primary" : "secondary"}
            onClick={() => handleToolSelection("key_questions")}
          >
            3 Key Questions
          </Button>
          <Button
            variant={selectedTool === "brochure" ? "primary" : "secondary"}
            onClick={() => handleToolSelection("brochure")}
            style={{ marginLeft: "10px" }}
          >
            Stay Independent
          </Button>
        </Col>
      </Row>
      <br />
      {/* Risk Score Indicator */}
      {selectedTool && (
        <div
          style={{
            color: "white",
            backgroundColor: riskColor,
            padding: "10px",
            borderRadius: "5px",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          Risk Score: {riskScore} ({riskStatus})
        </div>
      )}
      {selectedTool === "key_questions" ? (
        <QuestionTable
          questions={keyQuestions}
          values={values}
          handleScreeningChange={(e) =>
            handleChange(e, "key_questions", setKeyQuestionsRiskScore)
          }
        />
      ) : selectedTool === "brochure" ? (
        <QuestionTable
          questions={brochureQuestions}
          values={values}
          handleScreeningChange={(e) =>
            handleChange(e, "brochure", setBrochureRiskScore)
          }
        />
      ) : (
        <h4 style={{ display: "flex", justifyContent: "center" }}>
          Please select a screening tool
        </h4>
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* If patient is at risk, proceed to Assessment */}
        {/* <Button
          variant="secondary"
          onClick={nextStep}
          disabled={!selectedTool || !isAtRisk}
        >
          →
        </Button> */}
        <Button variant="secondary" onClick={nextStep} disabled={!selectedTool}>
          →
        </Button>
      </div>
    </>
  );
};

export default SteadiOne;
