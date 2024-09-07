import React, { useState, useCallback } from "react";
import { debounce } from "@mui/material/utils";
import ComboboxWithLabel from "./comboboxWithLabel";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import { fetchLocations } from "@/lib/LocationService";

export default function LocationCombobox({
    onChange,
  label = "Address",
  placeholder = "Enter an address",
  initialValue = "",
}) {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState(initialValue);

  const debouncedFetch = useCallback(
    debounce(async (request) => {
      if (request.length < 3) {
        setOptions([]);
        return;
      }
      const results = await fetchLocations(request);
      setOptions(results);
    }, 400),
    []
  );

  const handleInputChange = (newInputValue) => {
    setInputValue(newInputValue);
    debouncedFetch(newInputValue);
  };

  const handleLocationChange = (newValue) => {
    const selectedLocation = options.find(
      (option) => option.title === newValue
    );
    if (selectedLocation) {
        onChange({
        address: selectedLocation.fullAddress,
        position: [
          selectedLocation.geometry.coordinates[1],
          selectedLocation.geometry.coordinates[0],
        ],
      });
    } else {
        onChange(null);
    }
    setInputValue(newValue);
  };

  return (
    <ComboboxWithLabel
      id="location-search"
      label={label}
      icon={<RoomOutlinedIcon />}
      options={options}
      placeholder={placeholder}
      value={inputValue}
      onChange={handleLocationChange}
      onInputChange={handleInputChange}
    />
  );
}

