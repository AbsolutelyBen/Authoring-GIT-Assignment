// JavaScript Document

(function() {
	"use strict";

	var request, url, movieLinks, path, build, filterLinks = document.querySelectorAll(".filterNav a"), 
	srchInput = document.querySelector("#srch"), 
	live = document.querySelector("#livesrch");
	

	function init() {
		url="admin/includes/getMovies.php";
		build='';
		path = "init";
		reqInfo(path);
	}
	

	function reqInfo(path) {
		// Purpose of this function is passed data from the client to the server(https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest).
		// console.log(path);
		if(window.XMLHttpRequest) {
			request = new XMLHttpRequest();

		}else{
			request = new ActiveXObject("Microsoft.XMLHTTP");

		}

		request.open("GET", url, true);
		request.send();

		if(path==="liveSearch"){
			request.onreadystatechange = searchItems;
		}else{
			request.onreadystatechange = addItems;
		}
		
	}

	function addItems() { // Purpose of this function is to write the content into the page, this is not used for live search.
		//populate the full ist on the page
		var con = document.querySelector(".movies"), details = document.querySelector(".details");


		if((request.readyState===4) && (request.status===200)) {
			var items = JSON.parse(request.responseText);
			//console.log(items);

		if(items.length!==0) {
			if(items.length > 1) {

				con.innerHTML = "";
				 details.innerHTML = "";

			for (var i=0;i<items.length; i++) {
				//add classes for styling
				
				build = '<div class="large-3 medium-4 small-12 columns">';
				build += '<h6>'+items[i].movies_title+'</h6>';
				build += '<img src="images/'+items[i].movies_thumb+'" alt="'+items[i].movies_title +'">';
				build += '<p>'+items[i].movies_year+'</p>';
				build += '<a href="index.php?id='+items[i].movies_id+'">more...</a><br><br>';
				build += '</div>';
				//build += '</div>';

				con.innerHTML += build;
			}

			movieLinks = document.querySelectorAll(".movies a");
			for(var j=0; j<movieLinks.length; j++){
				movieLinks[j].addEventListener("click", itemDetails, false);
			}


			}else{
                    details.innerHTML = "";
                    for(var k=0; k<items.length; k++) {

                    	build += '<div class="row">';
                        build = '<div class="large-4 medium-6 small-12 line columns">'+'<img src="images/'+items[k].movies_fimg+'" alt="'+items[k].movies_title+'">'+'</div>';
                        build += '<h2>'+items[k].movies_title+'</h2>';
                        build += '<p>'+items[k].movies_year+'</p>';
                        build += '<div class="large-8 medium-6 small-12 line columns">'+'<p>'+items[k].movies_storyline+'</p></div><br>';
						build += '<a href="index.php">'+'<p>Close</p>'+'</a>';
                        build += '</div>';
                        details.innerHTML += build;
                    }
                }
			
		}else{
			//error no content
			con.innerHTML = "sorry, there was a server error, please try again later.";
			}
		}
	}
	
	
	function searchItems() { // writes the content passed from PHP into the div located below the input field
		
		if((request.readyState===4) || (request.status===200)) {
			var srchItems = JSON.parse(request.responseText);

			if(srchItems == ']'){
                build = "No Results Found";
            }


			for(var i=0;i<srchItems.length;i++){
                    build += '<div class="row">';
                    build += '<div class="large-3 medium-3 small-4 line columns">'+'<img src = "images/' +srchItems[i].movies_thumb+'"class="moviethumb"'+ '"alt="' +srchItems[i].movies_title+'">'+'</div>';
                    build += '<div class="large-5 medium-5 small-4 line columns"> '+srchItems[i].movies_title+ '</div>';
                    build += '<div class="large-2 medium-2 small-4 line columns text-right end"> '+srchItems[i].movies_year+ '</div>';
                    build += '</div>';
                    
                }
			live.innerHTML = build;
			build = '';

		}
	}
	
	function liveSearch() {// rewrite the URL to be passed to the search query on the PHP side
		
		live.innerHTML='';
		var capture = srchInput.value;

	if (capture !==''){ 
		url="admin/includes/getMovies.php?srch="+capture;
		path = "liveSearch";
		reqInfo(path);
	}else{
              
        }   
   }

	function filterItems(evt) {
		evt.preventDefault();
		//console.log("Works");
		var str = evt.target.href;
		var arr = str.split("=");
		str = arr[1];
	if(str) {
			url = "admin/includes/getMovies.php?filter="+str;
	}else{
			url = "admin/includes/getMovies.php";
		}
		path = "filterItems";
		reqInfo(path);
	}

	function itemDetails(e) {
		//console.log("ITems Details");
		e.preventDefault();
		//console.log(e.target);
		var str = e.target.href;
		//console.log(str);
		var arr = str.split("=");
		//console.log(arr[1]);
		url = "admin/includes/getMovies.php?id="+arr[1];
		//console.log(url);
		path = "itemDetails";
		reqInfo(path);
	}

	
	// Listeners
	for(var i=0; i<filterLinks.length; i++){
		filterLinks[i].addEventListener("click", filterItems, false);
	}
	
	window.addEventListener("load", init, false);
	srchInput.addEventListener("keyup", liveSearch, false);
	
})();