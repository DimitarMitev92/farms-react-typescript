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

function App() {
  return (
    <BrowserRouter>
      <Main>
        <Routes>
          {/* Auth components */}
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          {/* Catalog components */}
          <Route path="/catalog/farm" element={<CatalogFarm />} />
          <Route path="/catalog/field" element={<CatalogField />} />
          <Route path="/catalog/machinery" element={<CatalogMachinery />} />
          <Route
            path="/catalog/field-cultivation"
            element={<CatalogFieldCultivation />}
          />
          {/* Create components */}
          <Route path="/create/farm" element={<CreateFarm />} />
          <Route path="/create/field" element={<CreateField />} />
          <Route path="/create/machinery" element={<CreateMachinery />} />
          <Route
            path="/create/field-cultivation"
            element={<CreateFieldCultivation />}
          />
          {/* Update components */}
          <Route path="/update/farm/:id" element={<UpdateFarm />} />
          <Route path="/update/field/:id" element={<UpdateField />} />
          <Route path="/update/machinery/:id" element={<UpdateMachinery />} />
          <Route
            path="/update/field-cultivation/:id"
            element={<UpdateFieldCultivation />}
          />
          {/* Reporting components */}
          <Route
            path="/reporting/most-machineries"
            element={<MostMachinery />}
          />
          <Route
            path="/reporting/field-by-crops-and-farms"
            element={<FieldByCropsAndFarms />}
          />
          <Route
            path="/reporting/most-common-soil"
            element={<MostCommonSoil />}
          />
          {/* Not Found component */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
}

export default App;
