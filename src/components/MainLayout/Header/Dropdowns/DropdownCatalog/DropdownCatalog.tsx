import { catalogItems } from "./DropdownCatalog.static";
import { Dropdown } from "../Dropdown";

export const DropdownCatalog = () => {
  return <Dropdown items={catalogItems} />;
};
