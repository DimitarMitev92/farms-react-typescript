export interface FieldCultivationFroApi {
  id: string;
  cultivationId: string;
  machineryId: string;
  growingProcessId: string;
  startingDate: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  cultivation: { cultivation: string };
  machinery: { identificationNumber: string; brand: string; model: string };
  crop: { crop: string };
  field: { name: string };
}
