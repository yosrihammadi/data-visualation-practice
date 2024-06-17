export const Dropdown = ({
  id,
  options,
  onSelectedValueChange,
  selectedValue,
}) => {
  return (
    <select id={id} onChange={(e) => onSelectedValueChange(e.target.value)}>
      {options.map(({ label, value }) => (
        <option value={value} selected={value === selectedValue}>
          {label}
        </option>
      ))}
    </select>
  );
};
