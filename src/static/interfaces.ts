export interface Farm {
  id?: string;
  name: string;
  location: {
    coordinates: [number, number];
    type: string;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Soil {
  id?: string;
  soil: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Cultivation {
  id?: string;
  cultivation: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Machinery {
  id?: string;
  farmId: string;
  brand: string;
  model: string;
  identificationNumber: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Crop {
  id?: string;
  crop: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Field {
  id?: string;
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
}

export interface GrowingProcess {
  id?: string;
  cropId: string;
  fieldId: string;
}

export interface FieldCultivation {
  id?: string;
  cultivationId: string;
  machineryId: string;
  growingProcessId: string;
  startingDate: null | string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
}

export interface UserDataFromApi {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    rights: "OWNER" | "OPERATOR" | "VIEWER";
  };
  access_token: string;
}

export interface RequestOptions {
  method: string;
  headers?: Record<string, string>;
  body?: string;
}

export interface ApiError {
  message: string;
}
