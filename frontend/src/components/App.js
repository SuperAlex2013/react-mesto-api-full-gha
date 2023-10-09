import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import AddCardPopup from "./AddCardPopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import NoFound from "./NoFound";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { ProtectedRouteElement } from "../hooks/ProtectedRoute";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"; 
import Login from "./sign-in/Login";
import Register from "./sign-up/Register";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";
import { is } from "@babel/types";



function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDelCardPopupOpen, setIsConfirmDelCardPopupOpen] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltip, setInfoTooltip] = useState(false);
  const [tooltip, setTooltip] = useState({ image: "", message: "" });
  const navigate = useNavigate();

  const [userData, setUserData] = useState({ email: "" });
  const [currentUser, setCurrentUser] = useState({
    _id: undefined,
  });

  const [cards, setCards] = useState([]);
  const [cardId, setCardId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDelCardPopupOpen(false);
    setIsImagePopupOpen(false);
    setInfoTooltip(false);
  }

  useEffect(() => {
    if(loggedIn) {
    api.getDataUser()
      .then(userData => setCurrentUser(userData))
      .catch(error => console.error(error));};
  }, [loggedIn]);

  useEffect(() => {
    if(loggedIn) {
    api.getInitialCards()
      .then(initialCards => setCards(initialCards))
      .catch(error => console.error(error));};
  }, [loggedIn]);

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardLike(cardId, likes) {
    const isLiked = likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(cardId, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((element) => (element._id === cardId ? newCard : element))
        );
      })
      .catch(console.error);
  }

  function handleCardDelete() {
    setIsLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        setCards(cards.filter((item) => item._id !== cardId));
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardDeleteClick(card) {
    setCardId(card);
    setIsConfirmDelCardPopupOpen(true);
  }

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api
      .saveDataInfo(userData)
      .then((updateUser) => {
        setCurrentUser(updateUser);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(userData) {
    setIsLoading(true);
    api
      .saveDataProfile(userData)
      .then((userAvatar) => {
        setCurrentUser(userAvatar);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(inputValues) {
    setIsLoading(true);
    api
      .saveCardInfo(inputValues)
      .then((cardData) => {

        setCards([cardData, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then(({ data }) => {
          navigate("/app");
          setLoggedIn(true);
          setUserData({ email: data.email });
        })
        .catch((error) => console.log(error));
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  function handleRegisterUser(formValue) {
    const { password, email } = formValue;
    auth.register(password, email)
      .then(() => {
        setInfoTooltip(true);
        setTooltip({
          image: true,
          message: "Вы успешно зарегистрировались!",
        });
        navigate("/signin", { replace: true });
        setTimeout(closeAllPopups, 2000);
      })
      .catch(error => {
        setInfoTooltip(true);
        setTooltip({
          image: false,
          message: "Пользователь с таким email уже зарегистрирован",
        });
        console.log(error);
      });
  }

  function handleAuthorizeUser(formValue) {
    const { password, email } = formValue;
    auth.authorize(password, email)
      .then(data => {
        if (data.token) {
          setUserData({ email });
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          navigate("/app", { replace: true });
        }
      })
      .catch(error => {
        setInfoTooltip(true);
        setTooltip({
          image: false,
          message: "Неверный адрес электронной почты или пароль!",
        });
        console.log(error);
      });
  }

  function signOut() {
    setUserData({ email: "" });
    localStorage.removeItem("jwt");
    navigate("/signin", { replace: true });
    setLoggedIn(false);
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} userData={userData} signOut={signOut} />
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Navigate to="/app" replace />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/app"
            element={
              <ProtectedRouteElement
                element={Main}
                handleEditProfileClick={setIsEditProfilePopupOpen}
                handleAddPlaceClick={setIsAddCardPopupOpen}
                handleEditAvatarClick={setIsEditAvatarPopupOpen}
                onCardLike={handleCardLike}
                onCardDeleteClick={handleCardDeleteClick}
                onCardClick={handleCardClick}
                cards={cards}
                loggedIn={loggedIn}
              />
            }
          />

          <Route
            path="/signin"
            element={<Login handleAuthorizeUser={handleAuthorizeUser} />}
          />
          <Route
            path="/signup"
            element={<Register handleRegisterUser={handleRegisterUser} />}
          />
          <Route path="*" element={<NoFound />} />
        </Routes>
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
        />
        <AddCardPopup
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
          handleAddPlaceClick={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
        <ConfirmDeletePopup
          isOpen={isConfirmDelCardPopupOpen}
          onClose={closeAllPopups}
          onConfirm={handleCardDelete}
          isLoading={isLoading}
        ></ConfirmDeletePopup>

        <InfoTooltip
          tooltip={tooltip}
          isOpen={isInfoTooltip}
          onClose={closeAllPopups}
        ></InfoTooltip>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
