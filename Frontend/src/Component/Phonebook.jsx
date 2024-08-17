import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const Phonebook = ({
  placeholder,
  selectedNames,
  onSelectName,
  data,
  searchTerm,
  onSearchTermChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (event) => {
    onSearchTermChange(event.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };

  const handleSelectName = (name) => {
    onSelectName(name);
    onSearchTermChange(name); // Update the search term with the selected name
    setIsFocused(false);
  };

  return (
    <div className="search-dropdown">
      <TextField
        margin="normal"
        autoComplete="off"
        required
        fullWidth
        value={searchTerm} // Controlled input
        onChange={handleSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
        label={placeholder}
      />
      {isFocused && (
        <div className="dropdown">
          {data
            .filter(
              (item) =>
                item.toUpperCase().includes(searchTerm.toUpperCase()) &&
                !selectedNames.includes(item)
            )
            .map((item, index) => (
              <div
                className={`List ${index === 0 ? "first-item" : ""}`}
                key={index}
                onClick={() => handleSelectName(item)}
              >
                {item}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Phonebook;
