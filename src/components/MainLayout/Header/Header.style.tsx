import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { mainColors } from "../../../static/mainColors";
import { FiMenu } from "react-icons/fi";
import { TfiClose } from "react-icons/tfi";

const primaryColor = mainColors.primaryColor;
const hoverColor = mainColors.hoverColor;
const textColor = mainColors.textColor;
const hoverTextColor = mainColors.hoverTextColor;

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${primaryColor};
`;

export const HeaderTitle = styled.h1`
  text-align: center;
  font-size: 1em;
  white-space: nowrap;
  color: ${textColor};
  background-color: ${primaryColor};
`;

export const NavBar = styled.nav`
  height: 100%;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UnorderedList = styled.ul`
  display: flex;
  list-style-type: none;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 10em;
  height: 3em;

  &:hover {
    background-color: ${hoverColor};
  }
`;

export const NavLinkAnchor = styled(NavLink)`
  width: 100%;
  height: 100%;
  font-size: 1.2em;
  color: ${textColor};
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:hover {
    font-style: bold;
    background-color: ${hoverColor};
    color: ${hoverTextColor};
  }
`;

export const DropdownContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: inline-block;
`;

export const DropdownButton = styled.p`
  height: 100%;
  background-color: ${primaryColor};
  color: ${textColor};
  font-size: 1.2em;
  border: none;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${hoverColor};
    color: ${hoverTextColor};
  }
`;

export const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: ${primaryColor};
  text-align: center;
  min-width: 100%;
  top: 100%;
  z-index: 10000;

  ${DropdownContainer}:hover & {
    display: block;
  }
`;

export const DropdownItem = styled.div`
  height: 3em;
  width: 100%;

  &:hover {
    background-color: ${hoverColor};
  }
`;

export const BurgerIcon = styled(FiMenu)`
  font-size: 1.5em;
  cursor: pointer;
  margin-top: 0.7em;
  margin-left: 0.5em;
  margin-bottom: 0.7em;
`;

export const BurgerCloseIcon = styled(TfiClose)`
  font-size: 1.5em;
  cursor: pointer;
  margin-top: 0.7em;
  margin-left: 0.5em;
  margin-bottom: 0.7em;
`;
