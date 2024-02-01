import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { CatalogContainer } from "../../../../styles/Card.styled";
import FieldCard from "./CatalogFieldCard/CatalogFieldCard";
import { FieldFromApi } from "./CatalogField.static";
import { fetchFields } from "./CatalogField.logic";
import { useNavigate } from "react-router-dom";
import { permDelete, softDelete } from "../../../../services/deleteService";
import { API_CREATE_FIELD_URL } from "../../Create/CreateField/CreateField.static";
import { ApiError } from "../CatalogFarm/CatalogFarm.static";
import {
  Button,
  ColumnContainer,
  SubTitle,
  Title,
} from "../../../../styles/Global.styled";

export const CatalogField = () => {
  const [fields, setFields] = useState<FieldFromApi[]>([]);
  const [triggerDelete, setTriggerDelete] = useState(false);

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const fields = await fetchFields(user);
          setFields(fields);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user, triggerDelete]);

  const handleUpdate = (id: string) => {
    navigate(`/update/farm/${id}`);
  };

  const handleSoftDelete = async (id: string) => {
    try {
      if (user) {
        await softDelete(id, user, API_CREATE_FIELD_URL);
        setTriggerDelete(!triggerDelete);
      }
    } catch (error) {
      console.error(`${(error as ApiError).message}`);
    }
  };

  const handlePermDelete = async (id: string) => {
    try {
      if (user) {
        await permDelete(id, user, API_CREATE_FIELD_URL);
        setTriggerDelete(!triggerDelete);
      }
    } catch (error) {
      console.error(`${(error as ApiError).message}`);
    }
  };

  if (fields.length === 0) {
    return (
      <ColumnContainer>
        <SubTitle>There are no fields to display.</SubTitle>
        <Button onClick={() => navigate("/create/field")}>Create</Button>
      </ColumnContainer>
    );
  }

  return (
    <>
      <Title>Catalog Fields</Title>
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
    </>
  );
};
