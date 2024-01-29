import styled from "styled-components";
import { mainColors } from "../../../static/mainColors";

const primaryColor = mainColors.primaryColor;
const textColor = mainColors.textColor;

export const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${primaryColor};
  height: 3em;
`;

export const FooterText = styled.p`
  font-size: 1.2em;
  color: ${textColor};
  margin: 0 0.6em 0;
`;
