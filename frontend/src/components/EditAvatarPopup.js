import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const avatarRef = useRef();

    useEffect(() => {
        if (props.isOpen) {
            avatarRef.current.value = '';
        }
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    return (
        <PopupWithForm 
            name="avatar" 
            title="Обновить аватар"
            isOpen={props.isOpen} 
            onClose={props.onClose}
            textButton="Сохранить"
            onSubmit={handleSubmit}
        >
            <fieldset className="popup__info">
                <input
                    className="popup__input popup__input_type_avatar"
                    required
                    type="url"
                    id="avatar-input"
                    placeholder="Ссылка на аватар" 
                    name="avatar"
                    ref={avatarRef}
                />
                <span className="avatar-input-error popup__input-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;