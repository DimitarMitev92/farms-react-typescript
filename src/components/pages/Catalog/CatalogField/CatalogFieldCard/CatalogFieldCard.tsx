import React from "react";
import { MapContainer, TileLayer, Polygon, Tooltip } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import {
  ButtonContainer,
  DatesContainer,
  DatesText,
  FarmCardContainer,
  FarmCardInfo,
  FarmCardSubTitle,
  FarmCardTitle,
  PermDeleteButtonFarm,
  SoftDeleteButtonFarm,
  UpdateButtonFarm,
} from "../../../../../styles/Card.styled";

interface FieldCardProps {
  field: {
    id: string;
    name: string;
    boundaries: {
      coordinates: number[][][];
      type: string;
    };
    soilId: string;
    farmId: string;
    farm: { name: string };
    soil: { soil: string };
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
  onUpdate: (id: string) => void;
  onSoftDelete: (id: string) => void;
  onPermDelete: (id: string) => void;
}

const FieldCard: React.FC<FieldCardProps> = ({
  field,
  onUpdate,
  onSoftDelete,
  onPermDelete,
}) => {
  const convertedCoordinates: LatLngTuple[][] =
    field.boundaries.coordinates.map(
      (layer) => layer.map((point) => [point[0], point[1]]) as LatLngTuple[]
    );

  return (
    <FarmCardContainer>
      <MapContainer
        center={convertedCoordinates[0][0]}
        zoom={13}
        style={{ height: "200px" }}
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
      <FarmCardInfo>
        <FarmCardTitle>Name: {field.name}</FarmCardTitle>
        <FarmCardSubTitle>Farm: {field.farm.name}</FarmCardSubTitle>
        <FarmCardSubTitle>Soil: {field.soil.soil}</FarmCardSubTitle>
        <DatesContainer>
          <DatesText>
            Created at: {new Date(field.createdAt).toLocaleDateString()}
          </DatesText>
          <DatesText>
            Updated at: {new Date(field.updatedAt).toLocaleDateString()}
          </DatesText>
        </DatesContainer>
      </FarmCardInfo>
      <FarmCardInfo>
        <ButtonContainer>
          <UpdateButtonFarm onClick={() => onUpdate(field.id)}>
            Update
          </UpdateButtonFarm>
          <SoftDeleteButtonFarm onClick={() => onSoftDelete(field.id)}>
            Soft Delete
          </SoftDeleteButtonFarm>
          <PermDeleteButtonFarm onClick={() => onPermDelete(field.id)}>
            Perm Delete
          </PermDeleteButtonFarm>
        </ButtonContainer>
      </FarmCardInfo>
    </FarmCardContainer>
  );
};

export default FieldCard;
