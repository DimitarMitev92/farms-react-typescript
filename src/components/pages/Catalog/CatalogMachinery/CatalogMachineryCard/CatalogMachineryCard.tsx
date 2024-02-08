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
import { CardMachineryProps } from "./CatalogMachineryCard.static";

export const MachineryCard: React.FC<CardMachineryProps> = ({
  machinery,
  userRights,
  handleUpdate,
  handleSoftDelete,
  handlePermDelete,
}) => {
  return (
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
  );
};
