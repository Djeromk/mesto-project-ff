export const placesList = document.querySelector(".places__list");
export const profileEditBtn = document.querySelector(".profile__edit-button");
export const profileAddBtn = document.querySelector(".profile__add-button");
export const popupWindows = document.querySelectorAll(".popup");
export const popupEdit = document.querySelector(".popup_type_edit");
export const popupNewCard = document.querySelector(".popup_type_new-card");
export const popupImage = document.querySelector(".popup_type_image");
export const imageSrc = document.querySelector(
  ".popup_type_image .popup__image"
);
export const imageText = document.querySelector(
  ".popup_type_image .popup__caption"
);
export const profileForm = document.querySelector(
  'form[name = "edit-profile"]'
);
export const formImgElement = document.querySelector(
  'form[name = "new-place"]'
);
export const formAvatarElement = document.querySelector(
  'form[name = "edit-avatar"]'
);
export const nameInput = document.querySelector(".popup__input_type_name");
export const jobInput = document.querySelector(
  ".popup__input_type_description"
);
export const closePopupButtons = document.querySelectorAll(".popup__close");
export const profileName = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const cardInputName = document.querySelector(
  ".popup__input_type_card-name"
);
export const cardInputUrl = document.querySelector(".popup__input_type_url");
export const profileImage = document.querySelector(".profile__image");
export const popupAvatar = document.querySelector(".popup_type_avatar");
export const loader = document.querySelector(".loader");
export const popupEditSubmitButton = popupEdit.querySelector(".popup__button");
export const popupNewCardSubmitButton =
  popupNewCard.querySelector(".popup__button");
export const popupAvatarSubmitButton =
  popupAvatar.querySelector(".popup__button");
export const deleteCardPopup = document.querySelector(
  ".popup_type_delete-card"
);
export const deleteConfirmButton = deleteCardPopup.querySelector(".button");
export const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
