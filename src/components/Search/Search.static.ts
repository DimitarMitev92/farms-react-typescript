export interface SearchProps {
  text: string;
  placeholder: string;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}
