import styled from "styled-components";
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

export const NotFoundContainer = styled.div`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
