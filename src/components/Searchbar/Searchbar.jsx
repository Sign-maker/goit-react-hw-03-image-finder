import {
  Button,
  Input,
  Label,
  SearchForm,
  SearchbarContainer,
} from './Searchbar.styled';
import { SiSearxng } from 'react-icons/si';

export const Searchbar = ({ onSubmit }) => (
  <SearchbarContainer>
    <SearchForm onSubmit={onSubmit}>
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
