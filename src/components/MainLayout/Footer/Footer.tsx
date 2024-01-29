import { FooterContainer, FooterText } from "./Footer.style";
import { footerData } from "./Footer.static";

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>{footerData.title}</FooterText>
    </FooterContainer>
  );
};
