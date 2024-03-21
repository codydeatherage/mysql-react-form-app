import React from "react";

const LabeledInput = ({ id, register, required }) => {
  const labelTitle = id.slice(0, 1).toUpperCase() + id.slice(1);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor={id}>{labelTitle}</label>
      <input
        {...register(id, { required })}
        type={id === "password" ? "password" : "text"}
        id={id}
      />
    </div>
  );
};

export default LabeledInput;
