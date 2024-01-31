import styled from "styled-components";
import { mainColors } from "../static/mainColors";

const primaryKey = mainColors.primaryColor;
const textColor = mainColors.textColor;

export const CatalogContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;

export const CardContainer = styled.div`
  min-width: 20em;
  border: 1px solid ${primaryKey};
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
