import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Main } from "./components/MainLayout/Main/Main";
import { Login } from "./components/pages/Login/Login";
import { Register } from "./components/pages/Register/Register";
import { CatalogFarm } from "./components/pages/Catalog/CatalogFarm/CatalogFarm";
import { CatalogField } from "./components/pages/Catalog/CatalogField/CatalogField";
import { CatalogMachinery } from "./components/pages/Catalog/CatalogMachinery/CatalogMachinery";
import { CatalogFieldCultivation } from "./components/pages/Catalog/CatalogFieldCultivation/CatalogFieldCultivation";
import { CreateFarm } from "./components/pages/Create/CreateFarm/CreateFarm";
import { CreateField } from "./components/pages/Create/CreateField/CreateField";
import { CreateMachinery } from "./components/pages/Create/CreateMachinery/CreateMachinery";
import { CreateFieldCultivation } from "./components/pages/Create/CreateFieldCultivation/CreateFieldCultivation";
import { UpdateFarm } from "./components/pages/Update/UpdateFarm/UpdateFarm";
import { UpdateField } from "./components/pages/Update/UpdateField/UpdateField";
import { UpdateMachinery } from "./components/pages/Update/UpdateMachinery/UpdateMachinery";
import { UpdateFieldCultivation } from "./components/pages/Update/UpdateFieldCultivation/UpdateFieldCultivation";
import { MostMachinery } from "./components/pages/Reporting/MostMachinery/MostMachinery";
import { FieldByCropsAndFarms } from "./components/pages/Reporting/FieldByCropsAndFarms/FieldByCropsAndFarms";
import { MostCommonSoil } from "./components/pages/Reporting/MostCommonSoil/MostCommonSoil";
import { NotFound } from "./components/pages/NotFound/NotFound";
import { routes } from "./routes/routes.static";

function App() {
  return (
    <BrowserRouter>
      <Main>
        <Routes>
          {/* Auth components */}
          <Route path={routes.register} element={<Register />} />
          <Route path={routes.login} element={<Login />} />
          {/* Catalog components */}
          <Route path={routes.catalogFarm} element={<CatalogFarm />} />
          <Route path={routes.catalogField} element={<CatalogField />} />
          <Route
            path={routes.catalogMachinery}
            element={<CatalogMachinery />}
          />
          <Route
            path={routes.catalogFieldCultivation}
            element={<CatalogFieldCultivation />}
          />
          {/* Create components */}
          <Route path={routes.createFarm} element={<CreateFarm />} />
          <Route path={routes.createField} element={<CreateField />} />
          <Route path={routes.createMachinery} element={<CreateMachinery />} />
          <Route
            path={routes.createFieldCultivation}
            element={<CreateFieldCultivation />}
          />
          {/* Update components */}
          <Route path={routes.updateFarm} element={<UpdateFarm />} />
          <Route path={routes.updateField} element={<UpdateField />} />
          <Route path={routes.updateMachinery} element={<UpdateMachinery />} />
          <Route
            path={routes.updateFieldCultivation}
            element={<UpdateFieldCultivation />}
          />
          {/* Reporting components */}
          <Route
            path={routes.reportingMostMachineries}
            element={<MostMachinery />}
          />
          <Route
            path={routes.reportingFieldCropsFarms}
            element={<FieldByCropsAndFarms />}
          />
          <Route
            path={routes.reportingMostCommonSoil}
            element={<MostCommonSoil />}
          />
          {/* Not Found component */}
          <Route path={routes.notFound} element={<NotFound />} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
}

export default App;
