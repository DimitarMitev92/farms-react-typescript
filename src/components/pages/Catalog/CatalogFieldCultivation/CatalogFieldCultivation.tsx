import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  ColumnContainer,
  SubTitle,
  Title,
} from "../../../../styles/Global.styled";
import { CardsWrapper, CatalogContainer } from "../../../../styles/Card.styled";
import { useNavigate } from "react-router-dom";
import { permDelete, softDelete } from "../../../../services/deleteService";
import { SkeletonCatalog } from "../../Skeleton/SkeletonCatalog";
import { create, endpoint, update } from "../../../../static/endPoints";
import { ApiError } from "../../../../static/interfaces";
import { PopupDelete } from "../../PopupDelete/PopupDelete";
import { UserContext } from "../../../../context/UserContext";
import { fetchFieldCultivation } from "./CatalogFieldCultivation.logic";
import { rightsOfUser } from "../../../../utils/helpers";
import { FieldCultivationFroApi } from "./CatalogFieldCultivation.static";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Search } from "../../../Search/Search";
import { FieldCultivationCard } from "./CatalogFieldCultivationCard/CatalogFieldCultivationCard";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFieldCultivations, setFilteredFieldCultivations] = useState<
    FieldCultivationFroApi[]
  >([]);

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
        toast.error("Error fetching field cultivations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, triggerDelete]);

  useEffect(() => {
    setFilteredFieldCultivations(
      fieldCultivations.filter((fieldCultivation) =>
        fieldCultivation.field.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [fieldCultivations, searchTerm]);

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
      toast.error(`${(error as ApiError).message}`);
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
      toast.error(`${(error as ApiError).message}`);
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
    <CardsWrapper>
      <Title>Catalog Field Cultivations</Title>

      <Search
        text="text"
        placeholder="Search by field name..."
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <CatalogContainer>
        {filteredFieldCultivations.map((fieldCultivation) => (
          <FieldCultivationCard
            key={fieldCultivation.id}
            fieldCultivation={fieldCultivation}
            userRights={userRights}
            handleUpdate={handleUpdate}
            handleSoftDelete={handleSoftDelete}
            handlePermDelete={handlePermDelete}
          />
        ))}
        {filteredFieldCultivations.length === 0 && (
          <SubTitle>A field with that name does not exist.</SubTitle>
        )}
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
    </CardsWrapper>
  );
};
