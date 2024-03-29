import styled, { keyframes } from "styled-components";
import { mainColors } from "../static/mainColors";

const primaryColor = mainColors.primaryColor;
const hoverColor = mainColors.hoverColor;
const textColor = mainColors.textColor;
const hoverTextColor = mainColors.hoverTextColor;

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
`;

export const Spinner = styled.div`
  border: 4px solid ${primaryColor};
  border-top: 4px solid ${hoverColor};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spinAnimation} 0.8s linear infinite;
`;

export const Title = styled.h2`
  color: ${textColor};
  margin-bottom: 1em;
  text-align: center;
  margin-top: 2em;

  @media (max-width: 500px) {
    font-size: 1em;
  }
`;

export const SubTitle = styled.h3`
  color: ${textColor};
  margin-bottom: 0.5em;
  text-align: center;
  margin-top: 0.5em;
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

  @media (max-width: 768px) {
    padding: 0.8em 1.6em;
    font-size: 14px;
  }
`;

export const Anchor = styled.a`
  color: ${textColor};
  text-decoration: underline;
  margin: 0.5em;
  cursor: pointer;

  &:hover {
    color: ${primaryColor};
  }
`;

export const NotFoundContainer = styled.div`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1em;
`;

export const SearchInput = styled.input`
  padding: 0.5em;
  font-size: 16px;
  border: 2px solid ${primaryColor};
  border-radius: 4px;
  margin-right: 0.5em;

  &:focus {
    outline: none;
    border-color: ${hoverColor};
  }
`;
