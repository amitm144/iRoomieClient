import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputWithLabel({ id, label, icon, placeholder, type ,  ...props }) {
  return (
    <div className="grid w-full items-center gap-1.5">
      <div className="flex gap-2 items-center">
        {icon && icon}
        <Label htmlFor={id}>{label}</Label>
      </div>
      <Input type={type} id={id} placeholder={placeholder} {...props}  />
    </div>
  );
}
