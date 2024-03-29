import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = () => {
  const { user } = useContext(UserContext);
  return user?.access_token ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoutes;
