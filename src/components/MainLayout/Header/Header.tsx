import {
  BurgerCloseIcon,
  BurgerIcon,
  DropdownButton,
  DropdownContainer,
  HeaderContainer,
  HeaderTitle,
  ListItem,
  NavBar,
  NavLinkAnchor,
  UnorderedList,
} from "./Header.style";
import {
  publicHeaderData,
  privateHeaderDataViewer,
  privateHeaderDataOwner,
  privateHeaderDataOperator,
} from "./Header.static";
import { DropdownCatalog } from "./Dropdowns/DropdownCatalog/DropdownCatalog";
import { DropdownCreate } from "./Dropdowns/DropdownCreate/DropdownCreate";
import { DropdownReporting } from "./Dropdowns/DropdownReporting/DropdownReporting";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";

export const Header = () => {
  const { user } = useContext(UserContext);

  const [menuOpen, setMenuOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    if (window.innerWidth > 850) setMenuOpen(true);
    if (window.innerWidth <= 850) setMenuOpen(false);
    setWindowWidth(window.innerWidth);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderDropdown = (name: string, content: JSX.Element) => (
    <DropdownContainer>
      <DropdownButton>{name}</DropdownButton>
      {content}
    </DropdownContainer>
  );
  return (
    <>
      {user && (
        <HeaderTitle>{`${user.user.firstName}: ${user.user.rights}`}</HeaderTitle>
      )}
      <HeaderContainer>
        {!menuOpen && windowWidth <= 850 && <BurgerIcon onClick={toggleMenu} />}
        {menuOpen && windowWidth <= 850 && (
          <BurgerCloseIcon onClick={toggleMenu} />
        )}
        <NavBar>
          {menuOpen && (
            <UnorderedList>
              {!user &&
                publicHeaderData.map(({ name, to }, key) => {
                  return (
                    <ListItem key={key}>
                      <NavLinkAnchor to={to}>{name}</NavLinkAnchor>
                    </ListItem>
                  );
                })}
              {user &&
                user?.user.rights !== "VIEWER" &&
                user?.user.rights !== "OWNER" &&
                privateHeaderDataOperator.map(({ name, to }, key) => (
                  <ListItem key={key}>
                    {name === "Catalog" &&
                      renderDropdown(name, <DropdownCatalog />)}
                    {name === "Create" &&
                      renderDropdown(name, <DropdownCreate />)}
                    {name === "Reporting" &&
                      renderDropdown(name, <DropdownReporting />)}
                    {name !== "Catalog" &&
                      name !== "Create" &&
                      name !== "Reporting" &&
                      to !== undefined && (
                        <NavLinkAnchor to={to}>{name}</NavLinkAnchor>
                      )}
                  </ListItem>
                ))}
              {user &&
                user?.user.rights !== "VIEWER" &&
                user?.user.rights !== "OPERATOR" &&
                privateHeaderDataOwner.map(({ name, to }, key) => (
                  <ListItem key={key}>
                    {name === "Catalog" &&
                      renderDropdown(name, <DropdownCatalog />)}
                    {name === "Create" &&
                      renderDropdown(name, <DropdownCreate />)}
                    {name === "Reporting" &&
                      renderDropdown(name, <DropdownReporting />)}
                    {name === "Dashboard" && to !== undefined && (
                      <NavLinkAnchor to={to}>{name}</NavLinkAnchor>
                    )}
                    {name !== "Catalog" &&
                      name !== "Create" &&
                      name !== "Reporting" &&
                      name !== "Dashboard" &&
                      to !== undefined && (
                        <NavLinkAnchor to={to}>{name}</NavLinkAnchor>
                      )}
                  </ListItem>
                ))}
              {user &&
                user?.user.rights === "VIEWER" &&
                privateHeaderDataViewer.map(({ name, to }, key) => (
                  <ListItem key={key}>
                    {name === "Catalog" &&
                      renderDropdown(name, <DropdownCatalog />)}
                    {name === "Reporting" &&
                      renderDropdown(name, <DropdownReporting />)}
                    {name !== "Catalog" &&
                      name !== "Reporting" &&
                      to !== undefined && (
                        <NavLinkAnchor to={to}>{name}</NavLinkAnchor>
                      )}
                  </ListItem>
                ))}
            </UnorderedList>
          )}
        </NavBar>
      </HeaderContainer>
    </>
  );
};
