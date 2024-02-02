export const endpoint = {
  CROP: "http://localhost:8080/crop",
  CULTIVATION: "http://localhost:8080/cultivation",
  SOIL: "http://localhost:8080/soil",
  FARM: "http://localhost:8080/farm",
  FIELD: "http://localhost:8080/field",
  FIELD_CULTIVATION: "http://localhost:8080/field-cultivation",
  GROWING_PROCESS: "http://localhost:8080/growing-process",
  MACHINERY: "http://localhost:8080/machinery",
  REPORTING: "http://localhost:8080/reporting",
  USER: "http://localhost:8080/user",
  LOGIN: "http://localhost:8080/auth/login",
  REGISTER: "http://localhost:8080/auth/register",
};

export const mainRoute = {
  MAIN: "/",
  NOT_FOUND: "*",
};

export const method = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export const catalog = {
  FARM: "/catalog/farm",
  FIELD: "/catalog/field",
  FIELD_CULTIVATION: "/catalog/field-cultivation",
  MACHINERY: "/catalog/machinery",
};

export const create = {
  FARM: "/create/farm",
  FIELD: "/create/field",
  FIELD_CULTIVATION: "/create/field-cultivation",
  MACHINERY: "/create/machinery",
};

export const update = {
  FARM: "/update/farm",
  FIELD: "/update/field",
  FIELD_CULTIVATION: "/update/field-cultivation",
  MACHINERY: "/update/machinery",
};

export const updateRouteId = {
  FARM: "/update/farm/:id",
  FIELD: "/update/field/:id",
  MACHINERY: "/update/machinery/:id",
  FIELD_CULTIVATION: "/update/field-cultivation/:id",
};

export const reporting = {
  MOST_MACHINERIES: "/reporting/most-machineries",
  FIELD_BY_CROPS_AND_FARMS: "/reporting/field-by-crops-and-farms",
  MOST_COMMON_SOIL: "/reporting/most-common-soil",
};

export const auth = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
};

export const rightsUser = {
  OWNER: "OWNER",
  OPERATOR: "OPERATOR",
  VIEWER: "VIEWER",
};

export const header = {
  CONTENT_TYPE_APP_JSON: {
    "Content-Type": "application/json",
  },
};
