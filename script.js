const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photoArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;


// Unsplash API
const accessKey = '7SwzOcStJ12GGYdl8-EWN6ck7x0ojqHuIcwDk35ngv0';
const secretKey = 'rThcUTreRPt21r74Q4xYoipV7HMpcxqHdftrdc_2AJI';

let count = 30;

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded() {

    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        loader.hidden = true;
        ready = true;
    }

}

//Helper function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//Create element for links and photos, Add to DOM
function displayPhoto() {
    imagesLoaded = 0;
    totalImages = photoArray.length;
    photoArray.forEach((photo) => {

        //Create <a> to link to Unsplash

        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        //Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        //Event listner, check when each is finished
        img.addEventListener('load', imageLoaded);

        //Put img in <a> them put both in photo container

        item.appendChild(img)
        imageContainer.appendChild(item);

    });
}

async function getPhotos() {

    try {

        const response = await fetch(apiUrl);
        photoArray= await response.json();

        displayPhoto();

    } catch (error) {
        console.log(error);
    }

}

//Check to see if scrolling near bottom of page, load more photos

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

getPhotos();