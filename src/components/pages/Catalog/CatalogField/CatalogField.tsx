import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { CatalogContainer } from "../../../../styles/Card.styled";
import FieldCard from "./CatalogFieldCard/CatalogFieldCard";
import { FieldFromApi } from "./CatalogField.static";
import { fetchFields } from "./CatalogField.logic";
import { useNavigate } from "react-router-dom";
import { permDelete, softDelete } from "../../../../services/deleteService";
import {
  Button,
  ColumnContainer,
  SubTitle,
  Title,
} from "../../../../styles/Global.styled";
import { SkeletonCatalog } from "../../Skeleton/SkeletonCatalog";
import { create, endpoint, update } from "../../../../static/endPoints";
import { ApiError } from "../../../../static/interfaces";
import { PopupDelete } from "../../PopupDelete/PopupDelete";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CatalogField = () => {
  const [fields, setFields] = useState<FieldFromApi[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [triggerDelete, setTriggerDelete] = useState(false);
  const [showSoftDeletePopup, setShowSoftDeletePopup] = useState(false);
  const [showPermDeletePopup, setShowPermDeletePopup] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (user) {
          const fields = await fetchFields(user);
          setFields(fields);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching fields");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, triggerDelete]);

  const handleUpdate = (id: string) => {
    navigate(`${update.FIELD}/${id}`);
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
        await softDelete(deleteItemId, user, endpoint.FIELD);
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
        await permDelete(deleteItemId, user, endpoint.FIELD);
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

  if (fields.length === 0) {
    return (
      <ColumnContainer>
        <SubTitle>There are no fields to display.</SubTitle>
        <Button onClick={() => navigate(`${create.FIELD}`)}>Create</Button>
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

      {showSoftDeletePopup && (
        <PopupDelete
          title={`Confirm Soft Deletion`}
          message={`Are you sure you want to soft delete this field?`}
          onDelete={handleConfirmSoftDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {showPermDeletePopup && (
        <PopupDelete
          title={`Confirm Permanent Deletion`}
          message={`Are you sure you want to permanently delete this field?`}
          onDelete={handleConfirmPermDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};
