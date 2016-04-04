// Javascript
// initial idea from the following URL (as the assignment is based around GIT, not code itself)
// http://www.cssscript.com/vanilla-javascript-library-for-photo-gallery-lightbox-photoviewerjs/

var PhotoViewerPlugin = (function(document, pv) {

  // Public Properties
  
  pv.AnimationTime = 200;

  // Private Members
  
  var ClassName = "photo";

  var images = [];
  var currentLoadedImage;

  var posterGallery;
  var posterViewer; //var PhotoViewer;

  var pvCloseUpTitle;
  var PhotoViewerClose;

  var pvCurrentImgContainer;
  var pvCurrentIMG;

  var pvPrev;
  var PhotoViewerNextImage;
  var PhotoViewerCount;

  // Public Methods
 
  pv.Initialize = function (className){
    if (arguments.length < 1){
      ClassName = "photo";
    }
    else {
      ClassName = className;
    }

    Init();
    SetImageLinkListeners();

    PhotoViewerClose.addEventListener('click', ClosePhotoViewer);
    PhotoViewerNextImage.addEventListener('click', LoadNextImage);
    pvPrev.addEventListener('click', LoadPreviousImage);
  }

  // Private Methods

  var Init = function () {
    images = [];

    posterGallery = document.getElementsByClassName(ClassName);
    posterViewer = document.getElementById("posterViewer");

    pvCloseUpTitle = document.getElementById("pvCloseUpTitle");
    PhotoViewerClose = document.getElementById("PhotoViewerClose");

    pvCurrentImgContainer  = document.getElementById("pvCurrentImgContainer");
    pvCurrentIMG = document.getElementById("pvCurrentIMG");

    pvPrev = document.getElementById("pvPrev");
    PhotoViewerNextImage = document.getElementById("PhotoViewerNextImage");
    PhotoViewerCount = document.getElementById("PhotoViewerCount");
  }

  var GetPhotos = function () {
    if(images.length > 0) {
      return;
    }
    else {
      for(var i = 0; i < posterGallery.length; i++) {
        var image = {
          imageIndex: i,
          imageSrc: posterGallery[i].href,
          imageTitle: posterGallery[i].title
        }
        images.push(image);
      }
    }
  }

  var SetImageLinkListeners = function () {
    for(i = 0; i < posterGallery.length; i++) {
      posterGallery[i].addEventListener("click", ImageOpen);
    }
  }

  var ImageOpen = function (e) {
    e.preventDefault();
    InitializePhotoViewer(this.href);
  }

  var InitializePhotoViewer = function (clickedImage) {
    GetPhotos();
    for(var i = 0; i < images.length; i++) {
      if(images[i].hasOwnProperty('imageSrc')) {
        if(images[i].imageSrc === clickedImage) {
          OpenPhotoViewer(images[i]);
        }
      }
    }
  }

  var SetPhotoViewerPhoto = function (currentImage) {
    pvCurrentImgContainer.className  = PHOTO_VIEWER_IMAGE_CLASS;

    setTimeout(function(){
        pvCurrentIMG.setAttribute('src', currentImage.imageSrc);
        pvCloseUpTitle.innerHTML = currentImage.imageTitle;
        PhotoViewerCount.innerHTML = currentImage.imageIndex + 1 + '/' + images.length;
        currentLoadedImage = currentImage.imageIndex;
        pvCurrentImgContainer.className = PHOTO_VIEWER_IMAGE_CLASS + " " + PHOTO_VIEWER_LOADED_CLASS;
    }, pv.AnimationTime)
  }

  var ToggleLoading = function (display) {
    if (display) {
      console.log("Loading images...");
    }
    else {
      console.log("Loading complete!");
    }
  }

  var OpenPhotoViewer = function(clickedImage) {
    posterViewer.className += PHOTO_VIEWER_VISIBLE;
    SetPhotoViewerPhoto(clickedImage);
  }

  var ClosePhotoViewer = function(e) {
    e.preventDefault();
    posterViewer.className = PHOTO_VIEWER;
  }

  var LoadNextImage = function(e) {
    e.preventDefault();
    if (currentLoadedImage >= images.length - 1 ) {
      return;
    }

    SetPhotoViewerPhoto(images[currentLoadedImage + 1]);
  }

  var LoadPreviousImage = function(e) {
    e.preventDefault();
    if (currentLoadedImage <= 0) {
      return;
    }
    SetPhotoViewerPhoto(images[currentLoadedImage - 1]);
  }

  // CONSTANTS
 
  var PHOTO_VIEWER_VISIBLE = " pvVisible";
  var PHOTO_VIEWER = "photo-viewer";
  var PHOTO_VIEWER_IMAGE_CLASS = "currentIMG";
  var PHOTO_VIEWER_LOADED_CLASS = "loaded";

  return pv;

}(document, PhotoViewerPlugin || {}));

document.addEventListener("DOMContentLoaded", function(event) {

  // Launch the Photo Viewer Plugin
  PhotoViewerPlugin.Initialize();

});