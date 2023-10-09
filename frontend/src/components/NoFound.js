import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NoFound() {
  const navigate = useNavigate();

  const goBack = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Ooops! Ничего не найдено.</h1>
      <p style={styles.text}>
        <a href="#" onClick={goBack} className="login__link">
          Назад ⮌
        </a>
      </p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center'
  },
  header: {
    textAlign: 'center'
  },
  text: {
    textAlign: 'center'
  }
};
