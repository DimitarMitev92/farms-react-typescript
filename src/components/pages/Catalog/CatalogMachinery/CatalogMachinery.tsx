import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { fetchMachinery } from "./CatalogMachinery.logic";
import { permDelete, softDelete } from "../../../../services/deleteService";
import { MachineryFromApi } from "./CatalogMachinery.static";
import {
  Button,
  ColumnContainer,
  SearchContainer,
  SearchInput,
  SubTitle,
  Title,
} from "../../../../styles/Global.styled";
import {
  ButtonContainer,
  CardContainer,
  CardInfo,
  CardSubTitle,
  CardTitle,
  CardsWrapper,
  CatalogContainer,
  DatesContainer,
  DatesText,
  PermDeleteButtonCard,
  SoftDeleteButtonCard,
  UpdateButtonCard,
} from "../../../../styles/Card.styled";
import { rightsOfUser } from "../../../../utils/helpers";
import { SkeletonCatalog } from "../../Skeleton/SkeletonCatalog";
import { create, endpoint, update } from "../../../../static/endPoints";
import { ApiError } from "../../../../static/interfaces";
import { PopupDelete } from "../../PopupDelete/PopupDelete";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search by machinery id..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>

      <CatalogContainer>
        {filteredMachineries.map((machinery) => (
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
                  Created at:{" "}
                  {new Date(machinery.createdAt).toLocaleDateString()}
                </DatesText>
                <DatesText>
                  Updated at:{" "}
                  {new Date(machinery.updatedAt).toLocaleDateString()}
                </DatesText>
              </DatesContainer>
            </CardInfo>
            <CardInfo>
              <ButtonContainer>
                {(userRights === "OWNER" || userRights === "OPERATOR") && (
                  <>
                    <UpdateButtonCard
                      onClick={() => handleUpdate(machinery.id)}
                    >
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
