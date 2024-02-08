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
import { fetchMachinery } from "./CatalogMachinery.logic";
import { rightsOfUser } from "../../../../utils/helpers";
import { MachineryFromApi } from "./CatalogMachinery.static";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Search } from "../../../Search/Search";
import { MachineryCard } from "./CatalogMachineryCard/CatalogMachineryCard";

export const CatalogMachinery = () => {
  const [machineries, setMachineries] = useState<MachineryFromApi[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [triggerDelete, setTriggerDelete] = useState(false);
  const [showSoftDeletePopup, setShowSoftDeletePopup] = useState(false);
  const [showPermDeletePopup, setShowPermDeletePopup] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");
  const [userRights, setUserRights] = useState<
    "OWNER" | "OPERATOR" | "VIEWER" | null
  >(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMachineries, setFilteredMachineries] = useState<
    MachineryFromApi[]
  >([]);

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (user) {
          const machineriesData = await fetchMachinery(user);
          setUserRights(rightsOfUser(user));
          setMachineries(machineriesData ?? []);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching machineries");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, triggerDelete]);

  useEffect(() => {
    setFilteredMachineries(
      machineries.filter((machinery) =>
        machinery.identificationNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [machineries, searchTerm]);

  const handleUpdate = (id: string) => {
    navigate(`${update.MACHINERY}/${id}`);
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
        await softDelete(deleteItemId, user, endpoint.MACHINERY);
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
        await permDelete(deleteItemId, user, endpoint.MACHINERY);
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

  if (machineries.length === 0) {
    return (
      <ColumnContainer>
        <SubTitle>There are no machinery to display.</SubTitle>
        <Button onClick={() => navigate(`${create.MACHINERY}`)}>Create</Button>
      </ColumnContainer>
    );
  }

  return (
    <CardsWrapper>
      <Title>Catalog Machineries</Title>

      <Search
        text="text"
        placeholder="Search by machinery id..."
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <CatalogContainer>
        {filteredMachineries.map((machinery) => (
          <MachineryCard
            key={machinery.id}
            machinery={machinery}
            userRights={userRights}
            handleUpdate={handleUpdate}
            handleSoftDelete={handleSoftDelete}
            handlePermDelete={handlePermDelete}
          />
        ))}
        {filteredMachineries.length === 0 && (
          <SubTitle>A machinery with that id does not exist.</SubTitle>
        )}
      </CatalogContainer>

      {showSoftDeletePopup && (
        <PopupDelete
          title={`Confirm Soft Deletion`}
          message={`Are you sure you want to soft delete this machinery?`}
          onDelete={handleConfirmSoftDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {showPermDeletePopup && (
        <PopupDelete
          title={`Confirm Permanent Deletion`}
          message={`Are you sure you want to permanently delete this machinery?`}
          onDelete={handleConfirmPermDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </CardsWrapper>
  );
};
