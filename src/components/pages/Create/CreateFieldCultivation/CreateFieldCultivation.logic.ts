import { fetchDataFromApi } from "../../../../services/fetchDataFromApi";
import { endpoint, method } from "../../../../static/endPoints";
import { GrowingProcess, UserDataFromApi } from "../../../../static/interfaces";
import { FieldCultivationForRes } from "./CreateFieldCultivation.static";

export const fetchCultivations = async (user: UserDataFromApi) => {
  const url = endpoint.CULTIVATION;
  return fetchDataFromApi(
    url,
    user,
    method.GET,
    null,
    "Error fetching cultivations"
  );
};

export const fetchMachinery = async (user: UserDataFromApi) => {
  const url = endpoint.MACHINERY;
  return fetchDataFromApi(
    url,
    user,
    method.GET,
    null,
    "Error fetching machineries"
  );
};

export const fetchCrops = async (user: UserDataFromApi) => {
  const url = endpoint.CROP;
  return fetchDataFromApi(url, user, method.GET, null, "Error fetching crops");
};

export const fetchFields = async (user: UserDataFromApi) => {
  const url = endpoint.FIELD;
  return fetchDataFromApi(url, user, method.GET, null, "Error fetching fields");
};

export const createGrowingProcess = async (
  growingProcessObj: GrowingProcess,
  user: UserDataFromApi
) => {
  const url = endpoint.GROWING_PROCESS;
  return fetchDataFromApi(
    url,
    user,
    method.POST,
    growingProcessObj,
    "Server error while creating growing process"
  );
};

export const createFieldCultivation = async (
  fieldCultivationObj: FieldCultivationForRes,
  user: UserDataFromApi
) => {
  const url = endpoint.FIELD_CULTIVATION;
  return fetchDataFromApi(
    url,
    user,
    method.POST,
    fieldCultivationObj,
    "Server error while creating field cultivation"
  );
};
