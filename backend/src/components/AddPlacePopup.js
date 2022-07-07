import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const [card, setCard] = useState({});

    useEffect(() => {
        if (props.isOpen) {
            card.name = '';
            card.link = '';
        }
    }, [props.isOpen]);

    const handleChange = (event) => { 
      const { name, value } = event.target;
      setCard((card) => ({ 
        ...card, 
         [name]: value
      })) 
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: card.name,
            link: card.link
        });
    }

    return (
        <PopupWithForm 
            name="place" 
            title="Новое место" 
            isOpen={props.isOpen} 
            onClose={props.onClose}
            onSubmit={handleSubmit}
            textButton="Создать"
        >
            <fieldset className="popup__info">
                <input
                    className="popup__input popup__input_type_nameimage" 
                    required
                    minLength="2"
                    maxLength="30"
                    id="mesto-input"
                    type="text" 
                    placeholder="Название"
                    name="name"
                    value={card.name || ''}
                    onChange={handleChange}
                />
                <span className="mesto-input-error popup__input-error"></span>
                <input
                    className="popup__input popup__input_type_link"
                    required
                    type="url"
                    id="url-input"
                    placeholder="Ссылка на картинку" 
                    name="link"
                    value={card.link || ''}
                    onChange={handleChange}
                />
                <span className="job-input-error popup__input-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default AddPlacePopup;