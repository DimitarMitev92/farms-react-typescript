import { MachineryFromApi } from "../CatalogMachinery.static";

export interface CardMachineryProps {
  key: string;
  machinery: MachineryFromApi;
  userRights: "OWNER" | "OPERATOR" | "VIEWER" | null;
  handleUpdate: (id: string) => void;
  handleSoftDelete: (id: string) => Promise<void>;
  handlePermDelete: (id: string) => Promise<void>;
}
