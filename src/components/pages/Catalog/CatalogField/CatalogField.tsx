import React, { useContext, useEffect, useMemo, useState } from "react";
import FieldCard from "./CatalogFieldCard/CatalogFieldCard";
import { UserContext } from "../../../../context/UserContext";
import { CardsWrapper, CatalogContainer } from "../../../../styles/Card.styled";
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
import { FieldFromApi } from "./CatalogField.static";
import { Search } from "../../../Search/Search";
import { fetchFields } from "./CatalogField.logic";

export const CatalogField = () => {
  const [fields, setFields] = useState<FieldFromApi[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [triggerDelete, setTriggerDelete] = useState(false);
  const [showSoftDeletePopup, setShowSoftDeletePopup] = useState(false);
  const [showPermDeletePopup, setShowPermDeletePopup] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredFieldMemo = useMemo(() => {
    return fields.filter((field) =>
      field.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [fields, searchTerm]);

  const fieldCardsMemo = useMemo(() => {
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

    return filteredFieldMemo.map((field) => (
      <FieldCard
        key={field.id}
        field={field}
        onUpdate={handleUpdate}
        onSoftDelete={handleSoftDelete}
        onPermDelete={handlePermDelete}
      />
    ));
  }, [filteredFieldMemo]);

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
    <CardsWrapper>
      <Title>Catalog Fields</Title>

      <Search
        text="text"
        placeholder="Search by field name..."
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <CatalogContainer>
        {fieldCardsMemo}
        {filteredFieldMemo.length === 0 && (
          <SubTitle>A field with that name does not exist.</SubTitle>
        )}
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
    </CardsWrapper>
  );
};
