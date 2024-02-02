import { useContext, useEffect, useState } from "react";

import { FarmCard } from "./CatalogFarmCard/CatalogFarmCard";
import { UserContext } from "../../../../context/UserContext";
import { Farm } from "./CatalogFarmCard/CatalogFarmCard.static";
import { CatalogContainer } from "../../../../styles/Card.styled";
import { fetchFarms } from "./CatalogFarm.logic";
import { ApiError } from "./CatalogFarm.static";
import { useNavigate } from "react-router-dom";
import { permDelete, softDelete } from "../../../../services/deleteService";
import {
  Button,
  ColumnContainer,
  SubTitle,
  Title,
} from "../../../../styles/Global.styled";
import { SkeletonCatalog } from "../../Skeleton/SkeletonCatalogMachinery";
import { create, endpoint, update } from "../../../../static/endPoints";

export const CatalogFarm = () => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [triggerDelete, setTriggerDelete] = useState(false);

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (user) {
          const farms = await fetchFarms(user);
          setFarms(farms);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, triggerDelete]);

  const handleUpdate = (id: string) => {
    navigate(`${update.FARM}/${id}`);
  };

  const handleSoftDelete = async (id: string) => {
    try {
      if (user) {
        await softDelete(id, user, endpoint.FARM);
      }
      setTriggerDelete(!triggerDelete);
    } catch (error) {
      console.error(`${(error as ApiError).message}`);
    }
  };

  const handlePermDelete = async (id: string) => {
    try {
      if (user) {
        await permDelete(id, user, endpoint.FARM);
      }
      setTriggerDelete(!triggerDelete);
    } catch (error) {
      console.error(`${(error as ApiError).message}`);
    }
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
    <>
      <Title>Catalog Farms</Title>
      <CatalogContainer>
        {farms.map((farm) => (
          <FarmCard
            key={farm.id}
            farm={farm}
            onUpdate={handleUpdate}
            onSoftDelete={handleSoftDelete}
            onPermDelete={handlePermDelete}
          />
        ))}
      </CatalogContainer>
    </>
  );
};
