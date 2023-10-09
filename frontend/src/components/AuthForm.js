import React from "react";
import { Link } from "react-router-dom";

function InputField({ type, name, placeholder, value, handleChange, ...props }) {
    return (
        <input
            className="login__input"
            placeholder={placeholder}
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            {...props}
        />
    );
}

function AuthForm({
    handleSubmit,
    formValue,
    handleChange,
    title,
    titleFormFooter,
    loginLink,
    titleBtn,
}) {
    return (
        <main>
            <section className="login">
                <h2 className="login__title">{title}</h2>
                <form onSubmit={handleSubmit} className="login__form">
                    <InputField
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formValue.email}
                        handleChange={handleChange}
                        required
                    />
                    <InputField
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={formValue.password}
                        handleChange={handleChange}
                        minLength={4}
                        required
                        autoComplete="on"
                    />
                    <div className="login__form-wrap">
                        <button type="submit" className="login__btn">
                            {titleBtn}
                        </button>
                        {loginLink && (
                            <p className="login__subtitle">
                                {titleFormFooter}{" "}
                                <Link to="/signin" className="login__link">
                                    Войти
                                </Link>
                            </p>
                        )}
                    </div>
                </form>
            </section>
        </main>
    );
}

export default AuthForm;
