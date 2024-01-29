import {
  DropdownButton,
  DropdownContainer,
  HeaderContainer,
  ListItem,
  NavBar,
  NavLinkAnchor,
  UnorderedList,
} from "./Header.style";
import { publicHeaderData, privateHeaderData } from "./Header.static";
import { DropdownCatalog } from "./Dropdowns/DropdownCatalog/DropdownCatalog";
import { DropdownCreate } from "./Dropdowns/DropdownCreate/DropdownCreate";
import { DropdownReporting } from "./Dropdowns/DropdownReporting/DropdownReporting";

export const Header = () => {
  const renderDropdown = (name: string, content: JSX.Element) => (
    <DropdownContainer>
      <DropdownButton>{name}</DropdownButton>
      {content}
    </DropdownContainer>
  );

  return (
    <HeaderContainer>
      <NavBar>
        <UnorderedList>
          {publicHeaderData.map(({ name, to }, key) => {
            return (
              <ListItem key={key}>
                <NavLinkAnchor to={to}>{name}</NavLinkAnchor>
              </ListItem>
            );
          })}
          {privateHeaderData.map(({ name, to }, key) => (
            <ListItem key={key}>
              {name === "Catalog" && renderDropdown(name, <DropdownCatalog />)}
              {name === "Create" && renderDropdown(name, <DropdownCreate />)}
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
        </UnorderedList>
      </NavBar>
    </HeaderContainer>
  );
};
