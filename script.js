const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// used unsplash api from https://unsplash.com/developers
const count = 5;
const apiKey = '8ldZe3twvhvS279TxZeeC1V4NAPH0ymGxtSsos7vZ7Y';
const apiUrl =`https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// check if all images are loaded
function imageLoaded() {
   imagesLoaded++;
   if (imagesLoaded === totalImages){
      ready = true;
      loader.hidden = true;
   }
}

// to create setAttributes finction
function setAttributes(element, attributes) {
   for (const key in attributes){
      element.setAttribute(key, attributes[key]);
   }
}

// Display Photos Function
function displayPhotos() {
   imagesLoaded = 0;
   totalImages = photosArray.length;
   // run function for each photo in array
   photosArray.forEach((photo) => {
      //  to create <a> link to unsplash
      const item = document.createElement('a');
      setAttributes(item, {
         href: photo.links.html,
         target: '_blank',
      });

      // to create <img> for photo
      const img = document.createElement('img');
      setAttributes(img, {
         src: photo.urls.regular,
         alt: photo.alt_description,
         title:photo.alt_description,
      });

      // event listner when each image is loaded
      img.addEventListener('load', imageLoaded);

      // put <img> in <a> then <a> in image-container
      item.appendChild(img);
      imageContainer.appendChild(item);
   });
}

// Get Photos From unsplash api
async function getPhotos(){
   try {
      const respose = await fetch(apiUrl);
      photosArray = await respose.json();
      displayPhotos();
   } catch (error) {
      // catch error here
   }
}

// event listner to add more images when near to the end of loaded images
window.addEventListener('scroll', () => {
   if ( window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
      ready = false;
      getPhotos();
   }
});

// on load 
getPhotos();