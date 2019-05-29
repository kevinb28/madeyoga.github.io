const urlParams = new URLSearchParams(window.location.search);
const chapterId = urlParams.get('chapterid');

const __BASE_CHAP__ = "https://www.mangaeden.com/api/chapter/";
const __BASE_IMG1__ = "https://www.mangaeden.com/img/";
const __BASE_IMG2__ = "https://cdn.mangaeden.com/mangasimg/98x/";

let pages = [];
let cursor = 0;

fetch(__BASE_CHAP__ + chapterId + "/")
    .then((resp) => resp.json())
    .then(handlePagesResponse)
    .catch(error);

function handlePagesResponse(data) {
    console.log(data);
    pages = data.images;
    cursor = pages.length - 1;

    pageList = [];
    for (var i = pages.length - 1; i >= pages.length - 5; i--) {
        var page = document.createElement('img');
        page.src = __BASE_IMG2__ + pages[i][1];
        page.className += "manga-page-image";
        pageList.push(page);
    }

    pagesElement = document.getElementById('pages');
    while (pageList.length > 0) {
        pagesElement.appendChild(pageList.pop());
    }

    // var carouselElement = document.getElementById('carousel-page-container');
    
    // var imgLink = document.createElement('a');
    // imgLink.href = "#" + pages[cursor][0];
    // imgLink.className = 'carousel-item';
    
    // var page = document.createElement('img');
    // page.src = __BASE_IMG2__ + pages[cursor][1];

    // imgLink.appendChild(page);
    // carouselElement.appendChild(imgLink);

    // the server could explode with this.
    // for (var i = pages.length - 1; i >= 0; i--) {
    //     var imgLink = document.createElement('a');
    //     imgLink.href = "#" + pages[i][0];
    //     imgLink.className = 'carousel-item';
        
    //     var page = document.createElement('img');
    //     page.src = __BASE_IMG2__ + pages[i][1];

    //     imgLink.appendChild(page);
    //     carouselElement.appendChild(imgLink);
    // }

}

function error(e) {
    console.log(e);
}