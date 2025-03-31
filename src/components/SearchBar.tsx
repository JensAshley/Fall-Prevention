import React, { useState } from 'react';
import {Button, Form, DropdownButton, Dropdown, InputGroup} from 'react-bootstrap';

interface SearchBarProps {
  onSearch: (criterion: string, value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState<string>('');
  // Correcting the casing to keep consistent and understandable
  const [searchType, setSearchType] = useState<'Name' | 'Gender'>('Name');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(event.target.value as 'Name' | 'Gender');
    setInputValue(''); // Reset input value when type changes
  };

  const handleSearch = () => {
    onSearch(searchType, inputValue);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <Form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
      <InputGroup className="mb-3">
        <DropdownButton
          variant="outline-secondary"
          title={searchType}
          id="input-group-dropdown"
          onChange={handleTypeChange}
        >
          <Dropdown.Item eventKey="Name">Name</Dropdown.Item>
          <Dropdown.Item eventKey="Gender">Gender</Dropdown.Item>
          <Dropdown.Item eventKey="Age">Age</Dropdown.Item>
        </DropdownButton>
        <Form.Control
          type="search"
          placeholder={`Search by ${searchType}`}
          value={inputValue}
          onChange={handleInputChange}
          aria-label="Search"
        />
        <Button variant="primary" type="submit">
          Search
        </Button>
      </InputGroup>
    </Form>
      {/* <select
        value={searchType}
        onChange={handleTypeChange}
        style={{
          fontSize: "25px",
          borderRadius: "15px",
          borderColor: "#3569CE"
        }}
      >
        <option value="Name">Name</option>
        <option value="Gender">Gender</option>
      </select>
      <input
        type="text" 
        placeholder={`Enter ${searchType}...`}
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        style={{
          fontSize: "25px",
          borderRadius: "15px",
          borderColor: "#3569CE",
          marginLeft: "10px"
        }}
      /> */}
    </div>
  );
};

export default SearchBar;
