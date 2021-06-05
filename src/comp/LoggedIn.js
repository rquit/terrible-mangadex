import React from "react";

export default function LoggedIn() {
    return (
        <div>
            <h1>You are logged in!</h1>

            <a href="/manga">manga</a>
            <br />
            <a href="/mylist">my manga list</a>
        </div>
    )
}