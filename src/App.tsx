import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Main } from "./components/MainLayout/Main/Main";
import { Login } from "./components/pages/Login/Login";
import { Register } from "./components/pages/Register/Register";
import { Logout } from "./components/pages/Logout/Logout";
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

import { UserContext } from "./context/UserContext";
import PrivateRoutes from "./guards/PrivateRoutes";
import { UserDataFromApi } from "./static/interfaces";
import { ToastContainer } from "react-toastify";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Spinner, SpinnerContainer } from "./styles/Global.styled";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import { OwnerRoute } from "./guards/OwnerRoute";

function App() {
  const [user, setUser] = useState<UserDataFromApi | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const storedUser = getItem("user");
    const storedToken = getItem("token");
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      const parsedToken = JSON.parse(storedToken);

      const expirationTime = parsedToken?.expires_in || 0;
      const currentTime = Math.floor(Date.now() / 1000);

      if (currentTime > expirationTime) {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      } else {
        setUser({ user: parsedUser, access_token: parsedToken });
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Main>
          <Routes>
            {user ? (
              <Route
                path={routes.main}
                element={<Navigate to={routes.catalogFarm} replace />}
              />
            ) : (
              <Route
                path={routes.main}
                element={<Navigate to={routes.catalogFarm} replace />}
              />
            )}

            {/* Auth components */}
            <Route path={routes.register} element={<Register />} />
            <Route path={routes.login} element={<Login />} />
            <Route element={<PrivateRoutes />}>
              <Route
                path={routes.dashboard}
                element={<OwnerRoute element={<Dashboard />} />}
              />
              <Route path={routes.logout} element={<Logout />} />
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
              <Route
                path={routes.createMachinery}
                element={<CreateMachinery />}
              />
              <Route
                path={routes.createFieldCultivation}
                element={<CreateFieldCultivation />}
              />
              {/* Update components */}
              <Route path={routes.updateFarm} element={<UpdateFarm />} />
              <Route path={routes.updateField} element={<UpdateField />} />
              <Route
                path={routes.updateMachinery}
                element={<UpdateMachinery />}
              />
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
            </Route>
            {/* Not Found component */}
            <Route path={routes.notFound} element={<NotFound />} />
          </Routes>
        </Main>
        <ToastContainer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
