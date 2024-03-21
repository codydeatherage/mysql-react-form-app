import React from "react";

const LabeledInput = ({ id, value, onChange }) => {
  const labelTitle = id.slice(0, 1).toUpperCase() + id.slice(1);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor={id}>{labelTitle}</label>
      <input
        name={id}
        onChange={onChange}
        type={id === "password" ? "password" : "text"}
        id={id}
        value={value}
      />
    </div>
  );
};

export default LabeledInput;
