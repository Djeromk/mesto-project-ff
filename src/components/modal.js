function openModal(popup) {
  popup.classList.add("popup_is-opened");
}

function closeModal(popup) {
  popup.forEach((item) => {
    let inputField = item.querySelectorAll("input");
    inputField.forEach((input) => {
      input.value = "";
    });
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
