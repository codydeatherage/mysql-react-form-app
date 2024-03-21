import React, { useReducer } from "react";
import LabeledInput from "./LabeledInput";
import axios from "axios";

const initialFormState = {
  username: "",
  email: "",
  password: "",
};

const reducer = (state, action) => {
  const { type, field, payload } = action;
  switch (type) {
    case "RESET_FORM":
      return initialFormState;
    default:
      return { ...state, [field]: payload };
  }
};

const UserForm = () => {
  const [formState, dispatch] = useReducer(reducer, initialFormState);

  const clearForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

  //check that each field is filled
  const validateForm = () => {
    //can also be written !!(formState.username && formState.email && formState.password)
    return Boolean(formState.username && formState.email && formState.password);
  };

  const handleChange = (e) => {
    dispatch({ field: e.target.name, payload: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //same as {username: formState.username, email: formState.email, password: formState.password}
    const payload = formState;
    const isValid = validateForm();
    if (isValid) {
      try {
        await axios.post(import.meta.env.VITE_API_URL + "/createUser", payload);
        clearForm();
      } catch (e) {
        console.error(e);
      }
    } else {
      alert("Please complete the form");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
          gap: "20px",
          width: "30vw",
          padding: "5px",
        }}
      >
        <LabeledInput
          id="username"
          value={formState.username}
          onChange={handleChange}
        />
        <LabeledInput
          id="email"
          value={formState.email}
          onChange={handleChange}
        />
        <LabeledInput
          id="password"
          value={formState.password}
          onChange={handleChange}
        />
        <div style={{ display: "flex" }}>
          <button type="submit" style={{ marginLeft: "auto" }}>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
