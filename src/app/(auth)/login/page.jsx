"use client";
import React, { useState } from 'react';
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
const API_URL = 'http://localhost:8080/auth/login';


function Login({ onLogin }) {
    const router = useRouter();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName, password })
            });


            const text = await response.text();
            console.log("status:", response.status);
            console.log("respuesta cruda:", text);
            let token;
            try {
                const data = JSON.parse(text); // intenta parsear como JSON
                token = data.token || data.access_token || data.jwt;
                console.log("data parseada:", data, "token extraído:", token);
            } catch {
                token = text; // si no es JSON, el texto ES el token directamente
            }

            if (response.ok && token) {
                localStorage.setItem('jwt', token);
                // Verifica que el token se haya guardado correctamente
                router.push('/dashboard');


                if (onLogin) onLogin(token);
            } else{
                setError(token.message || 'Login failed');
            }
        } catch (err) {

            setError(err.message);

        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-card">
                <h1>Bienvenido</h1>
                <p>Inicia sesión para continuar</p>

                <div className="input-group">

                    <input
                        type="text"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        required
                        placeholder='Ingrese su usurio'
                    />
                </div>
                <div className="input-group">

                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>

    );
}

export default Login;