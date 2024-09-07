import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function SelectWithLabel({
  label,
  icon,
  options,
  placeholder,
  onChange,
  value,
  ...props
}) {
  return (
    <div className="grid w-full items-center gap-1.5">
      <div className="flex gap-2 items-center">
        {icon && icon}
        <Label>{label}</Label>
      </div>

      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options.map((option, index) => (
              <SelectItem key={index} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}