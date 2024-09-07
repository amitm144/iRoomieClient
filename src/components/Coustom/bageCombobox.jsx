import React, { useState, useCallback, useRef, useLayoutEffect, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ChevronsUpDown, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const SELECTION_LIMIT = 5;

export default function CategorizedBadgeSelect({
  id,
  label,
  icon,
  options,
  placeholder = "Select options...",
  onChange,
  value = [],
}) {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(value);
  const [popoverWidth, setPopoverWidth] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    if (buttonRef.current) {
      setPopoverWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleToggleOption = useCallback((option) => {
    setSelectedOptions((prev) => {
      let newSelection;
      if (prev.includes(option)) {
        newSelection = prev.filter((item) => item !== option);
      } else {
        if (prev.length >= SELECTION_LIMIT) {
          setShowToast(true);
          return prev;
        }
        newSelection = [...prev, option];
      }
      onChange(newSelection);
      return newSelection;
    });
  }, [onChange]);

  const handleRemoveBadge = useCallback((option) => {
    setSelectedOptions((prev) => {
      const newSelection = prev.filter((item) => item !== option);
      onChange(newSelection);
      return newSelection;
    });
  }, [onChange]);

  return (
    <div className="w-full flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        {icon}
        <Label htmlFor={id}>{label}</Label>
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={buttonRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal"
          >
            {selectedOptions.length > 0
              ? `${selectedOptions.length} selected`
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="p-0 my-1" 
          style={{ width: popoverWidth > 0 ? `${popoverWidth}px` : 'auto' }}
        >
          <div className="max-h-[300px] overflow-auto">
            {Object.entries(options).map(([category, items]) => (
              <div key={category}>
                <div className="px-2 py-1.5 text-sm font-semibold">
                  {category}
                </div>
                <div className="p-2 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Badge
                      key={item}
                      variant={selectedOptions.includes(item) ? "secondary" : "outline"}
                      className={cn(
                        "cursor-pointer hover:bg-blue-50",
                        selectedOptions.includes(item) ? "bg-blue-50 text-blue-900" : "border-blue-500"
                      )}
                      onClick={() => handleToggleOption(item)}
                    >
                      {item}
                      {selectedOptions.includes(item) && (
                        <Check className="ml-1 h-3 w-3" />
                      )}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <div className="flex flex-wrap gap-2 mt-2">
        {selectedOptions.map((option) => (
          <Badge key={option} className="pl-2  flex items-center bg-blue-500">
            {option}
            <button
              onClick={() => handleRemoveBadge(option)}
              className="ml-1 p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 hover:text-gray-900"
            >
              <X size={14} />
            </button>
          </Badge>
        ))}
      </div>
      {showToast && (
        <div className="absolute bottom-full left-0 mb-2 p-2 bg-red-500 text-white rounded shadow-lg">
          Selection limit reached. You can only select up to {SELECTION_LIMIT} options.
        </div>
      )}
    </div>
  );
}