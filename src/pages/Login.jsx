import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Login = (props) => {
    const { setToken } = props;

    async function loginUser(credentials) {
        try {
            return fetch('https://top-blogapi.onrender.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })
                .then(data => data.json());
        } catch (error) {
            console.log(err.message);
        }
    }

    //event listener
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await loginUser({
            email,
            password
        });
        let errMessage = token.message;
        setToken(token);
        if (token.message = 'Usuario o contraseña incorrectos') {
            setError(errMessage);
        } else {
            setError();
        }
    }

    return (
        <div className="login-wrapper">
            <h1>Blog Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Usuario</p>
                    <input type="text" onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    <p>Contraseña</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div className="loginSubmit">
                    <button type="submit">Login</button>
                </div>
            </form>
            <p>{error}</p>
        </div>
    );
}

export default Login;