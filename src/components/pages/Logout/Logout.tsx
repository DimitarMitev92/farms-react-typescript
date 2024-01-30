import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useEffect } from "react";

export const Logout = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  useEffect(() => {
    logout();
    navigate("/auth/login");
  }, [logout, navigate]);

  return <div></div>;
};
