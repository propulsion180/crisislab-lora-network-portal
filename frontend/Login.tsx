import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login({setLoggedIn}) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://" + location.host + "/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to log in");
            }

            const data = await response.json();

            localStorage.setItem("token", data.token)

            alert("Login sucessfull!");
            
            setLoggedIn(true)
        } catch (error) {
            console.error("Error during login: ", error);
            setError("Invalid username or password");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {error && <p>{ error }</p>}
                <div>
                    <label htmlFor='username'>Username: </label>
                    <input id='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />     
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
                
}
