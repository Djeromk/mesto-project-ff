import "./pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import {
  openModal,
  closeModal,
  closeOnOverlay,
  closeOnClick,
  closeOnEsc,
} from "./components/modal.js";

const placesList = document.querySelector(".places__list");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileAddBtn = document.querySelector(".profile__add-button");
const popup = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const ImageSrc = document.querySelector(".popup_type_image .popup__image");
const ImageText = document.querySelector(".popup_type_image .popup__caption");
const formElement = document.querySelector('form[name = "edit-profile"]');
const formImgElement = document.querySelector('form[name = "new-place"]');
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const closePopup = document.querySelectorAll(".popup__close");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardInputName = document.querySelector(".popup__input_type_card-name");
const cardInputUrl = document.querySelector(".popup__input_type_url");

function handleFormSubmit(evt) {
  evt.preventDefault();
  if (evt.currentTarget.getAttribute("name") === "new-place") {
    const cardData = {
      name: cardInputName.value,
      link: cardInputUrl.value,
    };
    placesList.prepend(
      createCard(cardData, deleteCard, likeCard, OpenImagePopup)
    );
    closeModal(popup);
    cardInputName.value = "";
    cardInputUrl.value = "";
    return;
  }
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  nameInput.value = "";
  jobInput.value = "";
  closeModal(popup);
}

initialCards.forEach((card) => {
  const cardElement = createCard(
    card,
    deleteCard,
    likeCard,
    OpenImagePopup,
    false
  );
  placesList.append(cardElement);
});

function OpenImagePopup(e) {
  e.preventDefault();
  ImageSrc.src = e.target.src;
  ImageText.innerHTML = e.target
    .closest(".card")
    .querySelector(".card__title").textContent;
  openModal(popupImage);
}

profileEditBtn.addEventListener("click", () => openModal(popupEdit));
profileAddBtn.addEventListener("click", () => openModal(popupNewCard));
formElement.addEventListener("submit", handleFormSubmit);
formImgElement.addEventListener("submit", handleFormSubmit);

closeOnEsc(popup);
closeOnClick(closePopup, popup);
closeOnOverlay(popup);
