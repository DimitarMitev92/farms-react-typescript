import { Link } from "react-router-dom";
import {
  Button,
  NotFoundContainer,
  SubTitle,
  Title,
} from "../../../styles/Global.styled";
import { catalog } from "../../../static/endPoints";

export const NotFound = () => {
  return (
    <NotFoundContainer>
      <Title>404 - Page Not Found</Title>
      <SubTitle>
        Unfortunately, the page you are looking for does not exist.
      </SubTitle>
      <Link to={catalog.FARM}>
        <Button>Back</Button>
      </Link>
    </NotFoundContainer>
  );
};
