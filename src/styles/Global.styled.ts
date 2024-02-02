import styled, { keyframes } from "styled-components";
import { mainColors } from "../static/mainColors";

const primaryColor = mainColors.primaryColor;
const hoverColor = mainColors.hoverColor;
const textColor = mainColors.textColor;
const hoverTextColor = mainColors.hoverTextColor;

export const Title = styled.h2`
  color: ${textColor};
  margin-bottom: 1em;
  text-align: center;
  margin-top: 2em;
`;

export const SubTitle = styled.h3`
  color: ${textColor};
  margin-bottom: 1em;
  text-align: center;
  margin-top: 2em;
`;

export const ColumnContainer = styled.div`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  margin: 1em 0 0.5em 0;
  padding: 1em 2em;
  font-size: 18px;
  background-color: ${primaryColor};
  color: ${textColor};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${hoverColor};
    color: ${hoverTextColor};
  }

  &:disabled {
    background-color: ${hoverColor};
    cursor: not-allowed;
  }
`;

// SPINNER
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #333;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;
