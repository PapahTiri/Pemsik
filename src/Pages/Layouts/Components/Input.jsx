const Input = ({ type, name, value, onChange, readOnly=false, required = false, placeholder, className = '' }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      readOnly={readOnly}
      className={` ${className}`}
    />
  );
};

export default Input;