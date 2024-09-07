import React, { useState, useMemo, useEffect } from "react";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function ComboboxWithLabel({
  id,
  label,
  icon,
  options = [],
  placeholder = "Select option...",
  value,
  onChange,
  onInputChange,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(value || "");
  }, [value]);

  const isComplexOption = options.length > 0 && typeof options[0] === 'object' && 'title' in options[0];

  const filteredOptions = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return options.filter(option => {
      if (isComplexOption) {
        return option.title && option.title.toLowerCase().includes(lowerSearch);
      }
      return option && option.toLowerCase().includes(lowerSearch);
    });
  }, [options, search, isComplexOption]);

  const groupedOptions = useMemo(() => {
    if (!isComplexOption) return { "": filteredOptions };
    return filteredOptions.reduce((acc, option) => {
      const category = option.category || "";
      if (!acc[category]) acc[category] = [];
      acc[category].push(option);
      return acc;
    }, {});
  }, [filteredOptions, isComplexOption]);

  const handleSearchChange = (e) => {
    const newValue = e.target.value;
    setSearch(newValue);
    if (onInputChange) {
      onInputChange(newValue);
    }
  };

  return (
    <div className=" w-full items-center gap-1.5">
      <div className="flex gap-2 items-center">
        {icon && icon}
        <Label htmlFor={id}>{label}</Label>
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal"
          >
            {value || placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <div className="p-2">
            <input
              className="w-full p-2 border rounded"
              placeholder="Search option..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          <ul className="max-h-[300px] overflow-auto">
            {Object.entries(groupedOptions).map(([category, options]) => (
              <li key={category}>
                {category !== "" && (
                  <div className="py-2 px-4 font-semibold ">{category}</div>
                )}
                {options.map((option, index) => {
                  const optionValue = isComplexOption ? option.title : option;
                  return (
                    <div
                      key={`${category}-${optionValue}-${index}`}
                      className={cn(
                        "py-2 px-4 cursor-pointer hover:bg-gray-50 ml-2  ",
                      )}
                      onClick={() => {
                        onChange(optionValue);
                        setOpen(false);
                      }}
                    >
                      {optionValue}
                    </div>
                  );
                })}
              </li>
            ))}
            {Object.keys(groupedOptions).length === 0 && (
              <li className="py-2 px-4 text-gray-500">No option found.</li>
            )}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}