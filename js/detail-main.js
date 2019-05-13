const urlParams = new URLSearchParams(window.location.search);
const mangaId = urlParams.get('mangaid');
title.innerHTML = "Manga ID: " + mangaId;

const _BASE_URL_ = 'https://www.mangaeden.com/api/manga/';

fetch(_BASE_URL_ + mangaId + "/")
    .then((resp) => resp.json())
    .then(handleDetailResponse)
    .catch(error);

function handleDetailResponse(data) {
    console.log(data);
}

function error(e) {
    console.log(e);
}