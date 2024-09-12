import "./pages/index.css";
import {
  createCard,
  deleteCard,
  likeCard,
  cardToDeleteId,
  deleteCardCallback,
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
import {
  placesList,
  profileEditBtn,
  profileAddBtn,
  popupWindows,
  popupEdit,
  popupNewCard,
  popupImage,
  imageSrc,
  imageText,
  profileForm,
  formImgElement,
  formAvatarElement,
  nameInput,
  jobInput,
  closePopupButtons,
  profileName,
  profileDescription,
  cardInputName,
  cardInputUrl,
  profileImage,
  popupAvatar,
  loader,
  popupEditSubmitButton,
  popupNewCardSubmitButton,
  popupAvatarSubmitButton,
  deleteCardPopup,
  deleteConfirmButton,
  validationSettings,
} from "./components/constants.js";

let currentUser;
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
      deleteCardCallback,
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

profileForm.addEventListener("submit", handleProfileFormSubmit);
formImgElement.addEventListener("submit", handleCardFormSubmit);
formAvatarElement.addEventListener("submit", handleAvatarFormSubmit);

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
