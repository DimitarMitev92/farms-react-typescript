import styled from "styled-components";

const primaryColor = "#367c2b";
const textColor = "#f3d204";

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
