import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

export const Logout = () => {
  const navigate = useNavigate();

  const { removeItem } = useLocalStorage();

  const { setUser } = useContext(UserContext);
  useEffect(() => {
    setUser(null);
    removeItem("user");
    navigate("/auth/login");
  }, []);

  return <div></div>;
};
