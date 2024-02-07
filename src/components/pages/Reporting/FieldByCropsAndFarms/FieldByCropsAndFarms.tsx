import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { endpoint, method } from "../../../../static/endPoints";
import { fetchDataFromApi } from "../../../../services/fetchDataFromApi";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  ColumnContainer,
  Spinner,
  SpinnerContainer,
  SubTitle,
  Title,
} from "../../../../styles/Global.styled";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeadCell,
  TableRow,
} from "../../../../styles/Table.styled";
import { IFieldByCropsAndFarms } from "./FieldByCropAndFarms.static";
import { Search } from "../../../Search/Search";

export const FieldByCropsAndFarms = () => {
  const [items, setItems] = useState<IFieldByCropsAndFarms[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<IFieldByCropsAndFarms[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (user) {
          const urlReporting = `${endpoint.REPORTING}/field/count`;
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
        toast.error("Error fetching reports");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        item.farmname.toLowerCase().includes(searchTerm.toLowerCase())
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
      <Title>Fields By Crops And Farms</Title>
      <Search
        text="text"
        placeholder="Search by farm name..."
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Count Fields</TableHeadCell>
            <TableHeadCell>Farm</TableHeadCell>
            <TableHeadCell>Crop</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredItems.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.count}</TableCell>
              <TableCell>{item.farmname}</TableCell>
              <TableCell>{item.cropname}</TableCell>
            </TableRow>
          ))}
          {filteredItems.length === 0 && (
            <SubTitle>A farm with that name does not exist.</SubTitle>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
