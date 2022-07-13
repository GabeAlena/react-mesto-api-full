import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
    const currentUser = useContext(CurrentUserContext);

    const isOwn = props.card.owner === currentUser._id;
    /* const isOwn = props.card.owner._id === currentUser._id; */
    const cardDeleteButtonClassName = (
      `element__trash ${isOwn ? 'element__trash_visible' : 'element__trash_hidden'}`
    );
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
      `element__like ${isLiked ? 'element__like_active' : ''}`
    );

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <section className="elements">
            <article className="element">
                <div className="element__trash-image">
                    <img 
                        className="element__image" 
                        src={props.card.link} 
                        alt={props.card.name} 
                        onClick={handleClick} 
                    />
                    <button 
                        className={cardDeleteButtonClassName} 
                        type="button" 
                        aria-label="значок удаления карточки" 
                        onClick={handleDeleteClick}
                    >
                    </button>
                </div>
                <div className="element__title-like">
                    <h2 className="element__title">{props.card.name}</h2>
                    <div className="element__like-numberLike">
                        <button 
                            className={cardLikeButtonClassName} 
                            type="button" 
                            aria-label="кнопка мне нравится" 
                            onClick={handleLikeClick}
                        >
                        </button>
                        <span className="element__numberLike">{props.card.likes.length}</span>
                    </div>
                </div>
            </article>
        </section>
    )
}

export default Card;