import React from "react";
import {
  CancelButtonPopup,
  DeleteButtonPopup,
  DeletePopup,
} from "../../../styles/DeletePopup.styled";
import { SubTitle, Title } from "../../../styles/Global.styled";

interface PopupDeleteProps {
  title: string;
  message: string;
  onDelete: () => void;
  onCancel: () => void;
}

export const PopupDelete: React.FC<PopupDeleteProps> = ({
  title,
  message,
  onDelete,
  onCancel,
}) => {
  return (
    <DeletePopup>
      <Title>{title}</Title>
      <SubTitle>{message}</SubTitle>
      <DeleteButtonPopup onClick={onDelete}>Delete</DeleteButtonPopup>
      <CancelButtonPopup onClick={onCancel}>Cancel</CancelButtonPopup>
    </DeletePopup>
  );
};
