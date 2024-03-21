import React, { useState } from "react";
import LabeledInput from "./LabeledInput";
import axios from "axios";

const UserForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clearForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  //check that each field is filled
  const validateForm = () => {
    //can also be written !!(username && email && password)
    return Boolean(username && email && password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //same as {username: username, email: email, password: password}
    const payload = { username, email, password };
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <LabeledInput
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <LabeledInput
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
