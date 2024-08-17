import "./pages/index.css";
import { initialCards } from "./cards.js"

const placesList = document.querySelector(".places__list");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileAddBtn = document.querySelector(".profile__add-button");
const popup = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const ImageSrc = document.querySelector('.popup_type_image .popup__image');
const ImageText = document.querySelector('.popup_type_image .popup__caption');
const formElement = document.querySelector('form[name = "edit-profile"]');
const formImgElement = document.querySelector('form[name = "new-place"]');
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_description')
const closePopup = document.querySelectorAll(".popup__close");
const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const cardInputName = document.querySelector('.popup__input_type_card-name')
const cardInputUrl = document.querySelector('.popup__input_type_url');

function handleFormSubmit(evt) {
  evt.preventDefault();
  if(evt.currentTarget.getAttribute('name') === 'new-place') {
    const cardData = {
      name: cardInputName.value,
      link: cardInputUrl.value
    }

    createCard(cardData, deleteCard, true)
    PopupClose()
    cardInputName.value = '';
    cardInputUrl.value = '';
    return
}
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value
  PopupClose()
}

formElement.addEventListener('submit', handleFormSubmit);
formImgElement.addEventListener('submit', handleFormSubmit);

function deleteCard(e) {
  const card = e.target.closest(".places__item");
  card.remove();
}

function createCard(cardData, deleteCard, newCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const removeButton = cardItem.querySelector(".card__delete-button");
  const likeButton = cardItem.querySelector(".card__like-button");
  cardItem.querySelector(".card__image").setAttribute("src", cardData.link);
  cardItem.querySelector(".card__title").append(cardData.name);
  removeButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", likeCard)


  if(newCard){
    console.log(cardItem)
    placesList.prepend(cardItem);
    return
  }

  return cardItem;
}

initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteCard);
  placesList.append(cardElement);
});



function OpenPopup(popup) {
  popup.classList.add('popup_is-opened');
}

function OpenImagePopup(popup, imgSrc, imgTitle) {
  ImageSrc.src = imgSrc;
  ImageText.innerHTML = imgTitle
  popup.classList.add('popup_is-opened');
}

function PopupClose() {
  popup.forEach((item) => item.classList.remove('popup_is-opened'))
}

function likeCard(e) {
  console.log(e)
  if(e.target.classList.contains('card__like-button_is-active')) {
    e.target.classList.remove('card__like-button_is-active');
  }
  else
    e.target.classList.add('card__like-button_is-active');
}

//Добавляет плавную анимацию открытия/закрытия popup
popup.forEach((popup) => {
  popup.classList.add('popup_is-animated');
})

profileEditBtn.addEventListener('click', () => OpenPopup(popupEdit))
profileAddBtn.addEventListener('click', () => OpenPopup(popupNewCard))

const cardImage = document.querySelectorAll(".card__image");
cardImage.forEach((image) => {
  image.addEventListener('click', () => {
    const imgSrc = image.src
    const imgTitle = image.closest('.card').querySelector('.card__title').textContent
    OpenImagePopup(popupImage, imgSrc, imgTitle)})
})

//likeButton.forEach((card) => {
//  console.log(card)
//  card.addEventListener('click', (like) => LikeHandler(like))
//})


document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape')
  PopupClose()
})
closePopup.forEach((item) => {
  item.addEventListener('click', () => PopupClose());
})


//Закрывает popup если кликнуть вне окна
popup.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
      PopupClose();
    }
  });
})

