import React from "react";
import {
  ButtonContainer,
  CardContainer,
  CardInfo,
  CardSubTitle,
  CardTitle,
  DatesContainer,
  DatesText,
  PermDeleteButtonCard,
  SoftDeleteButtonCard,
  UpdateButtonCard,
} from "../../../../../styles/Card.styled";
import { CardContainerProps } from "./CatalogFieldCultivationCard.static";

export const FieldCultivationCard: React.FC<CardContainerProps> = ({
  fieldCultivation,
  userRights,
  handleUpdate,
  handleSoftDelete,
  handlePermDelete,
}) => {
  return (
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
          Machinery:
          {fieldCultivation.machinery &&
            `${fieldCultivation.machinery.brand} ${fieldCultivation.machinery.model} - ${fieldCultivation.machinery.identificationNumber}`}
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
  );
};
