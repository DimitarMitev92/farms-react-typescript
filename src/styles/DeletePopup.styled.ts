import styled from "styled-components";
import { mainColors } from "../static/mainColors";
import { SoftDeleteButtonCard } from "./Card.styled";

const primaryColor = mainColors.primaryColor;
const textColor = mainColors.textColor;
const hoverColor = mainColors.hoverColor;
const hoverTextColor = mainColors.hoverTextColor;
const popupBackgroundColor = mainColors.popupBackgroundColor;
const popupBorderColor = mainColors.popupBorderColor;

export const DeletePopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${popupBackgroundColor};
  border: 1px solid ${popupBorderColor};
  border-radius: 0%.5em;
  padding: 1em;
  width: 300px;
  max-width: 80%;
  min-width: 30%;
  text-align: center;
  z-index: 100000;
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
