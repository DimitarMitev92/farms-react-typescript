import styled, { keyframes } from "styled-components";
import { mainColors } from "../static/mainColors";

const primaryColor = mainColors.primaryColor;
const textColor = mainColors.textColor;
const hoverColor = mainColors.hoverColor;

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

export const TableContainer = styled.div`
  margin: 1em;
  margin-bottom: 5em;
  animation: ${fadeInUp} 0.5s ease-in-out;

  @media (max-width: 750px) {
    overflow-x: auto;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: ${primaryColor};
  color: ${textColor};
`;

export const TableHeadCell = styled.th`
  padding: 1em;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${hoverColor};
  }
`;

export const TableCell = styled.td`
  text-align: center;
  color: #333;
  padding: 1em;
`;
