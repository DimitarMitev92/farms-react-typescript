export interface FieldFromApi {
  id: string;
  name: string;
  boundaries: {
    coordinates: number[][][];
    type: string;
  };
  soilId: string;
  farmId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  farm: { name: string };
  soil: { soil: string };
}
