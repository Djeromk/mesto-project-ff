function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal() {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (openedPopup) {
    openedPopup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscape);
  }
}

function closeOnOverlay(popups) {
  popups.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  });
}

function closeOnClick(closePopupButtons) {
  closePopupButtons.forEach((item) => {
    item.addEventListener("click", closeModal);
  });
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    closeModal();
  }
}

export { openModal, closeModal, closeOnOverlay, closeOnClick };
