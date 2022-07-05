import { useState } from 'react';

function Login({ onLogin }) {
    const [inputs, setInputs] = useState({email: '', password: ''});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(onLogin) {
            onLogin({
                email: inputs.email, 
                password: inputs.password
            })
        }
    }

    return (
        <div className="sign sign_in">
            <p className="sign__welcome">
                Вход
            </p>
            <form className="sign__form" onSubmit={handleSubmit}>
                <input 
                    className="sign__input"
                    placeholder="Email"
                    required
                    id="email-input" 
                    name="email" 
                    type="email"
                    minLength="2"
                    maxLength="40"
                    onChange={handleChange}
                    value={inputs.email || ''}                    
                />
                <input
                    className="sign__input"
                    placeholder="Пароль"
                    required
                    id="password-input" 
                    name="password" 
                    type="password"
                    minLength="2"
                    maxLength="40"
                    onChange={handleChange}
                    value={inputs.password || ''}                    
                />
                
                <button type="submit" className="sign__button">Войти</button>
            </form>

        </div>
    )
}

export default Login;