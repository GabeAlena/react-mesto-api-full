import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Card from './Card';

function Main(props) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-avatar-button">
                    <button 
                        className="profile__avatar-button" 
                        onClick={props.onEditAvatar} 
                        type="button" 
                        aria-label="кнопка изменить аватар"
                    >
                    </button>
                    <img 
                        className="profile__avatar" 
                        src={currentUser.avatar} 
                        alt="аватар" 
                    />
                </div>
                <div className="profile__info">
                    <div className="profile__inform">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button 
                            className="profile__edit-button" 
                            onClick={props.onEditProfile} 
                            type="button"
                            aria-label="кнопка изменить данные пользователя"
                        >
                        </button>
                    </div>
                    <p className="profile__job">{currentUser.about}</p>
                </div>
                <button 
                    className="profile__add-button" 
                    onClick={props.onAddPlace} 
                    type="button" 
                    aria-label="кнопка добавить фото"
                >
                </button>
            </section>

            <section className="elements-container">
                {props.cards.map((card) => {
                    return (
                        <Card 
                           key={card._id} 
                           card={card} 
                           onCardClick={props.onCardClick} 
                           onCardLike={props.onCardLike} 
                           onCardDelete={props.onCardDelete} 
                        />
                    )
                })}
            </section>
        </main>
    )
}

export default Main;