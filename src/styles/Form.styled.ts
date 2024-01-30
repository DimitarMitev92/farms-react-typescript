import styled from "styled-components";
import { mainColors } from "../static/mainColors";

const primaryColor = mainColors.primaryColor;
const hoverColor = mainColors.hoverColor;
const textColor = mainColors.textColor;

export const Form = styled.form`
  min-height: calc(100vh - 6em);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Label = styled.label`
  font-size: 1.2em;
  color: ${textColor};
  margin-top: 0.6em;
`;

export const Input = styled.input`
  min-width: 20em;
  margin: 1em 0;
  padding: 1em;
  font-size: 1em;
  border: 1px solid ${hoverColor};
  border-radius: 0.25em;

  &:focus {
    outline: none;
    border-color: ${hoverColor};
    box-shadow: 0 0 0.5em ${hoverColor};
  }
`;

export const TextArea = styled.textarea`
  min-width: 20em;
  margin: 1em 0;
  padding: 1em;
  font-size: 1em;
  border: 1px solid ${hoverColor};
  border-radius: 0.25em;

  &:focus {
    outline: none;
    border-color: ${primaryColor};
    box-shadow: 0 0 0.5em ${hoverColor};
  }
`;

export const Select = styled.select`
  min-width: 20em;
  margin: 1em 0;
  padding: 1em;
  font-size: 1em;
  border: 1px solid ${hoverColor};
  border-radius: 0.25em;
  background-color: white;

  &:focus {
    outline: none;
    border-color: ${hoverColor};
    box-shadow: 0 0 0.5em ${hoverColor};
  }
`;

export const Option = styled.option`
  &:hover {
    background-color: ${hoverColor};
  }
`;

export const Button = styled.button`
  margin: 1em 0;
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

export const ErrorMsg = styled.div`
  color: red;
  margin-top: 0.25em;
  font-size: 1em;
`;
