if ('serviceWorker' in navigator) {
    window.addEventListener('load', ()=>{
        navigator.serviceWorker.register('./service-worker.js')
            .then((reg) => {
                console.log('Service worker registered. scope: ', reg.scope);
            }, function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Update UI notify the user they can add to home screen
    // btnAdd.style.display = 'block';
});

install.addEventListener('click', (e) => {
    deferredPrompt.prompt();	
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
        .then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
            } else {
            console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
});


const __BASE_URL__      = 'https://www.mangaeden.com/api/';
const __MANGA_LIST__    = 'list/0/?p=1&l=1';
const __MANGA_DETAIL__  = 'https://www.mangaeden.com/api/manga/';

const __BASE_IMG_URL__  = 'https://cdn.mangaeden.com/mangasimg/98x/';

// memory
let mangas = [];
let mangaList = [];
let current_list_length = 0;
const list_increment = 7;

fetch(__BASE_URL__ + __MANGA_LIST__)
    .then((resp) => resp.json())
    .then(handleResponse)
    .catch(error);

function handleResponse(data) {
    // array of manga.
    mangas = data.manga;
    mangaList = mangas;
    console.log(mangas);

    // shows 10 first manga. old method
    // addMangaTo(list_element, 0, list_increment);
    // current_list_length = list_increment;

    showManga(7);
}

/**
 * 
 * @param {*} number 
 * new method.
 * better way to load manga element.
 * 
 */
function showManga(number = 7) {
    list_element = document.getElementById('list');
    loadMangaElement(list_element, number);
}

/**
 * 
 * @param {*} list_element html tag element. Element with id `list`.
 * @param {*} number number of manga to be loaded.
 * 
 */
function loadMangaElement(list_element, number) {
    if (mangaList.length <= 0 || number <= 0) {
        return;
    }

    let manga = mangaList.pop();

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
        	img.src = __BASE_IMG_URL__ + manga.im;
        }, 1000 * number);
    } else {
        img.src = "https://cdn.mangaeden.com/images/no_image.svg";
    }
    img.className += 'box-img';
    
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

    lastUpdate.innerHTML += "last update " + unixTimestampToDate(manga.ld);

    div_child.appendChild(img);
    div_child.appendChild(title);
    div_child.appendChild(genres);
    div_child.appendChild(describe);
    div_child.appendChild(lastUpdate);
    div_child.className += 'box';

    list_element.appendChild(div_child);

    setTimeout(function(){ loadMangaElement(list_element, number - 1) }, 100);
    // loadMangaElement(list_element, number - 1)
}

/**
 * Old method. 
 */
function loadMore() {
    var start_index = current_list_length;
    var end_index   = current_list_length + list_increment;
    addMangaTo(list_element, start_index, end_index);
    current_list_length = end_index;
}
/**
 * Old method.
 * 
 * @param {*} list_element html tag element. Element with id `list`.
 * @param {*} start_index start index from manga list that want to be loaded.
 * @param {*} end_index end index from manga list that want to be loaded.
 * 
 * Sometimes server error 503.
 * gonna change this & use setTimeout to load the manga.
 */
function addMangaTo(list_element, start_index, end_index) {
    for (var i = start_index; i < end_index; i++) {
        // must use `let`, not `var`. to handle async method.
        let manga = mangas[i];

        // see handleDetailResponse() methods below.
        // fetch(__MANGA_DETAIL__ + mangas[i].i + '/')
        //     .then((resp) => resp.json())
        //     .then(function(data){
        //         handleDetailResponse(list_element, manga, data);
        //     })
        //     .catch(error);

        var div_child   = document.createElement('div');
        div_child.onclick = () => {
            location.href = './detail.html?mangaid=' + manga.i;
        };
        // child contains: 
        var img         = document.createElement('img');
        var title       = document.createElement('div');
        var genres      = document.createElement('div');
        var describe    = document.createElement('div');
        var lastUpdate  = document.createElement('div');

        if (manga.im) {
            img.src = __BASE_IMG_URL__ + manga.im;
        } else {
            img.src = "https://cdn.mangaeden.com/images/no_image.svg";
        }
        img.className += 'box-img';
        
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

        lastUpdate.innerHTML += "last update " + unixTimestampToDate(manga.ld);

        div_child.appendChild(img);
        div_child.appendChild(title);
        div_child.appendChild(genres);
        div_child.appendChild(describe);
        div_child.appendChild(lastUpdate);
        div_child.className += 'box';

        list_element.appendChild(div_child);
    }
}


/**
 *
 * Better UX, but violate the api cors.
 * 
 * */
function handleDetailResponse(parent, manga, manga_detail) {
    var div_child   = document.createElement('div');
    // child contains
    var img         = document.createElement('img');
    var title       = document.createElement('div');
    var authors     = document.createElement('div');
    var describe    = document.createElement('div');

    if (manga.im) {
        img.src = __BASE_IMG_URL__ + manga.im;
    }
    title.innerHTML = manga.t;
    if (manga_detail.author) {
        authors.innerHTML = 'By ' + manga_detail.author;
    }
    if (manga_detail.status == 1) {
        describe.innerHTML = "Completed; ";
    } else {
        describe.innerHTML = "Ongoing; ";
    }
    
    describe.innerHTML += manga_detail.chapters.length + " chapters";
    img.className += 'box-img';
    title.className += 'box-title';

    div_child.appendChild(img);
    div_child.appendChild(title);
    div_child.appendChild(authors);
    div_child.appendChild(describe);
    div_child.className += 'box';
    parent.appendChild(div_child);
}

function error(e) {
    console.log(e);
}

function unixTimestampToDate(timestamp) {
    var date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
}
