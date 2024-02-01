import { useContext, useEffect, useState } from "react";

import { FarmCard } from "./CatalogFarmCard/CatalogFarmCard";
import { UserContext } from "../../../../context/UserContext";
import { Farm } from "./CatalogFarmCard/CatalogFarmCard.static";
import { CatalogContainer } from "../../../../styles/Card.styled";
import { fetchFarms } from "./CatalogFarm.logic";

export const CatalogFarm = () => {
  const [farms, setFarms] = useState<Farm[]>([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const farms = await fetchFarms(user);
        setFarms(farms);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user]);

  const handleUpdate = (id: string) => {
    console.log(`Updating farm with id ${id}`);
  };

  const handleSoftDelete = (id: string) => {
    console.log(`Soft deleting farm with id ${id}`);
  };

  const handlePermDelete = (id: string) => {
    console.log(`Permanently deleting farm with id ${id}`);
  };

  return (
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
  );
};
