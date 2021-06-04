import React, { useState, useEffect } from 'react';
const axios = require("axios");

// test manga id: 77bee52c-d2d6-44ad-a33a-1734c1fe696a

export default function Manga() {
    const [mangaId, setMangaId] = useState("");
    const [mangaChapter, setMangaChapter] = useState("");
    const [mangaImage, setMangaImage] = useState("");
    const [mangaPage, setMangaPage] = useState(0);
    const [englishList, setEnglishList] = useState("");

    async function getEnglishChapters(mangaBaseId) {
        const response = await axios.get(`https://api.mangadex.org/manga/${mangaBaseId}/feed`);
        // console.log(response.data.results[0].data.attributes.translatedLanguage);
        let arrOfEng = [];

        for(let i = 0; i < response.data.results.length; i++) {
            let chapterNum = response.data.results[i].data.attributes.chapter;
            if(response.data.results[i].data.attributes.translatedLanguage === "en")
                arrOfEng.push(`number ${i}: chapter ${chapterNum}`);
        }

        arrOfEng = arrOfEng.join(", ");

        setEnglishList(arrOfEng);
    }

    async function getMangaChapterInfo(mangaBaseId, relativeChapterNumber, pageNumber) {
        const response = await axios.get(`https://api.mangadex.org/manga/${mangaBaseId}/feed`);

        let id = response.data.results[relativeChapterNumber].data.id.toString();
        let imageId = response.data.results[relativeChapterNumber].data.attributes.data[pageNumber].toString();
        let chapterHash = response.data.results[relativeChapterNumber].data.attributes.hash.toString();

        const baseUrl = await axios.get(`https://api.mangadex.org/at-home/server/${id}`);

        console.log("sent");
        setMangaImage(`${baseUrl.data.baseUrl}/data/${chapterHash}/${imageId}`);
    }

    function decrement() {
        setMangaPage(mangaPage - 1);
        getMangaChapterInfo(mangaId, mangaChapter, mangaPage);
    }

    function increment() {
        setMangaPage(mangaPage + 1);
        getMangaChapterInfo(mangaId, mangaChapter, mangaPage);
    }

    function english() {
        getEnglishChapters(mangaId);
    }

    const submitMangaInfo = async (e) => {
        e.preventDefault();
        setMangaPage(0);
        getMangaChapterInfo(mangaId, mangaChapter, mangaPage);
    }

    return (
        <div className="manga-info">
            <h1>manga title placeholder</h1>
            <form className="submit-manga-details" onSubmit={submitMangaInfo}>
                <label htmlFor="submit-manga-id">Manga Id </label>
                <input id="submit-manga-id" type="text" value={mangaId} onChange={(e) => setMangaId(e.target.value)} />

                <label htmlFor="submit-manga-chapter">Manga Chapter </label>
                <input id="submit-manga-chapter" type="text" value={mangaChapter} onChange={(e) => setMangaChapter(e.target.value)} />
                <button type="submit">Submit</button>
            </form>

            <button onClick={decrement}>Previous Page</button>
            <button onClick={increment}>Next Page</button>

            <button onClick={english}>Show English Chapters</button>

            <h3>{mangaId} {mangaChapter} {mangaPage}</h3>
            <h4>{englishList}</h4>
            <img src={mangaImage}></img>
        </div>
    )
}
