<?php
        session_start();
        include 'Login_v3/connect.php';
        $user = $_SESSION['user'];
        $result = $connect->query("select * from history where id_user = '$user'");
        $data = $result->fetch_assoc();
        $connect->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
<title>Manga Eden</title>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="referrer" content="no-referrer"/>
<link rel="manifest" href="./manifest.json">
<meta name="description" content="mangaeden project">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" type="text/css" href="styles/bootstrap4/bootstrap.min.css">
<link href="plugins/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="plugins/OwlCarousel2-2.2.1/owl.carousel.css">
<link rel="stylesheet" type="text/css" href="plugins/OwlCarousel2-2.2.1/owl.theme.default.css">
<link rel="stylesheet" type="text/css" href="plugins/OwlCarousel2-2.2.1/animate.css">
<link rel="stylesheet" type="text/css" href="styles/main_styles.css">
<link rel="stylesheet" type="text/css" href="styles/responsive.css">
</head>
<body>

<div class="super_container">

	<!-- Header -->

	<header class="header">
		<div class="header_container">
			<div class="container">
				<div class="row">
					<div class="col">
						<div class="header_content d-flex flex-row align-items-center justify-content-start">
							<div class="logo"><a href="https://mangaeden.com">MangaEden.</a></div>
							<nav class="main_nav">
								<ul>
									<li class="active">
										<a href="home.html">Home</a>
									</li>
									<li>
										<a href="#" id="install">install</a>
									</li>
									<li><a href="latest-updates.html">Latest Release</a></li>
								</ul>
							</nav>
							<div class="header_extra ml-auto">
									<!-- <div class="container">
											<div class="row">
												<div class="col">
													<div class="search_panel_content d-flex flex-row align-items-center justify-content-end">
														<form action="#" class="search">
															<input id='search-manga' onchange="onChangeSearch()" type="text" class="search_input" placeholder="Search" required="required" label='search-manga' aria-label='search-manga'>
															<button onclick="searchManga()" class="search_button" style="background-color:transparent; border-color:transparent;" aria-label="search-button"><i class="fa fa-search"></i></button>
														</form>	
													</div>
												</div>
											</div>
										</div> -->
								<div class="hamburger"><i class="fa fa-bars" aria-hidden="true"></i></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		

		<!-- Social -->
		<div class="header_social">
			<ul>
				<li><a href="#"><i class="fa fa-pinterest" aria-hidden="true"></i></a></li>
				<li><a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
				<li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
				<li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
			</ul>
		</div>
	</header>

	<!-- Menu -->

	<div class="menu menu_mm trans_300">
		<div class="menu_container menu_mm">
			<div class="page_menu_content">
							
				<div class="page_menu_search menu_mm">
					<form action="#">
						<input id='search-manga' type="text" class="search_input" placeholder="Search" required="required" label='search-manga' aria-label='search-manga'>
						<button class="search_button" style="background-color:transparent; border-color:transparent;" aria-label="search-button"><i class="fa fa-search"></i></button>
					</form>	
				</div>
				<ul class="page_menu_nav menu_mm">
					<li class="page_menu_item has-children menu_mm">
						<a href="home.html">Home<i class="fa fa-angle-down"></i></a>
						<ul class="page_menu_selection menu_mm">
							<li class="page_menu_item menu_mm"><a href="#">Latest Release<i class="fa fa-angle-down"></i></a></li>
						</ul>
					</li>
				</ul>
			</div>
		</div>

		<div class="menu_close"><i class="fa fa-times" aria-hidden="true"></i></div>

		<div class="menu_social">
			<ul>
				<li><a href="https://www.pinterest.com/" aria-label='pinterest'><i class="fa fa-pinterest" aria-hidden="true"></i></a></li>
				<li><a href="https://www.instagram.com/" aria-label='instagram'><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
				<li><a href="https://www.facebook.com/" aria-label='facebook'><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
				<li><a href="https://www.twitter.com/" aria-label='twitter'><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
			</ul>
		</div>
	</div>
	
	<!-- Home -->

	
		<div class="avds_xl" style="margin-top:100px;">
			<div class="container">
				<div class="row">
					<div class="col">
						<div class="avds_xl_container clearfix">
							<div class="avds_xl_background" style="background-image:url(images/avds_xl.jpg)"></div>
							<div class="avds_xl_content">
								<div class="avds_title">All Free</div>
								<div class="avds_text">Update Every day!</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>	


	<!-- Manga -->

	<div class="container" style="display: flex; flex-wrap: wrap; justify-content: center;">
		<div id="list" class="col-md text-center"> 


		</div>				
	</div>
	
	<!-- Footer -->
	
	<footer class="footer">
		<!-- <div class="footer_background" style="background-image:url(images/footer.jpg)"></div> -->
		<div class="footer_background"></div>
		<div class="container">
			<div class="row">
				<div class="col">
					<div class="footer_content d-flex flex-lg-row flex-column align-items-center justify-content-lg-start justify-content-center">
						<div class="footer_logo"><a href="https://mangaeden.com">MangaEden.</a></div>
						<div class="copyright ml-auto mr-auto">
Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved </a>
</div>
						<div class="footer_social ml-lg-auto">
							<ul>
								<li><a href="https://www.pinterest.com/" aria-label='pinterest'><i class="fa fa-pinterest" aria-hidden="true"></i></a></li>
								<li><a href="https://www.instagram.com/" aria-label='instagram'><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
								<li><a href="https://www.facebook.com/" aria-label='facebook'><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
								<li><a href="https://www.twitter.com/" aria-label='twitter'><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</footer>
</div>

<script type="text/javascript">
	
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

    showHistory('<?php echo $data['id_manga'];?>');
}

function showHistory(history_list)	{
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
</script>

<script type='text/javascript' src='js/template.js'></script>
<script src="js/jquery-3.2.1.min.js"></script>
<script src="styles/bootstrap4/popper.js"></script>
<script src="styles/bootstrap4/bootstrap.min.js"></script>
<script src="plugins/greensock/TweenMax.min.js"></script>
<script src="plugins/greensock/TimelineMax.min.js"></script>
<script src="plugins/scrollmagic/ScrollMagic.min.js"></script>
<script src="plugins/greensock/animation.gsap.min.js"></script>
<script src="plugins/greensock/ScrollToPlugin.min.js"></script>
<script src="plugins/OwlCarousel2-2.2.1/owl.carousel.js"></script>
<script src="plugins/Isotope/isotope.pkgd.min.js"></script>
<script src="plugins/easing/easing.js"></script>
<!-- <script src="plugins/parallax-js-master/parallax.min.js"></script> -->
<script src="js/custom.js"></script>
</body>
</html>
