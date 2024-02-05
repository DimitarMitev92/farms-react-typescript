import styled, { keyframes } from "styled-components";
import { mainColors } from "../static/mainColors";

const primaryColor = mainColors.primaryColor;
const hoverTextColor = mainColors.hoverTextColor;

const pulseAnimation = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.01);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
`;

export const SkeletonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
`;

export const SkeletonContainer = styled.div`
  min-width: 18em;
  min-height: 18em;
  display: flex;
  flex-wrap: wrap;
  margin-top: 5em;
  margin-bottom: 1em;
  padding: 1em;
  border: 1px solid #ddd;
  background-color: ${primaryColor};
  animation: ${pulseAnimation} 1.5s infinite alternate;
`;

export const SkeletonTitle = styled.div`
  width: 100px;
  height: 20px;
  margin-bottom: 10px;
  margin-bottom: 10px;
  background-color: ${hoverTextColor};
  animation: ${pulseAnimation} 1.5s infinite alternate;
`;

export const SkeletonSubtitle = styled.div`
  width: 80px;
  height: 15px;
  margin-top: 6px;
  margin-bottom: 6px;
  background-color: ${hoverTextColor};
  animation: ${pulseAnimation} 1.5s infinite alternate;
`;

export const SkeletonDates = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SkeletonDateText = styled.div`
  width: 100px;
  height: 12px;
  background-color: ${hoverTextColor};
  margin-bottom: 5px;
  animation: ${pulseAnimation} 1.5s infinite alternate;
`;
