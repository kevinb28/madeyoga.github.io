const __BASEURL__      = 'https://www.mangaeden.com/api/';
const __MANGALIST__    = 'list/0/?p=1&l=1';
const __MANGADETAIL__  = 'https://www.mangaeden.com/api/manga/';
const __BASE_IMGURL__  = 'https://cdn.mangaeden.com/mangasimg/98x/';

let manga_arr = [];
let mangalist = [];

fetch(__BASEURL__ + __MANGALIST__)
    .then((resp) => resp.json())
    .then(handleResponse);

function handleResponse(data) {
    manga_arr = data.manga;
    mangalist = manga_arr;
}

function showHistory(<?php echo $data['id_manga'];?>)	{
	
	var history = history_list.toString();
	list_element = document.getElementById('list');
	loadHistory(history, 1);
}

function loadHistory(manga_id, history_length)	{
    console.log(manga_id);
    // get manga from list
    let manga = __MANGADETAIL__ + manga_id;
    console.log(manga);
    // get manga on card element
    var mangaOnCard = displayOnCard(manga, history_length);

    // show it on page in list_element.
    list_element.appendChild(mangaOnCard);
}

function displayOnCard(manga, number=1) {
    console.log(manga);
    var div_child   = document.createElement('div');
    div_child.onclick = () => {
        location.href = './detail.html?mangaid=' + manga.i;
    };
    // child contains: 
    let img         = document.createElement('img');
    var title       = document.createElement('div');
    var genres      = document.createElement('div');
    var describe    = document.createElement('div');
    var lastUpdate  = document.createElement('div');

    if (manga.im) {
        setTimeout( function(){
        	img.src = __BASE_IMGURL__ + manga.im;
        }, 350 * number);
    } else {
        img.src = "https://cdn.mangaeden.com/images/no_image.svg";
    }
    img.className += 'box-img';
    img.alt = manga.t;
    
    title.innerHTML = manga.t;
    title.className += 'box-title';

    for (var genre of manga.c) {
        genres.innerHTML += genre + ", ";
    }
    genres.className += 'box-genre';

    if (manga.status == 1) {
        describe.innerHTML = "Completed; ";
    } else {
        describe.innerHTML = "Ongoing; ";
    }
    describe.innerHTML += manga.h + " views";

    //lastUpdate.innerHTML += "last update " + unixTimestampToDate(manga.ld);

    div_child.appendChild(img);
    div_child.appendChild(title);
    div_child.appendChild(genres);
    div_child.appendChild(describe);
    div_child.appendChild(lastUpdate);
    div_child.className += 'box';

    return div_child;
}
