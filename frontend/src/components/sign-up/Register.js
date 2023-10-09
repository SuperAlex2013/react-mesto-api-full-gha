import React, { useState } from "react";
import AuthForm from "../AuthForm";

export default function Register({ handleRegisterUser }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formValue;

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormValue(prevValue => ({
      ...prevValue,
      [name]: value,
    }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (email && password) {
      handleRegisterUser(formValue);
    }
  }

  return (
    <AuthForm
      title="Регистрация"
      titleBtn="Зарегистрироваться"
      titleFormFooter="Уже зарегистрированы?"
      handleSubmit={handleSubmit}
      formValue={formValue}
      handleChange={handleChange}
      loginLink={true}
    />
  );
}
