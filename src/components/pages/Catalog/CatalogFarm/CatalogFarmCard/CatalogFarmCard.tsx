import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
import { FarmCardProps } from "./CatalogFarmCard.static";
import {
  ButtonContainer,
  DatesContainer,
  DatesText,
  FarmCardContainer,
  FarmCardInfo,
  FarmCardTitle,
  FarmLocationText,
  PermDeleteButtonFarm,
  SoftDeleteButtonFarm,
  UpdateButtonFarm,
} from "../../../../../styles/Card.styled";

export const FarmCard: React.FC<FarmCardProps> = ({
  farm,
  onUpdate,
  onSoftDelete,
  onPermDelete,
}) => {
  const mapCenter: LatLngLiteral = {
    lat: farm.location.coordinates[0],
    lng: farm.location.coordinates[1],
  };

  return (
    <FarmCardContainer>
      <MapContainer center={mapCenter} zoom={13} style={{ height: "200px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={mapCenter}>
          <Popup>{farm.name}</Popup>
        </Marker>
      </MapContainer>
      <FarmCardInfo>
        <FarmCardTitle>Name: {farm.name}</FarmCardTitle>
        <FarmLocationText>
          Location: {mapCenter.lat} / {mapCenter.lng}
        </FarmLocationText>
        <DatesContainer>
          <DatesText>
            Created at: {new Date(farm.createdAt).toLocaleDateString()}
          </DatesText>
          <DatesText>
            Updated at: {new Date(farm.createdAt).toLocaleDateString()}
          </DatesText>
        </DatesContainer>
      </FarmCardInfo>
      <FarmCardInfo>
        <ButtonContainer>
          <UpdateButtonFarm onClick={() => onUpdate(farm.id)}>
            Update
          </UpdateButtonFarm>
          <SoftDeleteButtonFarm onClick={() => onSoftDelete(farm.id)}>
            Soft Delete
          </SoftDeleteButtonFarm>
          <PermDeleteButtonFarm onClick={() => onPermDelete(farm.id)}>
            Perm Delete
          </PermDeleteButtonFarm>
        </ButtonContainer>
      </FarmCardInfo>
    </FarmCardContainer>
  );
};
