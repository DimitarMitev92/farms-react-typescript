import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { mainColors } from "../../../static/mainColors";

// Define colors
const primaryColor = mainColors.primaryColor;
const hoverColor = mainColors.hoverColor;
const textColor = mainColors.textColor;

// Header styles
export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${primaryColor};
  height: 3em;
`;

// Navigation styles
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
`;

// List item styles
export const ListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 10em;
  min-height: 100%;

  &:hover {
    background-color: ${hoverColor};
  }
`;

// Navigation link styles
export const NavLinkAnchor = styled(NavLink)`
  width: 100%;
  height: 100%;
  font-size: 1.2em;
  color: ${textColor};
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    font-style: bold;
    background-color: ${hoverColor};
  }
`;

// Dropdown styles
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
  }
`;

export const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: ${primaryColor};
  text-align: center;
  min-width: 100%;
  z-index: 1;
  top: 100%;

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
