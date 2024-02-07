import React, { useContext, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { auth, catalog } from "../static/endPoints";

interface PrivateRoutesProps {
  element: ReactElement;
}

export const OwnerRoute: React.FC<PrivateRoutesProps> = ({
  element,
  ...props
}) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to={auth.LOGIN} replace />;
  }

  if (user.user.rights !== "OWNER") {
    return <Navigate to={catalog.FARM} replace />;
  }

  return React.cloneElement(element, { ...props });
};
