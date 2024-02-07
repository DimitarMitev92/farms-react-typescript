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
import { Search } from "../../../Search/Search";

export const MostMachinery = () => {
  const [items, setItems] = useState<IMostMachinery[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<IMostMachinery[]>([]);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (user) {
          const urlReporting = `${endpoint.REPORTING}/farm/most-machineries`;
          const fetchedData = await fetchDataFromApi(
            urlReporting,
            user,
            method.GET,
            null,
            "Error fetching report"
          );
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

  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [items, searchTerm]);

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
      <Search
        text="text"
        placeholder="Search by farm name..."
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Count Machinery</TableHeadCell>
            <TableHeadCell>Farm Name</TableHeadCell>
            <TableHeadCell>Farm Location</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredItems.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.count}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                {item.location.coordinates[0]} / {item.location.coordinates[1]}
              </TableCell>
            </TableRow>
          ))}
          {filteredItems.length === 0 && (
            <SubTitle>A user with that email does not exist.</SubTitle>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
