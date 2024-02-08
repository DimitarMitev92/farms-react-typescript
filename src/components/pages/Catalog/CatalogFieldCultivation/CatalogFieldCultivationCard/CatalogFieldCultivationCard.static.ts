import { FieldCultivationFroApi } from "../CatalogFieldCultivation.static";

export interface CardContainerProps {
  key: string;
  fieldCultivation: FieldCultivationFroApi;
  userRights: "OWNER" | "OPERATOR" | "VIEWER" | null;
  handleUpdate: (id: string) => void;
  handleSoftDelete: (id: string) => Promise<void>;
  handlePermDelete: (id: string) => Promise<void>;
}
