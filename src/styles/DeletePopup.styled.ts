import styled, { keyframes } from "styled-components";
import { mainColors } from "../static/mainColors";
import { SoftDeleteButtonCard } from "./Card.styled";

const primaryColor = mainColors.primaryColor;
const textColor = mainColors.textColor;
const hoverColor = mainColors.hoverColor;
const hoverTextColor = mainColors.hoverTextColor;
const popupBackgroundColor = mainColors.popupBackgroundColor;
const popupBorderColor = mainColors.popupBorderColor;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const DeletePopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${popupBackgroundColor};
  border: 1px solid ${popupBorderColor};
  border-radius: 0.5em;
  padding: 1em;
  width: 300px;
  max-width: 80%;
  min-width: 30%;
  text-align: center;
  z-index: 100000;
  animation: ${fadeIn} 0.2s ease-in-out;
  box-shadow: 0 4px 8px rgba(0.5, 0.5, 0.5, 0.5);
`;

export const DeleteButtonPopup = styled(SoftDeleteButtonCard)`
  margin: 1em;
`;

export const CancelButtonPopup = styled(SoftDeleteButtonCard)`
  background-color: ${primaryColor};
  color: ${textColor};

  &:hover {
    background-color: ${hoverColor};
    color: ${hoverTextColor};
  }
`;
