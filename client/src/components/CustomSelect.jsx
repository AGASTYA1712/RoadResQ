import { useState } from "react";

export default function CustomSelect({ options, value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="custom-select-wrapper">
      <div className="custom-select-box" onClick={() => setOpen(!open)}>
        <span>{value || placeholder}</span>
        <span className={`arrow ${open ? "open" : ""}`}>⌄</span>
      </div>

      {open && (
        <div className="custom-select-dropdown">
          {options.map((option, index) => (
            <div
              key={index}
              className="custom-select-option"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}