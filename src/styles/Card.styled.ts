import styled from "styled-components";
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

export const FarmCardContainer = styled.div`
  min-width: 22em;
  border: 1px solid ${primaryColor};
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

export const FarmCardTitle = styled.h3`
  margin-top: 1em;
  font-size: 18px;
  text-align: center;
`;

export const FarmCardSubTitle = styled.h4`
  margin-top: 0.8em;
  font-size: 16px;
  text-align: center;
`;

export const FarmCardInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: ${textColor};
`;

export const FarmLocationText = styled.p`
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

export const ButtonFarm = styled.button`
  margin: 1em 0;
  padding: 0.5em 1em;
  font-size: 1em;
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

export const UpdateButtonFarm = styled(ButtonFarm)`
  background-color: ${updateButtonColor};
  color: ${textColorButton};
  &:hover {
    background-color: ${updateButtonHoverColor};
  }
`;

export const SoftDeleteButtonFarm = styled(ButtonFarm)`
  background-color: ${softDeleteButtonColor};
  color: ${textColorButton};
  &:hover {
    background-color: ${softDeleteButtonHoverColor};
  }
`;

export const PermDeleteButtonFarm = styled(ButtonFarm)`
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

export const CardContainer = styled.div`
  min-width: 20em;
  border: 1px solid ${primaryColor};
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

export const CardTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
`;

export const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: ${textColor};
`;

export const LocationContainer = styled.div`
  margin-top: 10px;
  font-weight: bold;
  color: ${textColor};
`;
