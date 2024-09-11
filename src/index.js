import "./pages/index.css";
import {
  createCard,
  deleteCard,
  likeCard,
  cardToDeleteId,
} from "./components/card.js";
import {
  openModal,
  closeModal,
  closeOnOverlay,
  closeOnClick,
} from "./components/modal.js";
import { clearValidation, enableValidation } from "./components/validation.js";
import {
  getCards,
  getUser,
  patchUserProfile,
  postCard,
  patchUserAvatar,
} from "./components/api.js";

const placesList = document.querySelector(".places__list");
const profileEditBtn = document.querySelector(".profile__edit-button");
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
const popupEditSubmitButton = popupEdit.querySelector(".popup__button");
const popupNewCardSubmitButton = popupNewCard.querySelector(".popup__button");
const popupAvatarSubmitButton = popupAvatar.querySelector(".popup__button");
const deleteCardPopup = document.querySelector(".popup_type_delete-card");
const deleteConfirmButton = deleteCardPopup.querySelector(".button");
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
  renderLoading(true, popupNewCardSubmitButton);
  postCard(card)
    .then((newCard) => {
      renderCard(newCard, "prepend", currentUser);
      closeModal();
      evt.target.reset();
    })
    .catch((err) => {
      console.log("Ошибка при добавлении карточки:", err);
    })
    .finally(() => {
      renderLoading(false, popupNewCardSubmitButton);
    });
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
  renderLoading(true, popupEditSubmitButton);
  patchUserProfile(userInfo)
    .then((res) => {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
    })
    .catch((err) => {
      console.log("Ошибка при обновлении профиля:", err);
    })
    .finally(() => {
      renderLoading(false, popupEditSubmitButton);
      closeModal();
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatar = {
    link: formAvatarElement.link.value,
  };
  renderLoading(true, popupAvatarSubmitButton);
  patchUserAvatar(avatar)
    .then((res) => {
      profileImage.style.backgroundImage = `url(${res.avatar})`;
    })
    .catch((err) => {
      console.log("Ошибка при обновлении аватара:", err);
    })
    .finally(() => {
      renderLoading(false, popupAvatarSubmitButton);
      closeModal();
    });
}

function handleCardDeleteSubmit() {
  if (cardToDeleteId) {
    deleteConfirmButton.textContent = "Удаление...";
    deleteCard(cardToDeleteId)
      .then(() => {
        closeModal(deleteCardPopup);
      })
      .finally(() => {
        deleteConfirmButton.textContent = "Да";
      });
  }
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

function openPopup(popup, validationSettings) {
  clearValidation(popup, validationSettings);
  openModal(popup);
}

profileImage.addEventListener("click", () => {
  openPopup(popupAvatar, validationSettings);
});

profileEditBtn.addEventListener("click", () => {
  openPopup(popupEdit, validationSettings);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});

profileAddBtn.addEventListener("click", () => {
  openPopup(popupNewCard, validationSettings);
});

deleteConfirmButton.addEventListener("click", handleCardDeleteSubmit);

profileForm.addEventListener("submit", (evt) => {
  handleProfileFormSubmit(evt);
});
formImgElement.addEventListener("submit", (evt) => {
  handleCardFormSubmit(evt);
});
formAvatarElement.addEventListener("submit", (evt) => {
  handleAvatarFormSubmit(evt);
});

enableValidation(validationSettings);
closeOnClick(closePopupButtons);
closeOnOverlay(popupWindows);

Promise.all([getUser(), getCards()])
  .then(([user, cards]) => {
    currentUser = user;
    cards.forEach((card) => renderCard(card, "append", user));
    renderLoadingScreen(false);
    displayUserInfo(user);
  })
  .catch((error) => {
    console.error("Ошибка при выполнении запросов:", error);
  });
