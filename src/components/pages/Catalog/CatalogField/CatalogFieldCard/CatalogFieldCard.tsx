import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Polygon, Tooltip } from "react-leaflet";
import { LatLngTuple } from "leaflet";
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
import { FieldCardProps } from "./CatalogFieldCard.static";
import { UserContext } from "../../../../../context/UserContext";
import { rightsOfUser } from "../../../../../utils/helpers";

const FieldCard: React.FC<FieldCardProps> = ({
  field,
  onUpdate,
  onSoftDelete,
  onPermDelete,
}) => {
  const { user } = useContext(UserContext);

  const [userRights, setUserRights] = useState<
    "OWNER" | "OPERATOR" | "VIEWER" | null
  >(null);

  useEffect(() => {
    if (user) {
      setUserRights(rightsOfUser(user));
    }
  }, [user]);

  const convertedCoordinates: LatLngTuple[][] =
    field.boundaries.coordinates.map((layer) =>
      layer.map(([lng, lat]) => [lat, lng] as LatLngTuple)
    );

  return (
    <CardContainer>
      <MapContainer
        center={convertedCoordinates[0][0]}
        zoom={13}
        style={{ height: "300px" }} // Adjusted height for better visibility
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Polygon
          positions={convertedCoordinates}
          color="#3388ff"
          fillColor="#3388ff"
        />
        <Tooltip>{field.name}</Tooltip>
      </MapContainer>
      <CardInfo>
        <CardTitle>Name: {field.name}</CardTitle>
        <CardSubTitle>Farm: {field.farm.name}</CardSubTitle>
        <CardSubTitle>Soil: {field.soil.soil}</CardSubTitle>
        <DatesContainer>
          <DatesText>
            Created at: {new Date(field.createdAt).toLocaleDateString()}
          </DatesText>
          <DatesText>
            Updated at: {new Date(field.updatedAt).toLocaleDateString()}
          </DatesText>
        </DatesContainer>
      </CardInfo>
      <CardInfo>
        <ButtonContainer>
          {(userRights === "OWNER" || userRights === "OPERATOR") && (
            <>
              <UpdateButtonCard onClick={() => onUpdate(field.id)}>
                Update
              </UpdateButtonCard>
              <SoftDeleteButtonCard onClick={() => onSoftDelete(field.id)}>
                Delete
              </SoftDeleteButtonCard>
            </>
          )}
          {userRights === "OWNER" && (
            <PermDeleteButtonCard onClick={() => onPermDelete(field.id)}>
              Perm Delete
            </PermDeleteButtonCard>
          )}
        </ButtonContainer>
      </CardInfo>
    </CardContainer>
  );
};

export default FieldCard;
