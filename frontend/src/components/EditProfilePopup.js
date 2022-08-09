import { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);
    const [userValues, setUserValues] = useState({})

    useEffect(() => {
        setUserValues(currentUser)
    }, [currentUser, props.isOpen]);

    const handleChange = (event) => { 
      const { name, value } = event.target;
      setUserValues((prev) => ({ 
        ...prev, 
         [name]: value
      })) 
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser(userValues);
    }

    return (
        <PopupWithForm 
            name="profile" 
            title="Редактировать профиль" 
            isOpen={props.isOpen} 
            onClose={props.onClose}
            onSubmit={handleSubmit}
            textButton="Сохранить"
        >
            <fieldset className="popup__info">
                <input
                    className="popup__input popup__input_type_name"
                    placeholder="Имя"
                    required
                    minLength="2"
                    maxLength="40"
                    id="name-input"
                    type="text" 
                    name="name"
                    value={userValues.name || ''}
                    onChange={handleChange}
                />
                <span className="name-input-error popup__input-error"></span>
                <input
                    className="popup__input popup__input_type_job"
                    placeholder="Профессиональная деятельность"
                    required
                    minLength="2"
                    maxLength="200"
                    id="job-input"
                    type="text" 
                    name="about"
                    value={userValues.about || ''}
                    onChange={handleChange}
                />
                <span className="job-input-error popup__input-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditProfilePopup;