import React from "react";
import { SearchContainer, SearchInput } from "../../styles/Global.styled";
import { SearchProps } from "./Search.static";

export const Search: React.FC<SearchProps> = ({
  text,
  placeholder,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <SearchContainer>
      <SearchInput
        type={text}
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </SearchContainer>
  );
};
