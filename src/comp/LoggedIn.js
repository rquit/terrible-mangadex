import React from "react";
import { useCookies } from 'react-cookie';

export default function LoggedIn() {
    const [cookies, removeCookie] = useCookies(["user"]);

    return (
        <div>
            <h1>You are logged in!</h1>
            <button onClick={removeCookie(cookies.userAuth)}>Remove Auth Token</button><br />


            <a href="/manga">manga</a>
            <br />
            <a href="/mylist">my manga list</a>
        </div>
    )
}