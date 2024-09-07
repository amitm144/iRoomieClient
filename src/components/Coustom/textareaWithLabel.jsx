import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label";

export default function TextareaWithLabel({ id, label, icon, placeholder ,  ...props }) {
  return (
    <div className="grid w-full items-center gap-1.5">
      <div className="flex gap-2 items-center">
        {icon && icon}
        <Label htmlFor={id}>{label}</Label>
      </div>
      <Textarea id={id} placeholder={placeholder} {...props} />
    </div>
  );
}