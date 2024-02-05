export interface IMostMachinery {
  count: number;
  name: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
}
