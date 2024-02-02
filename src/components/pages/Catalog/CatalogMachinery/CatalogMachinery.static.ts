export interface MachineryFromApi {
  id: string;
  farmId: string;
  brand: string;
  model: string;
  identificationNumber: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  farm: { name: string };
}
