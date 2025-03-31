/**
 * ProgressSteps component displays a multi-step progress indicator for patient form.
 *
 * @param {number} currStep - The current step number (1-based index).
 * @param {number} totalSteps - The total number of steps.
 * @param {number} [currSubStep] - The current sub-step number (1-based index).
 * @param {number} [totalSubSteps] - The total number of sub-steps.
 * @param {string} [currLabel] - The label for the current step.
 * @param {string} [currSubLabel] - The label for the current sub-step.
 * @param {string[]} stepLabels - An array of labels for each step.
 *
 * @returns {JSX.Element} The rendered ProgressSteps component.
 */
import React from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  width: 100%;
  max-width: 80%;
  margin: 0 auto;
  padding: 0 16px;
`;

const StepContainer = styled.div<{ width: string }>`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 70px;

  &:before {
    content: "";
    position: absolute;
    background: #d6e1f5;
    height: 4px;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }

  &:after {
    content: "";
    position: absolute;
    background: #3569ce;
    height: 4px;
    width: ${({ width }) => width};
    top: 50%;
    transition: 0.4s ease;
    transform: translateY(-50%);
    left: 0;
  }
`;

const StepWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const StepStyle = styled.div<{ step: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 3px solid
    ${({ step }) => (step === "completed" ? "#3569ce" : "#d6e1f5")};
  transition: 0.4s ease;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StepCount = styled.span<{ step: string }>`
  font-size: 19px;
  color: ${({ step }) => (step === "completed" ? "#3569ce" : "#d6e1f5")};
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const StepsLabelContainer = styled.div`
  position: absolute;
  top: 66px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StepLabel = styled.span<{ isCurrent: boolean }>`
  font-size: 15px;
  align-items: center;
  color: #1a3467;
  text-align: center;
  display: flex;
  flex-direction: column;
  font-weight: ${({ isCurrent }) => (isCurrent ? "bold" : "normal")};
`;

interface ProgressStepsProps {
  currStep: number;
  totalSteps: number;
  currSubStep?: number;
  totalSubSteps?: number;
  currLabel?: string;
  currSubLabel?: string;
  stepLabels: string[];
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({
  currStep,
  totalSteps,
  currSubStep,
  totalSubSteps,
  currLabel,
  currSubLabel,
  stepLabels,
}) => {
  // TODO: Implement substeps
  // let progress = (currStep / totalSteps) * 100;

  // if (currSubStep !== undefined && totalSubSteps !== undefined) {
  //   const subProgress = (currSubStep / totalSubSteps) * (100 / totalSteps);
  //   progress += subProgress;
  // }
  const width = `${(100 / (totalSteps - 1)) * (currStep - 1)}%`;

  return (
    <MainContainer>
      <StepContainer width={width}>
        {stepLabels.map((label, index) => (
          <StepWrapper key={index}>
            <StepStyle
              step={currStep > index ? "completed" : "imcomplete"}
              style={{
                backgroundColor:
                  currStep > index + 1
                    ? index === totalSteps - 1
                      ? "#28a745"
                      : "#3569ce"
                    : "",
              }}
            >
              {currStep > index + 1 ? (
                <span style={{ color: "#ffffff", fontSize: "24px" }}>
                  &#10003;
                </span>
              ) : (
                <StepCount step={currStep > index ? "completed" : "imcomplete"}>
                  {index + 1}
                </StepCount>
              )}
            </StepStyle>
            <StepsLabelContainer>
              <StepLabel isCurrent={currStep === index + 1}>{label}</StepLabel>
            </StepsLabelContainer>
          </StepWrapper>
        ))}
      </StepContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "0.5rem",
        }}
      >
        <span>{currLabel}</span>
        {currSubLabel && <span>{currSubLabel}</span>}
      </div>
    </MainContainer>
  );
};

export default ProgressSteps;
