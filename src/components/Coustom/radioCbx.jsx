export default function RadioCombobox({
  value,
  onChange,
  checked,
  label,
  icon,
  color = "green",
  style,
  ...props
}) {
  return (
    <label
      className={`flex items-center justify-center border rounded-xl
          hover:border-blue-600 
          transition-all duration-200 ease-in-out
          ${
            checked
              ? "border-2 border-blue-600 bg-blue-50 hover:bg-blue-50"
              : "hover:bg-blue-50/10"
          }
            ${style}
        `}
    >
      <input
        type="radio"
        value={value}
        className="hidden peer"
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <div className={`flex flex-col items-center justify-center gap-8 text-gray-800 ${checked ? "text-blue-900" : ""}`}>
        {icon && icon}
        {label}
      </div>
    </label>
  );
}

