import { DropdownContent, DropdownItem, NavLinkAnchor } from "../Header.style";

interface IItem {
  name: string;
  to: string;
}

export const Dropdown = ({ items }: { items: IItem[] }) => {
  return (
    <DropdownContent>
      {items.map((item: IItem, key: number) => (
        <DropdownItem key={key}>
          <NavLinkAnchor to={item.to}>{item.name}</NavLinkAnchor>
        </DropdownItem>
      ))}
    </DropdownContent>
  );
};
