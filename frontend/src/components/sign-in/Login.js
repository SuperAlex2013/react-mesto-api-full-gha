import React, { useState } from "react";
import AuthForm from "../AuthForm";

export default function Login({ handleAuthorizeUser }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue(prevValue => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formValue.password && formValue.email) {
      handleAuthorizeUser(formValue);
    }
  };

  return (
    <AuthForm
      title="Вход"
      titleBtn="Войти"
      handleSubmit={handleSubmit}
      formValue={formValue}
      handleChange={handleChange}
      loginLink={false}
    />
  );
}
