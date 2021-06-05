import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
const axios = require("axios");

export default function MyList() {
    const [cookies] = useCookies(["user"]);
    const [mangaList, setMangaList] = useState([]);

    const authToken = cookies.user;

    useEffect(() => {
        async function getFollowedManga() {
            const response = await axios.get('https://api.mangadex.org/user/follows/manga?limit=50', { 
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            let mangaArray = [];

            for(let i = 0; i < response.data.results.length; i++) {
                mangaArray.push(response.data.results[i].data.attributes.title.en.toString());
            }
            setMangaList(mangaArray);
        }

        getFollowedManga();
    }, [authToken])

    return (
        <div>
            <ul>
                {mangaList.map(element => <li key={element}>{element}</li>)}
            </ul>
        </div>   
    )
}

// async function nextFiftyManga()