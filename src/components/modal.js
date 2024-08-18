function openModal(popup, profileName, profileDescription) {
  if (popup.classList.contains("popup_type_edit")) {
    popup.querySelector("form").name.value = profileName.textContent;
    popup.querySelector("form").description.value =
      profileDescription.textContent;
  }
  popup.classList.add("popup_is-opened");
}

function closeModal(popup) {
  popup.forEach((item) => {
    item.classList.remove("popup_is-opened");
  });
}

function closeOnOverlay(popup) {
  popup.forEach((popupCard) => {
    popupCard.addEventListener("click", (event) => {
      if (event.target === popupCard) {
        closeModal(popup);
      }
    });
  });
}

function closeOnClick(closePopup, popup) {
  closePopup.forEach((item) => {
    item.addEventListener("click", () => closeModal(popup));
  });
}

function closeOnEsc(popup) {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal(popup);
  });
}

export { openModal, closeModal, closeOnOverlay, closeOnClick, closeOnEsc };
