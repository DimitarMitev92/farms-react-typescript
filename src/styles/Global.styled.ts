import styled from "styled-components";
import { mainColors } from "../static/mainColors";

const primaryColor = mainColors.primaryColor;
const hoverColor = mainColors.hoverColor;
const textColor = mainColors.textColor;

export const FormTitle = styled.h2`
  font-size: 2.4em;
  color: ${textColor};
  margin-bottom: 1em;
`;

export const Button = styled.button`
  margin: 1em 0 4em 0;
  padding: 1em 2em;
  font-size: 18px;
  background-color: ${primaryColor};
  color: ${textColor};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${hoverColor};
  }

  &:disabled {
    background-color: ${hoverColor};
    cursor: not-allowed;
  }
`;
