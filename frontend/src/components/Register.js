import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
    const [state, setState] = useState({email: '', password: ''});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setState((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(onRegister) {
            onRegister({
                email: state.email, 
                password: state.password
            })
        }
    }

    return (
        <div className="sign sign_up">
            <p className="sign__welcome">
                Регистрация
            </p>
            <form className="sign__form" onSubmit={handleSubmit}>
                <input 
                    className="sign__input"
                    required
                    placeholder="Email"
                    id="email-input" 
                    name="email" 
                    type="email"
                    minLength="2"
                    maxLength="40"
                    onChange={handleChange}
                    value={state.email || ''}
                />
                <input
                    className="sign__input"
                    required
                    placeholder="Пароль"
                    id="password-input" 
                    name="password" 
                    type="password"
                    minLength="2"
                    maxLength="40"
                    onChange={handleChange}
                    value={state.password || ''}
                />
                
                <button type="submit" className="sign__button">Зарегистрироваться</button>
            </form>

            <div className="sign__in">
                <p>Уже зарегистрированы?</p>
                <Link to="/signin" className="sign__login-link">Войти</Link>
            </div>
        </div>
    )
} 

export default Register;