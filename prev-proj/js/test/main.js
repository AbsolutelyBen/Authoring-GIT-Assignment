// JavaScript Document
//Self Executing Anonymous Function - use this. prevents global variables

(function() {

	var photos = ["slide1-000", "slide1-001", "slide1-002", "slide1-003", "slide1-004"]; //this is creating an array for the images
	var count = 1;


	//function
	
		 //toggle the mobile navigation
 var mobileNavtoggle = document.querySelector(".nav-toggle");
 mobileNavtoggle.addEventListener("click", show_mobile_nav, true);

 var mobileNavigation = document.querySelector(".mobile_navBox");
 mobileNavigation.style.display="none";

 //functions
 function show_mobile_nav(e)//this is used for showing & hiding the mobile navigation
 {
  //this will stop the button from jumping up to the top of the page
  e.preventDefault();

  console.log("clicked open the mobile nav")

  //use to check mobileNavigation's style - if there is none, then change the style
  if(mobileNavigation.style.display=="none")
  {
   mobileNavigation.style.display="block";
   mobileNavtoggle.style.background="#b10c31 url('images/nav-mobile-close.png') no-repeat center center";
   mobileNavtoggle.style.backgroundSize="100%";
  }
  else
  {
   mobileNavigation.style.display="none";
   mobileNavtoggle.style.background="#b10c31 url('images/nav-mobile.png') no-repeat center center";
   mobileNavtoggle.style.backgroundSize="70%";
   e.preventDefault(); 

  }
 }

})();

