import React from "react";
import LabeledInput from "./LabeledInput";
import axios from "axios";
import { useForm } from "react-hook-form";

const UserForm = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmitFail = () => {
    alert("Please complete the form");
  };

  const onSubmit = async (data) => {
    try {
      await axios.post(import.meta.env.VITE_API_URL + "/createUser", data);
      reset();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onSubmitFail)}>
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
        <LabeledInput id="username" register={register} required />
        <LabeledInput id="email" register={register} required />
        <LabeledInput id="password" register={register} required />
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
