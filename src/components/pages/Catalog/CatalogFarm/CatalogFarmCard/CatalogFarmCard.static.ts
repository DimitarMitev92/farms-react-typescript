import { Farm } from "../../../../../static/interfaces";

export interface FarmCardProps {
  farm: Farm;
  onUpdate: (id: string) => void;
  onSoftDelete: (id: string) => void;
  onPermDelete: (id: string) => void;
}
