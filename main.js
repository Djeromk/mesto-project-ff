(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)}function t(){var e=document.querySelector(".popup_is-opened");e&&(e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n))}function n(e){"Escape"===e.key&&t()}var r={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-22",headers:{authorization:"a3db599c-e4ce-4d85-a961-b7a4dffab843","Content-Type":"application/json"}};function o(e){return e.ok?e.json():Promise.reject(e.status)}var c=null,a=null,u=document.querySelector(".popup_type_delete-card"),i=document.querySelector("#card-template").content;function l(e){return function(e){return fetch("".concat(r.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:r.headers}).then(o)}(e).then((function(){a&&a.remove()})).catch((function(e){console.error("Ошибка при удалении карточки:",e)}))}function s(e,t){var n=t.target.closest(".card").querySelector(".card__like-count");t.target.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(r.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:r.headers}).then(o)}(e).then((function(e){t.target.classList.remove("card__like-button_is-active"),n.textContent=e.likes.length})).catch((function(e){console.error("Ошибка при удалении лайка:",e)})):function(e){return fetch("".concat(r.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:r.headers}).then(o)}(e).then((function(e){t.target.classList.add("card__like-button_is-active"),n.textContent=e.likes.length})).catch((function(e){console.error("Ошибка при добавлении лайка:",e)}))}function d(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}var p,f,_=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.removeAttribute("disabled")):(t.classList.add(n.inactiveButtonClass),t.setAttribute("disabled",!0))},m=document.querySelector(".places__list"),y=document.querySelector(".profile__edit-button"),v=document.querySelector(".profile__add-button"),h=document.querySelectorAll(".popup"),S=document.querySelector(".popup_type_edit"),b=document.querySelector(".popup_type_new-card"),q=document.querySelector(".popup_type_image"),g=document.querySelector(".popup_type_image .popup__image"),k=document.querySelector(".popup_type_image .popup__caption"),C=document.querySelector('form[name = "edit-profile"]'),E=document.querySelector('form[name = "new-place"]'),L=document.querySelector('form[name = "edit-avatar"]'),x=document.querySelector(".popup__input_type_name"),A=document.querySelector(".popup__input_type_description"),U=document.querySelectorAll(".popup__close"),w=document.querySelector(".profile__title"),P=document.querySelector(".profile__description"),T=document.querySelector(".popup__input_type_card-name"),j=document.querySelector(".popup__input_type_url"),D=document.querySelector(".profile__image"),I=document.querySelector(".popup_type_avatar"),O=document.querySelector(".loader"),B=S.querySelector(".popup__button"),z=b.querySelector(".popup__button"),M=I.querySelector(".popup__button"),N=document.querySelector(".popup_type_delete-card").querySelector(".button"),J={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function H(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function V(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"prepend",r=function(t,n,r){var o=i.querySelector(".places__item").cloneNode(!0),l=o.querySelector(".card__delete-button"),s=o.querySelector(".card__like-button"),d=o.querySelector(".card__like-count"),p=o.querySelector(".card__image");return o.querySelector(".card__title").textContent=t.name,p.alt=t.name,p.src=t.link,d.classList.add("card__like-count_is-active"),d.textContent=t.likes.length,t.likes.some((function(e){return e._id===r._id}))&&s.classList.add("card__like-button_is-active"),t.owner._id===r._id?l.addEventListener("click",(function(){c=t._id,a=o,e(u)})):l.remove(),p.addEventListener("click",n.openImagePopup),s.addEventListener("click",(function(e){return n.likeCard(t._id,e)})),o}(t,{deleteCard:l,likeCard:s,openImagePopup:$},arguments.length>2?arguments[2]:void 0);m[n](r)}function $(t){t.preventDefault(),g.src=t.target.src,g.alt=t.target.alt,k.textContent=t.target.closest(".card").querySelector(".card__title").textContent,e(q)}function F(e,t){t.textContent=e?"Сохранение...":"Сохранить"}function G(e){e?O.classList.add("loader_visible"):O.classList.remove("loader_visible")}function K(t,n){var r,o,c,a;r=t,o=n,c=Array.from(r.querySelectorAll(o.inputSelector)),a=r.querySelector(o.submitButtonSelector),c.forEach((function(e){d(r,e,o),e.value=""})),_(c,a,o),e(t)}G(!0),D.addEventListener("click",(function(){K(I,J)})),y.addEventListener("click",(function(){K(S,J),x.value=w.textContent,A.value=P.textContent})),v.addEventListener("click",(function(){K(b,J)})),N.addEventListener("click",(function(){c&&(N.textContent="Удаление...",l(c).then((function(){t()})).finally((function(){N.textContent="Да"})))})),C.addEventListener("submit",(function(e){!function(e){e.preventDefault();var n,c={name:x.value,about:A.value};F(!0,B),(n=c,fetch("".concat(r.baseUrl,"/users/me"),{method:"PATCH",headers:r.headers,body:JSON.stringify({name:n.name,about:n.about})}).then(o).then((function(e){return e}))).then((function(e){w.textContent=e.name,P.textContent=e.about})).catch((function(e){console.log("Ошибка при обновлении профиля:",e)})).finally((function(){F(!1,B),t()}))}(e)})),E.addEventListener("submit",(function(e){!function(e){e.preventDefault();var n={name:T.value,link:j.value};F(!0,z),function(e){return fetch("".concat(r.baseUrl,"/cards"),{method:"POST",headers:r.headers,body:JSON.stringify({name:e.name,link:e.link})}).then(o)}(n).then((function(n){V(n,"prepend",p),t(),e.target.reset()})).catch((function(e){console.log("Ошибка при добавлении карточки:",e)})).finally((function(){F(!1,z)}))}(e)})),L.addEventListener("submit",(function(e){!function(e){e.preventDefault();var n={link:L.link.value};F(!0,M),function(e){return fetch("".concat(r.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:r.headers,body:JSON.stringify({avatar:e.link})}).then(o)}(n).then((function(e){D.style.backgroundImage="url(".concat(e.avatar,")")})).catch((function(e){console.log("Ошибка при обновлении аватара:",e)})).finally((function(){F(!1,M),t()}))}(e)})),f=J,Array.from(document.querySelectorAll(f.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t,n,r){var o=Array.from(e.querySelectorAll(t)),c=e.querySelector(n);_(o,c,r),o.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch||t.validity.typeMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?d(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,t,r),_(o,c,r)}))}))}(e,f.inputSelector,f.submitButtonSelector,f)})),function(e){e.forEach((function(e){e.addEventListener("click",t)}))}(U),h.forEach((function(e){e.addEventListener("click",(function(n){n.target===e&&t()}))})),Promise.all([fetch("".concat(r.baseUrl,"/users/me"),{headers:{authorization:r.headers.authorization}}).then(o),fetch("".concat(r.baseUrl,"/cards"),{headers:{authorization:r.headers.authorization}}).then(o)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return H(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?H(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];p=o,c.forEach((function(e){return V(e,"append",o)})),G(!1),function(e){w.textContent=e.name,P.textContent=e.about,D.style.backgroundImage="url(".concat(e.avatar,")")}(o)})).catch((function(e){console.error("Ошибка при выполнении запросов:",e)}))})();