import styled, { keyframes } from "styled-components";
import { mainColors } from "../static/mainColors";

const primaryColor = mainColors.primaryColor;
const hoverColor = mainColors.hoverColor;
const textColor = mainColors.textColor;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Form = styled.form`
  min-height: calc(100vh - 6em);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3em;
  padding: 1em;
  animation: ${fadeInUp} 0.5s ease-in-out;
`;

export const Label = styled.label`
  display: block;
  font-size: 1.2em;
  color: ${textColor};
  margin-top: 0.6em;
`;

export const FormTitle = styled.h2`
  font-size: 1.5em;
  color: ${textColor};
  margin-bottom: 1em;
`;

export const Input = styled.input`
  min-width: 20em;
  margin: 0.2em 0;
  padding: 0.8em;
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
  padding: 0.8em;
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
  padding: 0.8em;
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

export const ErrorMsg = styled.div`
  color: red;
  margin-top: 0.1em;
  font-size: 1em;
`;
