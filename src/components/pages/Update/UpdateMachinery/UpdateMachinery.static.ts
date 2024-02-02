export const API_UPDATE_MACHINERY_URL = "http://localhost:8080/machinery";
export const API_UPDATE_MACHINERY_METHOD_GET = "GET";
export const API_UPDATE_MACHINERY_METHOD_PATCH = "PATCH";
export const API_UPDATE_MACHINERY_HEADERS = {
  "Content-Type": "application/json",
};

export interface RequestOptionsMachinery {
  method: string;
  headers?: Record<string, string>;
  body?: string;
}
