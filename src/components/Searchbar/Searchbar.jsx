import {
  Button,
  Input,
  Label,
  SearchForm,
  SearchbarContainer,
} from './Searchbar.styled';
import { SiSearxng } from 'react-icons/si';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const searchName = event.currentTarget.elements.name.value.trim();
    if (!searchName) return;
    onSubmit(searchName);
  };

  return (
    <SearchbarContainer>
      <SearchForm onSubmit={handleSubmit}>
        <Button type="submit">
          <SiSearxng />
          <Label>Search</Label>
        </Button>
        <Input
          type="text"
          autoComplete="off"
          name="name"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarContainer>
  );
};
