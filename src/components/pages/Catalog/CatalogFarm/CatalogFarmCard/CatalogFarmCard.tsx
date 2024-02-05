import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
import { FarmCardProps } from "./CatalogFarmCard.static";
import {
  ButtonContainer,
  CardContainer,
  CardInfo,
  CardTitle,
  DatesContainer,
  DatesText,
  LocationText,
  PermDeleteButtonCard,
  SoftDeleteButtonCard,
  UpdateButtonCard,
} from "../../../../../styles/Card.styled";
import { UserContext } from "../../../../../context/UserContext";
import { rightsOfUser } from "../../../../../utils/helpers";

export const FarmCard: React.FC<FarmCardProps> = ({
  farm,
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
  }, []);

  const mapCenter: LatLngLiteral = {
    lat: farm.location.coordinates[0],
    lng: farm.location.coordinates[1],
  };

  return (
    <CardContainer>
      <MapContainer center={mapCenter} zoom={13} style={{ height: "200px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={mapCenter}>
          <Popup>{farm.name}</Popup>
        </Marker>
      </MapContainer>
      <CardInfo>
        <CardTitle>Name: {farm.name}</CardTitle>
        <LocationText>
          Location: {mapCenter.lat} / {mapCenter.lng}
        </LocationText>
        <DatesContainer>
          <DatesText>
            Created at: {new Date(farm.createdAt).toLocaleDateString()}
          </DatesText>
          <DatesText>
            Updated at: {new Date(farm.createdAt).toLocaleDateString()}
          </DatesText>
        </DatesContainer>
      </CardInfo>
      <CardInfo>
        <ButtonContainer>
          {(userRights === "OWNER" || userRights === "OPERATOR") &&
            farm.id !== undefined && (
              <>
                <UpdateButtonCard onClick={() => onUpdate(farm.id!)}>
                  Update
                </UpdateButtonCard>
                <SoftDeleteButtonCard onClick={() => onSoftDelete(farm.id!)}>
                  Delete
                </SoftDeleteButtonCard>
              </>
            )}
          {userRights === "OWNER" && farm.id !== undefined && (
            <PermDeleteButtonCard onClick={() => onPermDelete(farm.id!)}>
              Perm Delete
            </PermDeleteButtonCard>
          )}
        </ButtonContainer>
      </CardInfo>
    </CardContainer>
  );
};
