export const routes = {
  register: "/auth/register",
  login: "/auth/login",
  catalogFarm: "/catalog/farm",
  catalogField: "/catalog/field",
  catalogMachinery: "/catalog/machinery",
  catalogFieldCultivation: "/catalog/field-cultivation",
  createFarm: "/create/farm",
  createField: "/create/field",
  createMachinery: "/create/machinery",
  createFieldCultivation: "/create/field-cultivation",
  updateFarm: "/update/farm/:id",
  updateField: "/update/field/:id",
  updateMachinery: "/update/machinery/:id",
  updateFieldCultivation: "/update/machinery/:id",
  reportingMostMachineries: "/reporting/most-machineries",
  reportingFieldCropsFarms: "/reporting/field-by-crops-and-farms",
  reportingMostCommonSoil: "/reporting/most-common-soil",
  notFound: "*",
};
