import "./pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import {
  openModal,
  closeModal,
  closeOnOverlay,
  closeOnClick,
} from "./components/modal.js";

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
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const closePopupButtons = document.querySelectorAll(".popup__close");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardInputName = document.querySelector(".popup__input_type_card-name");
const cardInputUrl = document.querySelector(".popup__input_type_url");

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: cardInputName.value,
    link: cardInputUrl.value,
  };
  renderCard(card, "prepend");
  closeModal();
  evt.target.reset();
  return;
}

function renderCard(item, method = "prepend") {
  const cardElement = createCard(item, {
    deleteCard,
    likeCard,
    openImagePopup,
  });
  placesList[method](cardElement);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal();
}

function openImagePopup(e) {
  e.preventDefault();
  console.log(e.target);
  imageSrc.src = e.target.src;
  imageSrc.alt = e.target.alt;
  imageText.textContent = e.target
    .closest(".card")
    .querySelector(".card__title").textContent;
  openModal(popupImage);
}

initialCards.forEach((card) => {
  const cardElement = createCard(card, {
    deleteCard,
    likeCard,
    openImagePopup,
  });
  placesList.append(cardElement);
});

profileEditBtn.addEventListener("click", () => {
  popupEdit.querySelector("form").name.value = profileName.textContent;
  popupEdit.querySelector("form").description.value =
    profileDescription.textContent;
  openModal(popupEdit, profileName, profileDescription);
});
profileAddBtn.addEventListener("click", () => openModal(popupNewCard));
profileForm.addEventListener("submit", handleProfileFormSubmit);
formImgElement.addEventListener("submit", handleCardFormSubmit);

closeOnClick(closePopupButtons);
closeOnOverlay(popupWindows);
