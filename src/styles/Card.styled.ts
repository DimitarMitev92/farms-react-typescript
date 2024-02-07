import styled, { keyframes } from "styled-components";
import { mainColors } from "../static/mainColors";

const primaryColor = mainColors.primaryColor;
const textColor = mainColors.textColor;
const hoverColor = mainColors.hoverColor;
const updateButtonColor = mainColors.updateButtonColor;
const updateButtonHoverColor = mainColors.updateButtonHoverColor;
const permDeleteButtonColor = mainColors.permDeleteButtonColor;
const permDeleteButtonHoverColor = mainColors.permDeleteButtonHoverColor;
const softDeleteButtonColor = mainColors.softDeleteButtonColor;
const softDeleteButtonHoverColor = mainColors.softDeleteButtonHoverColor;
const textColorButton = mainColors.textColorButton;

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

export const CardsWrapper = styled.section`
  margin-bottom: 4em;
`;

export const CardContainer = styled.div`
  min-width: 22em;
  border: 1px solid ${mainColors.primaryColor};
  border-radius: 0.5em;
  padding: 1em;
  margin: 1em;
  width: 18.75em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${fadeInUp} 0.5s ease-in-out;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

export const CardTitle = styled.h3`
  margin-top: 1em;
  font-size: 18px;
  text-align: center;
`;

export const CardSubTitle = styled.h4`
  margin-top: 0.8em;
  font-size: 16px;
  text-align: center;
`;

export const CardInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: ${textColor};
`;

export const LocationText = styled.p`
  margin-top: 0.5em;
  font-size: 1.2em;
  color: ${textColor};
`;

export const DatesContainer = styled.div`
  margin-top: 0.5em;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export const DatesText = styled.p`
  font-size: 1em;
  color: ${textColor};
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  gap: 1em;
`;

export const ButtonCard = styled.button`
  margin: 1em 0;
  padding: 0.5em 1em;
  font-size: 1em;
  background-color: ${primaryColor};
  color: ${textColor};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${hoverColor};
  }

  &:disabled {
    background-color: ${hoverColor};
    cursor: not-allowed;
  }
`;

export const UpdateButtonCard = styled(ButtonCard)`
  background-color: ${updateButtonColor};
  color: ${textColorButton};
  &:hover {
    background-color: ${updateButtonHoverColor};
  }
`;

export const SoftDeleteButtonCard = styled(ButtonCard)`
  background-color: ${softDeleteButtonColor};
  color: ${textColorButton};
  &:hover {
    background-color: ${softDeleteButtonHoverColor};
  }
`;

export const PermDeleteButtonCard = styled(ButtonCard)`
  background-color: ${permDeleteButtonColor};
  color: ${textColorButton};
  &:hover {
    background-color: ${permDeleteButtonHoverColor};
  }
`;

export const CatalogContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const LocationContainer = styled.div`
  margin-top: 10px;
  font-weight: bold;
  color: ${textColor};
`;
