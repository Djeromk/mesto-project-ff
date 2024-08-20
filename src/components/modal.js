function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal() {
  const openedPopup = document.querySelector(".popup_is-opened");
  openedPopup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

function closeOnOverlay(popup) {
  popup.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  });
}

function closeOnClick(closePopupButtons) {
  closePopupButtons.forEach((item) => {
    item.addEventListener("click", () => closeModal());
  });
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    closeModal();
  }
}

export { openModal, closeModal, closeOnOverlay, closeOnClick };
