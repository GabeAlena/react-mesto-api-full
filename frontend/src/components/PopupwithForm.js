import React from 'react';

function PopupWithForm(props) {
    return(
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_active' : ''}`}>
            <div className="popup__container">
                <button 
                    className="popup__close-btn" 
                    type="button" 
                    aria-label="закрыть форму" 
                    onClick={props.onClose}
                >
                </button>
                <form 
                    className="popup__form" 
                    name={props.name} 
                    onSubmit={props.onSubmit} 
                >
                    <h2 className="popup__title">{props.title}</h2>
                    {props.children}
                    <button type="submit" className="popup__button">{props.textButton}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;