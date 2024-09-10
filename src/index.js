import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import {
  openModal,
  closeModal,
  closeOnOverlay,
  closeOnClick,
} from "./components/modal.js";
import { clearValidation, enableValidation } from "./components/validation.js";
import {
  getCards,
  getUsers,
  patchUserProfile,
  postCard,
  patchUserAvatar,
} from "./components/api.js";

const placesList = document.querySelector(".places__list");
const profileEditBtn = document.querySelector(".profile__edit-button");
const popupButton = document.querySelector(".popup__button");
const profileAddBtn = document.querySelector(".profile__add-button");
const popupWindows = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const imageSrc = document.querySelector(".popup_type_image .popup__image");
const imageText = document.querySelector(".popup_type_image .popup__caption");
const profileForm = document.querySelector('form[name = "edit-profile"]');
const formImgElement = document.querySelector('form[name = "new-place"]');
const formAvatarElement = document.querySelector('form[name = "edit-avatar"]');
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const closePopupButtons = document.querySelectorAll(".popup__close");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardInputName = document.querySelector(".popup__input_type_card-name");
const cardInputUrl = document.querySelector(".popup__input_type_url");
const profileImage = document.querySelector(".profile__image");
const popupAvatar = document.querySelector(".popup_type_avatar");
const loader = document.querySelector(".loader");
let currentUser;
const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

renderLoadingScreen(true);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: cardInputName.value,
    link: cardInputUrl.value,
  };
  postCard(card)
    .then((newCard) => {
      renderCard(newCard, "prepend", currentUser);
      renderLoading(false, popupButton);
      closeModal();
      evt.target.reset();
    })
    .catch((err) => {
      console.log("Ошибка при добавлении карточки:", err);
    });
  return;
}

function renderCard(item, method = "prepend", currentUser) {
  const cardElement = createCard(
    item,
    {
      deleteCard,
      likeCard,
      openImagePopup,
    },
    currentUser
  );
  placesList[method](cardElement);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const userInfo = {
    name: nameInput.value,
    about: jobInput.value,
  };
  patchUserProfile(userInfo)
    .then((res) => {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
      renderLoading(false, popupButton);
    })
    .catch((err) => {
      console.log("Ошибка при обновлении профиля:", err);
    })
    .finally(() => {
      closeModal();
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatar = {
    link: formAvatarElement.link.value,
  };
  patchUserAvatar(avatar)
    .then((res) => {
      profileImage.style.backgroundImage = `url(${res.avatar})`;
    })
    .catch((err) => {
      console.log("Ошибка при обновлении аватара:", err);
    })
    .finally(() => {
      renderLoading(false, popupButton);
      closeModal();
    });
}

function openImagePopup(e) {
  e.preventDefault();
  imageSrc.src = e.target.src;
  imageSrc.alt = e.target.alt;
  imageText.textContent = e.target
    .closest(".card")
    .querySelector(".card__title").textContent;
  openModal(popupImage);
}

function displayUserInfo(user) {
  profileName.textContent = user.name;
  profileDescription.textContent = user.about;
  profileImage.style.backgroundImage = `url(${user.avatar})`;
}

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

function renderLoadingScreen(isLoading) {
  if (isLoading) {
    loader.classList.add("loader_visible");
  } else {
    loader.classList.remove("loader_visible");
  }
}

profileImage.addEventListener("click", () => {
  clearValidation(popupAvatar, validationSettings);
  openModal(popupAvatar);
});

profileEditBtn.addEventListener("click", () => {
  clearValidation(popupEdit, validationSettings);
  popupEdit.querySelector("form").name.value = profileName.textContent;
  popupEdit.querySelector("form").description.value =
    profileDescription.textContent;
  openModal(popupEdit, profileName, profileDescription);
});

profileAddBtn.addEventListener("click", () => {
  clearValidation(formImgElement, validationSettings);

  openModal(popupNewCard);
});

enableValidation(validationSettings);

profileForm.addEventListener("submit", (evt) => {
  renderLoading(true, profileForm.querySelector(".popup__button"));
  handleProfileFormSubmit(evt);
});
formImgElement.addEventListener("submit", (evt) => {
  renderLoading(true, formImgElement.querySelector(".popup__button"));
  handleCardFormSubmit(evt);
});
formAvatarElement.addEventListener("submit", (evt) => {
  renderLoading(true, formAvatarElement.querySelector(".popup__button"));
  handleAvatarFormSubmit(evt);
});

closeOnClick(closePopupButtons);
closeOnOverlay(popupWindows);

Promise.all([getUsers(), getCards()])
  .then(([user, cards]) => {
    currentUser = user;
    cards.forEach((card) => renderCard(card, "append", user));
    renderLoadingScreen(false);
    displayUserInfo(user);
  })
  .catch((error) => {
    console.error("Ошибка при выполнении запросов:", error);
  });
