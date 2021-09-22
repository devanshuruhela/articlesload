const apikey = "DEMO_KEY";
const apiurl = `https://api.nasa.gov/planetary/apod?api_key=${apikey}&count=${10}`;

//Elements
const resultsNav = document.getElementById('resultsNav');
const favouritesNav = document.getElementById('favouritesNav');
const imagesContainer = document.querySelector('.images-container');
const savedConfirmed = document.querySelector('saved-confirmed');
const loader = document.querySelector('.loader');

let resultsarray = [];
// to create dom dynamically
function createdom()
{
  resultsarray.forEach(result=>
    {
      //card
      const card = document.createElement('div');
      card.classList.add('card');
      const link = document.createElement('a');
      //link
      link.href = result.hdurl;
      link.title = 'View Full Image';
      link.target = "_blank";
      //image
      const image = document.createElement('img')
      image.classList.add('card-img-top')
      image.src = result.url;
      image.alt = "Nasa image of the Day";
      image.loading = 'lazy';

      //full card
      const cardbody = document.createElement('div');
      cardbody.classLis.add('card-body');

      //card title
      const cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title')
      
    })
}


async function getnasaimages() {
  try {
    const response = await fetch(apiurl);
    resultsarray = await response.json();
    console.log(resultsarray);
  } catch (error) {}
}

//getnasaimages();