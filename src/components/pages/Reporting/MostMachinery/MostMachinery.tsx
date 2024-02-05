import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { endpoint, method } from "../../../../static/endPoints";
import {
  Button,
  ColumnContainer,
  Spinner,
  SpinnerContainer,
  SubTitle,
  Title,
} from "../../../../styles/Global.styled";
import { fetchDataFromApi } from "../../../../services/fetchDataFromApi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeadCell,
  TableRow,
} from "../../../../styles/Table.styled";
import { IMostMachinery } from "./MostMachinery.static";
import { useNavigate } from "react-router-dom";

export const MostMachinery = () => {
  const [items, setItems] = useState<IMostMachinery[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (user) {
          const urlReporting = `${endpoint.REPORTING}/farm/most-machineries`;
          console.log(urlReporting);
          const fetchedData = await fetchDataFromApi(
            urlReporting,
            user,
            method.GET,
            null,
            "Error fetching report"
          );
          console.log(fetchedData);
          setItems(fetchedData);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching reportings");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
        <SubTitle>There are data to display.</SubTitle>
        <Button onClick={() => navigate(`${endpoint.FARM}`)}>Home</Button>
      </ColumnContainer>
    );
  }

  return (
    <TableContainer>
      <Title>Most Machinery</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Count Machinery</TableHeadCell>
            <TableHeadCell>Farm ID</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.countmachinery}</TableCell>
              <TableCell>{item.farmid}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
