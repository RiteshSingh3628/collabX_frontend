function FieldLabel({ className = "", label, isRequired = false }) {
  return (
    <span className={`flex text-sm font-medium text-nowrap ${className}`}>
      {label}
      {isRequired && <span className="text-red-500">*</span>}
    </span>
  );
}

export default FieldLabel;
