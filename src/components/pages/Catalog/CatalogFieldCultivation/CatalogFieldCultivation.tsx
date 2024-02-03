import { useContext, useEffect, useState } from "react";
import { FieldCultivationFroApi } from "./CatalogFieldCultivation.static";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../context/UserContext";
import { fetchFieldCultivation } from "./CatalogFieldCultivation.logic";
import { rightsOfUser } from "../../../../utils/helpers";
import { permDelete, softDelete } from "../../../../services/deleteService";
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
import { SkeletonCatalog } from "../../Skeleton/SkeletonCatalogMachinery";
import { create, endpoint, update } from "../../../../static/endPoints";
import { ApiError } from "../../../../static/interfaces";
import { PopupDelete } from "../../PopupDelete/PopupDelete";

export const CatalogFieldCultivation = () => {
  const [fieldCultivations, setFieldCultivations] = useState<
    FieldCultivationFroApi[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [triggerDelete, setTriggerDelete] = useState(false);
  const [showSoftDeletePopup, setShowSoftDeletePopup] = useState(false);
  const [showPermDeletePopup, setShowPermDeletePopup] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");
  const [userRights, setUserRights] = useState<
    "OWNER" | "OPERATOR" | "VIEWER" | null
  >(null);

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (user) {
          const fieldCultivationData = await fetchFieldCultivation(user);
          setUserRights(rightsOfUser(user));
          setFieldCultivations(fieldCultivationData ?? []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, triggerDelete]);

  const handleUpdate = (id: string) => {
    navigate(`${update.FIELD_CULTIVATION}/${id}`);
  };

  const handleSoftDelete = async (id: string) => {
    setDeleteItemId(id);
    setShowSoftDeletePopup(true);
  };

  const handlePermDelete = async (id: string) => {
    setDeleteItemId(id);
    setShowPermDeletePopup(true);
  };

  const handleConfirmSoftDelete = async () => {
    try {
      if (user) {
        await softDelete(deleteItemId, user, endpoint.FIELD_CULTIVATION);
      }
      setTriggerDelete(!triggerDelete);
      setShowSoftDeletePopup(false);
    } catch (error) {
      console.error(`${(error as ApiError).message}`);
    }
  };

  const handleConfirmPermDelete = async () => {
    try {
      if (user) {
        await permDelete(deleteItemId, user, endpoint.FIELD_CULTIVATION);
      }
      setTriggerDelete(!triggerDelete);
      setShowPermDeletePopup(false);
    } catch (error) {
      console.error(`${(error as ApiError).message}`);
    }
  };

  const handleCancelDelete = () => {
    setShowSoftDeletePopup(false);
    setShowPermDeletePopup(false);
  };

  if (isLoading) {
    return <SkeletonCatalog />;
  }

  if (fieldCultivations.length === 0) {
    return (
      <ColumnContainer>
        <SubTitle>There are no field cultivations to display.</SubTitle>
        <Button onClick={() => navigate(`${create.FIELD_CULTIVATION}`)}>
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

      {showSoftDeletePopup && (
        <PopupDelete
          title={`Confirm Soft Deletion`}
          message={`Are you sure you want to soft delete this field cultivation?`}
          onDelete={handleConfirmSoftDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {showPermDeletePopup && (
        <PopupDelete
          title={`Confirm Permanent Deletion`}
          message={`Are you sure you want to permanently delete this field cultivation?`}
          onDelete={handleConfirmPermDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};
