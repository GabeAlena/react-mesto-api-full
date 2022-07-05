import React from 'react';

function InfoTooltip(props) {
    return (
        <div className={`popup popup_sign ${props.isOpen && 'popup_active'}`}>
        <div className="popup__container popup__container_sign">
            <button className="popup__close-btn" type="button" aria-label="закрыть модальное окно" onClick={props.onClose}></button>
            <img className="popup__sign_img" src={props.image} alt={props.message} />
            <h2 className="popup__title popup__title_sign">{props.message}</h2>
        </div>
    </div>
    )
}

export default InfoTooltip;