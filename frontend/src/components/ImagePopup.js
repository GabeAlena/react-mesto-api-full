import React from 'react';

function ImagePopup(props) {
    function handleClosePopup(evt) {
        if(evt.target.classList.contains('.popup')){
            props.onClose();
        }
    }

    return (
        <div className={`popup popup_modal ${props.card.isOpen && 'popup_active'}`} onClick={handleClosePopup}>
            <div className="popup__modalWindow">
              <button 
                  className="popup__close-btn" 
                  type="button" 
                  aria-label="закрыть модальное окно" 
                  onClick={props.onClose}
              >
              </button>
              <img 
                 className="popup__image-modal" 
                 src={props.card.link} 
                 alt={props.card.name} 
              />
              <h2 className="popup__title-modal">{props.card.name}</h2>
            </div>
        </div>
    )
}

export default ImagePopup;