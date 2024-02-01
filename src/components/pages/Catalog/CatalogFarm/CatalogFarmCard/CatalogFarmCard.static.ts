export interface Farm {
  id: string;
  name: string;
  location: {
    coordinates: [number, number];
    type: string;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface FarmCardProps {
  farm: Farm;
  onUpdate: (id: string) => void;
  onSoftDelete: (id: string) => void;
  onPermDelete: (id: string) => void;
}
