import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: steelblue;
  height: 3em;
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
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 10em;
  min-height: 100%;

  &:hover {
    background-color: #386890;
  }
`;

export const NavLinkAnchor = styled(NavLink)`
  width: 100%;
  height: 100%;
  font-size: 1.2em;
  color: white;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    font-style: bold;
    background-color: #386890;
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
  background-color: steelblue;
  color: white;
  font-size: 1.2em;
  border: none;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #386890;
  }
`;

export const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: steelblue;
  text-align: center;
  min-width: 100%;
  z-index: 1;
  top: 100%;

  ${DropdownContainer}:hover & {
    display: block;
  }
`;

export const DropdownItem = styled.div`
  height: 100%;
  width: 100%;
  &:hover {
    background-color: #386890;
  }
`;
