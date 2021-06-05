import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
const axios = require("axios");

export default function MyList() {
    const [cookies] = useCookies(["user"]);
    const [mangaList, setMangaList] = useState([]);

    const authToken = cookies.userAuth;
    let mangaArray = [];

    useEffect(() => {
        async function getFollowedManga() {
            const response = await axios.get('https://api.mangadex.org/user/follows/manga?limit=50', { 
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            for(let i = 0; i < response.data.results.length; i++) {
                mangaArray.push({
                    title: response.data.results[i].data.attributes.title.en,
                    description: response.data.results[i].data.attributes.description.en.toString().substring(0,300).concat("...")
                });
            }
            setMangaList(mangaArray)
        }
        getFollowedManga();
    }, [authToken])

    return (
        <div>
            <ul>
                {mangaList && mangaList.map(manga => <MangaCard key={manga.title} manga={manga} />)}
            </ul>
        </div>   
    )
}

function MangaCard(props) {
    const { title, description } = props.manga;
    return (
        <div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    )
}