import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { fetchMachinery } from "./CatalogMachinery.logic";
import { permDelete, softDelete } from "../../../../services/deleteService";
import { ApiError } from "../CatalogFarm/CatalogFarm.static";
import { API_MACHINERY_URL, MachineryFromApi } from "./CatalogMachinery.static";
import {
  Button,
  ColumnContainer,
  SubTitle,
} from "../../../../styles/Global.styled";
import {
  ButtonContainer,
  CardContainer,
  CardInfo,
  CardSubTitle,
  CardTitle,
  CatalogContainer,
  DatesContainer,
  DatesText,
  PermDeleteButtonCard,
  SoftDeleteButtonCard,
  UpdateButtonCard,
} from "../../../../styles/Card.styled";
import { rightsOfUser } from "../../../../utils/helpers";

export const CatalogMachinery = () => {
  const [machineries, setMachineries] = useState<MachineryFromApi[]>([]);
  const [triggerDelete, setTriggerDelete] = useState(false);
  const [userRights, setUserRights] = useState<
    "OWNER" | "OPERATOR" | "VIEWER" | null
  >(null);

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const machineriesData = await fetchMachinery(user);
          setUserRights(rightsOfUser(user));
          setMachineries(machineriesData ?? []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user, triggerDelete]);

  const handleUpdate = (id: string) => {
    navigate(`/update/machinery/${id}`);
  };

  const handleSoftDelete = async (id: string) => {
    try {
      if (user) {
        await softDelete(id, user, API_MACHINERY_URL);
        setTriggerDelete(!triggerDelete);
      }
    } catch (error) {
      console.error(`${(error as ApiError).message}`);
    }
  };

  const handlePermDelete = async (id: string) => {
    try {
      if (user) {
        await permDelete(id, user, API_MACHINERY_URL);
        setTriggerDelete(!triggerDelete);
      }
    } catch (error) {
      console.error(`${(error as ApiError).message}`);
    }
  };

  if (machineries.length === 0) {
    return (
      <ColumnContainer>
        <SubTitle>There are no machinery to display.</SubTitle>
        <Button onClick={() => navigate("/create/machinery")}>Create</Button>
      </ColumnContainer>
    );
  }

  return (
    <CatalogContainer>
      {machineries.map((machinery) => (
        <CardContainer key={machinery.id}>
          <CardInfo>
            <CardTitle>Brand: {machinery.brand}</CardTitle>
            <CardSubTitle>Model: {machinery.model}</CardSubTitle>
            <CardSubTitle>
              Farm: {machinery.farm && machinery.farm.name}
            </CardSubTitle>

            <CardSubTitle>
              Identification number: {machinery.identificationNumber}
            </CardSubTitle>
            <DatesContainer>
              <DatesText>
                Created at: {new Date(machinery.createdAt).toLocaleDateString()}
              </DatesText>
              <DatesText>
                Updated at: {new Date(machinery.updatedAt).toLocaleDateString()}
              </DatesText>
            </DatesContainer>
          </CardInfo>
          <CardInfo>
            <ButtonContainer>
              {(userRights === "OWNER" || userRights === "OPERATOR") && (
                <>
                  <UpdateButtonCard onClick={() => handleUpdate(machinery.id)}>
                    Update
                  </UpdateButtonCard>
                  <SoftDeleteButtonCard
                    onClick={() => handleSoftDelete(machinery.id)}
                  >
                    Delete
                  </SoftDeleteButtonCard>
                </>
              )}
              {userRights === "OWNER" && (
                <PermDeleteButtonCard
                  onClick={() => handlePermDelete(machinery.id)}
                >
                  Perm Delete
                </PermDeleteButtonCard>
              )}
            </ButtonContainer>
          </CardInfo>
        </CardContainer>
      ))}
    </CatalogContainer>
  );
};
