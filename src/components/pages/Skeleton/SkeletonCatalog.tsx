import Skeleton from "react-loading-skeleton";
import {
  ButtonContainer,
  CardInfo,
  DatesContainer,
  PermDeleteButtonCard,
  SoftDeleteButtonCard,
  UpdateButtonCard,
} from "../../../styles/Card.styled";
import {
  SkeletonContainer,
  SkeletonDateText,
  SkeletonSubtitle,
  SkeletonTitle,
  SkeletonWrapper,
} from "../../../styles/Skeleton.styled";

export const SkeletonCatalog = () => {
  return (
    <SkeletonWrapper>
      {Array.from({ length: 3 }).map((_, index) => (
        <SkeletonContainer key={index}>
          <CardInfo>
            <SkeletonTitle />
            <SkeletonSubtitle />
            <SkeletonSubtitle />
            <SkeletonSubtitle />
            <DatesContainer>
              <SkeletonDateText />
              <SkeletonDateText />
            </DatesContainer>
          </CardInfo>
          <CardInfo>
            <ButtonContainer>
              <UpdateButtonCard disabled>
                <Skeleton width={50} />
              </UpdateButtonCard>
              <SoftDeleteButtonCard disabled>
                <Skeleton width={50} />
              </SoftDeleteButtonCard>
              <PermDeleteButtonCard disabled>
                <Skeleton width={50} />
              </PermDeleteButtonCard>
            </ButtonContainer>
          </CardInfo>
        </SkeletonContainer>
      ))}
    </SkeletonWrapper>
  );
};
