import React, { useState } from 'react';
const axios = require("axios");

export default function HomePage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errStat, setErrStat] = useState("");

    async function submitLogin(e) {
        e.preventDefault();

        await axios.post(`https://api.mangadex.org/auth/login`, {
            username: username,
            password: password
        }).then(() => {
            console.log("success!");
            setErrStat("success!");
        }).catch(err => {
            console.error(err);
            setErrStat("fail.");
        });
    }

    return (
        <div className="homepage">
            <header className="homepage-header">
                <h1>Log Into MangaDex!</h1>
                <form className="login-form" onSubmit={submitLogin}>
                    <label htmlFor="username" >Username: </label>
                    <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <label htmlFor="password" >Password: </label>
                    <input id="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button type="submit">Submit</button>
                </form>

                <h1>{username}</h1>
                <h1>{errStat}</h1>

                <a href="/manga">manga</a>
                <br />
                <a href="/mylist">my manga list</a>
            </header>
        </div>
    )
}