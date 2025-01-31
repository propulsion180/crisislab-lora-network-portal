import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AddUser({ currUser, host }) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [admin, setAdmin] = useState<boolean>(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://" + host + "/add_user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    creator: currUser,
                    username,
                    password,
                    isAdmin: admin,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to log in");
            }
            
            navigate("/accounts");
            
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
                <div>
                    <label htmlFor='admin'>Is Admin: </label>
                    <input id='admin' type='checkbox' checked={admin} onChange={(e) => setAdmin(e.target.checked)} />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}
