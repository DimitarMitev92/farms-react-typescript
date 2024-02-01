import { useContext, useEffect, useState } from "react";
import {
  API_FIELD_CULTIVATION_URL,
  FieldCultivationFroApi,
} from "./CatalogFieldCultivation.static";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../context/UserContext";
import { fetchFieldCultivation } from "./CatalogFieldCultivation.logic";
import { rightsOfUser } from "../../../../utils/helpers";
import { permDelete, softDelete } from "../../../../services/deleteService";
import { ApiError } from "../CatalogFarm/CatalogFarm.static";
import {
  Button,
  ColumnContainer,
  SubTitle,
  Title,
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

export const CatalogFieldCultivation = () => {
  const [fieldCultivations, setFieldCultivations] = useState<
    FieldCultivationFroApi[]
  >([]);
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
          const fieldCultivationData = await fetchFieldCultivation(user);
          setUserRights(rightsOfUser(user));
          setFieldCultivations(fieldCultivationData ?? []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user, triggerDelete]);

  const handleUpdate = (id: string) => {
    navigate(`/update/field-cultivation/${id}`);
  };

  const handleSoftDelete = async (id: string) => {
    try {
      if (user) {
        await softDelete(id, user, API_FIELD_CULTIVATION_URL);
        setTriggerDelete(!triggerDelete);
      }
    } catch (error) {
      console.error(`${(error as ApiError).message}`);
    }
  };

  const handlePermDelete = async (id: string) => {
    try {
      if (user) {
        await permDelete(id, user, API_FIELD_CULTIVATION_URL);
        setTriggerDelete(!triggerDelete);
      }
    } catch (error) {
      console.error(`${(error as ApiError).message}`);
    }
  };

  if (fieldCultivations.length === 0) {
    return (
      <ColumnContainer>
        <SubTitle>There are no field cultivations to display.</SubTitle>
        <Button onClick={() => navigate("/create/field-cultivation")}>
          Create
        </Button>
      </ColumnContainer>
    );
  }

  return (
    <>
      <Title>Catalog Field cultivations</Title>
      <CatalogContainer>
        {fieldCultivations.map((fieldCultivation) => (
          <CardContainer key={fieldCultivation.id}>
            <CardInfo>
              <CardTitle>
                Field: {fieldCultivation.field && fieldCultivation.field.name}
              </CardTitle>
              <CardSubTitle>
                Crop: {fieldCultivation.crop && fieldCultivation.crop.crop}
              </CardSubTitle>
              <CardSubTitle>
                Cultivation:
                {fieldCultivation.cultivation &&
                  fieldCultivation.cultivation.cultivation}
              </CardSubTitle>
              <CardSubTitle>
                Machinery id:
                {fieldCultivation.machinery &&
                  fieldCultivation.machinery.identificationNumber}
              </CardSubTitle>
              {fieldCultivation.startingDate && (
                <DatesText>
                  Starting date:
                  {new Date(fieldCultivation.startingDate).toLocaleDateString()}
                </DatesText>
              )}

              <DatesContainer>
                <DatesText>
                  Created at:
                  {new Date(fieldCultivation.createdAt).toLocaleDateString()}
                </DatesText>
                <DatesText>
                  Updated at:
                  {new Date(fieldCultivation.updatedAt).toLocaleDateString()}
                </DatesText>
              </DatesContainer>
            </CardInfo>
            <CardInfo>
              <ButtonContainer>
                {(userRights === "OWNER" || userRights === "OPERATOR") && (
                  <>
                    <UpdateButtonCard
                      onClick={() => handleUpdate(fieldCultivation.id)}
                    >
                      Update
                    </UpdateButtonCard>
                    <SoftDeleteButtonCard
                      onClick={() => handleSoftDelete(fieldCultivation.id)}
                    >
                      Delete
                    </SoftDeleteButtonCard>
                  </>
                )}
                {userRights === "OWNER" && (
                  <PermDeleteButtonCard
                    onClick={() => handlePermDelete(fieldCultivation.id)}
                  >
                    Perm Delete
                  </PermDeleteButtonCard>
                )}
              </ButtonContainer>
            </CardInfo>
          </CardContainer>
        ))}
      </CatalogContainer>
    </>
  );
};
