import React, { useContext, useEffect, useState } from "react";
import { IUserFromApi } from "./Dashboard.static";
import { UserContext } from "../../../context/UserContext";
import { catalog, endpoint, method, update } from "../../../static/endPoints";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchDataFromApi } from "../../../services/fetchDataFromApi";
import {
  Button,
  ColumnContainer,
  Spinner,
  SpinnerContainer,
  SubTitle,
  Title,
} from "../../../styles/Global.styled";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeadCell,
  TableRow,
} from "../../../styles/Table.styled";
import {
  PermDeleteButtonCard,
  UpdateButtonCard,
} from "../../../styles/Card.styled";
import { PopupDelete } from "../PopupDelete/PopupDelete";
import { ApiError } from "../../../static/interfaces";
import { softDelete } from "../../../services/deleteService";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [items, setItems] = useState<IUserFromApi[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [triggerDelete, setTriggerDelete] = useState(false);
  const [isShowDeletePopup, setIsShowDeletePopup] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (user) {
          const url = `${endpoint.DASHBOARD}`;
          const fetchedData = await fetchDataFromApi(
            url,
            user,
            method.GET,
            null,
            "Error fetching users"
          );
          const usersDataWithoutCurrentUser = fetchedData.filter(
            (item: IUserFromApi) => item.email !== user.user.email
          );
          setItems(usersDataWithoutCurrentUser);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching reports");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, triggerDelete]);

  const handleUpdate = (id: string): void => {
    navigate(`${update.USER}/${id}`);
  };

  const handleDelete = (id: string): void => {
    setIsShowDeletePopup(true);
    setDeleteItemId(id);
  };

  const handlePermDelete = async () => {
    try {
      if (user) {
        await softDelete(deleteItemId, user, endpoint.DASHBOARD);
      }
      setTriggerDelete(!triggerDelete);
      setIsShowDeletePopup(false);
    } catch (error) {
      console.error(`${(error as ApiError).message}`);
      toast.error(`${(error as ApiError).message}`);
    }
  };

  const handleCancelDelete = () => {
    setIsShowDeletePopup(false);
  };

  if (isLoading) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  if (items.length === 0) {
    return (
      <ColumnContainer>
        <SubTitle>There are no users to display.</SubTitle>
        <Button onClick={() => navigate(`${catalog.FARM}`)}>Back</Button>
      </ColumnContainer>
    );
  }

  return (
    <>
      <TableContainer>
        <Title>Users</Title>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>First Name</TableHeadCell>
              <TableHeadCell>Last Name</TableHeadCell>
              <TableHeadCell>Rights</TableHeadCell>
              <TableHeadCell>Update</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>{item.rights}</TableCell>
                <TableCell>
                  <UpdateButtonCard onClick={() => handleUpdate(item.id)}>
                    Update
                  </UpdateButtonCard>
                </TableCell>
                <TableCell>
                  <PermDeleteButtonCard onClick={() => handleDelete(item.id)}>
                    Delete
                  </PermDeleteButtonCard>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isShowDeletePopup && (
        <PopupDelete
          title={`Confirm Deletion`}
          message={`Are you sure you want to delete this user?`}
          onDelete={handlePermDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default Dashboard;
