import React, { useContext, useEffect, useState } from "react";
import { FarmCard } from "./CatalogFarmCard/CatalogFarmCard";
import { UserContext } from "../../../../context/UserContext";
import { CardsWrapper, CatalogContainer } from "../../../../styles/Card.styled";
import { useNavigate } from "react-router-dom";
import { permDelete, softDelete } from "../../../../services/deleteService";
import {
  Button,
  ColumnContainer,
  SearchContainer,
  SearchInput,
  SubTitle,
  Title,
} from "../../../../styles/Global.styled";
import { SkeletonCatalog } from "../../Skeleton/SkeletonCatalog";
import { create, endpoint, method, update } from "../../../../static/endPoints";
import { ApiError, Farm } from "../../../../static/interfaces";
import { fetchDataFromApi } from "../../../../services/fetchDataFromApi";
import { PopupDelete } from "../../PopupDelete/PopupDelete";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CatalogFarm = () => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [triggerDelete, setTriggerDelete] = useState(false);
  const [showSoftDeletePopup, setShowSoftDeletePopup] = useState(false);
  const [showPermDeletePopup, setShowPermDeletePopup] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFarms, setFilteredFarms] = useState<Farm[]>([]);

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (user) {
          const fetchedData = await fetchDataFromApi(
            endpoint.FARM,
            user,
            method.GET,
            null,
            "Error fetching farms"
          );
          setFarms(fetchedData);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching farms");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, triggerDelete]);

  useEffect(() => {
    setFilteredFarms(
      farms.filter((farm) =>
        farm.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [farms, searchTerm]);

  const handleUpdate = (id: string) => {
    navigate(`${update.FARM}/${id}`);
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
        await softDelete(deleteItemId, user, endpoint.FARM);
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
        await permDelete(deleteItemId, user, endpoint.FARM);
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

  if (farms.length === 0) {
    return (
      <ColumnContainer>
        <SubTitle>There are no farms to display.</SubTitle>
        <Button onClick={() => navigate(`${create.FARM}`)}>Create</Button>
      </ColumnContainer>
    );
  }

  return (
    <CardsWrapper>
      <Title>Catalog Farms</Title>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search by farm name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>

      <CatalogContainer>
        {filteredFarms.map((farm) => (
          <FarmCard
            key={farm.id}
            farm={farm}
            onUpdate={handleUpdate}
            onSoftDelete={handleSoftDelete}
            onPermDelete={handlePermDelete}
          />
        ))}
        {filteredFarms.length === 0 && (
          <SubTitle>A farm with that name does not exist.</SubTitle>
        )}
      </CatalogContainer>

      {showSoftDeletePopup && (
        <PopupDelete
          title={`Confirm Soft Deletion`}
          message={`Are you sure you want to soft delete this farm?`}
          onDelete={handleConfirmSoftDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {showPermDeletePopup && (
        <PopupDelete
          title={`Confirm Permanent Deletion`}
          message={`Are you sure you want to permanently delete this farm?`}
          onDelete={handleConfirmPermDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </CardsWrapper>
  );
};
