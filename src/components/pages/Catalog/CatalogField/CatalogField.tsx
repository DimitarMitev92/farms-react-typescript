import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { CatalogContainer } from "../../../../styles/Card.styled";
import FieldCard from "./CatalogFieldCard/CatalogFieldCard";
import { FieldFromApi } from "./CatalogField.static";
import { fetchFields } from "./CatalogField.logic";

export const CatalogField = () => {
  const [fields, setFields] = useState<FieldFromApi[]>([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fields = await fetchFields(user);
        console.log(fields);
        setFields(fields);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user]);

  const handleUpdate = (id: string) => {
    console.log(`Updating field with id ${id}`);
  };

  const handleSoftDelete = (id: string) => {
    console.log(`Soft deleting field with id ${id}`);
  };

  const handlePermDelete = (id: string) => {
    console.log(`Permanently deleting field with id ${id}`);
  };

  return (
    <CatalogContainer>
      {fields.map((field) => (
        <FieldCard
          key={field.id}
          field={field}
          onUpdate={handleUpdate}
          onSoftDelete={handleSoftDelete}
          onPermDelete={handlePermDelete}
        />
      ))}
    </CatalogContainer>
  );
};
