export interface FieldCardProps {
  field: {
    id: string;
    name: string;
    boundaries: {
      coordinates: number[][][];
      type: string;
    };
    soilId: string;
    farmId: string;
    farm: { name: string };
    soil: { soil: string };
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
  onUpdate: (id: string) => void;
  onSoftDelete: (id: string) => void;
  onPermDelete: (id: string) => void;
}
