import {
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
  privateHeaderDataOwnerAndOperator,
  privateHeaderDataViewer,
} from "./Header.static";
import { DropdownCatalog } from "./Dropdowns/DropdownCatalog/DropdownCatalog";
import { DropdownCreate } from "./Dropdowns/DropdownCreate/DropdownCreate";
import { DropdownReporting } from "./Dropdowns/DropdownReporting/DropdownReporting";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

export const Header = () => {
  const { user } = useContext(UserContext);

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
        <NavBar>
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
              privateHeaderDataOwnerAndOperator.map(({ name, to }, key) => (
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
              user?.user.rights === "VIEWER" &&
              privateHeaderDataViewer.map(({ name, to }, key) => (
                <ListItem key={key}>
                  {name === "Catalog" &&
                    renderDropdown(name, <DropdownCatalog />)}
                  {/* {name === "Create" && renderDropdown(name, <DropdownCreate />)} */}
                  {name === "Reporting" &&
                    renderDropdown(name, <DropdownReporting />)}
                  {name !== "Catalog" &&
                    // name !== "Create" &&
                    name !== "Reporting" &&
                    to !== undefined && (
                      <NavLinkAnchor to={to}>{name}</NavLinkAnchor>
                    )}
                </ListItem>
              ))}
          </UnorderedList>
        </NavBar>
      </HeaderContainer>
    </>
  );
};
