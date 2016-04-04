// JavaScript Document
//Self Executing Anonymous Function - use this. prevents global variables

(function() {

	var photos = ["slide1-000", "slide1-001", "slide1-002", "slide1-003", "slide1-004"]; //this is creating an array for the images
	var count = 1;

	//function
	
	function randomPic() {

    document.getElementById('aboutSlide-0').className += "fadeOut";
    setTimeout(function()
    {
      document.getElementById('aboutSlide-0').src= "images/" + photos[count] + ".jpg";
      document.getElementById('aboutSlide-0').className = "";
    },500);
		//document.querySelector("#aboutSlide-0").src= "images/" + photos[count] + ".jpg";
    
		count++;

		//console.log(imgArray[count]);

		if(count === photos.length){
			count = 0;
		}
    setTimeout(randomPic, 4000);
	}
  randomPic();
		//setInterval(randomPic, 5000);

})();