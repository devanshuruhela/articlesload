const apikey = "DEMO_KEY";
const apiurl = `https://api.nasa.gov/planetary/apod?api_key=${apikey}&count=${10}`;

//Elements
const resultsNav = document.getElementById('resultsNav');
const favouritesNav = document.getElementById('favouritesNav');
const imagesContainer = document.querySelector('.images-container');
const savedConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

let resultsarray = [];

let favourites = {};


function showcontent(whichpage)
{
  window.scrollTo({top:0 , behavior:'instant'} );
  if(whichpage === 'results')
  {
    resultsNav.classList.remove('hidden');
    favouritesNav.classList.add('hidden');
  }
  else
  {
     resultsNav.classList.add("hidden");
     favouritesNav.classList.remove("hidden");
  }
  loader.classList.add('hidden');
}


function saveFavourites(artUrl)
{
  resultsarray.forEach(items =>
    {
      if(items.url.includes(artUrl) && !favourites[artUrl])
      {
        favourites[artUrl] = items;
        savedConfirmed.hidden = false;
        setTimeout(() => {
          savedConfirmed.hidden = true;
        },2000);
        localStorage.setItem('favArticles' , JSON.stringify(favourites))
      }
    })

}

// remove favourite
function removeFavourites(Url)
{
  if(favourites[Url])
  {
    delete favourites[Url]; 
    localStorage.setItem('favArticles' , JSON.stringify(favourites));

    updatedom('favourites')
  }
}
// to create dom dynamically
function createdom(whichpage)
{
  const currentarray = whichpage === 'results'? resultsarray: Object.values(favourites)
  currentarray.forEach(result=>
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
      cardbody.classList.add('card-body');

      //card title
      const cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title');
      cardTitle.textContent = result.title;
      //Save text
      const saveText = document.createElement('p');
      saveText.classList.add('clickable');
      if(whichpage === 'results')
      {
              saveText.textContent = "Add to Favourites";
              saveText.setAttribute(
                "onclick",
                `saveFavourites('${result.url}')`
              );
      }
      else{
              saveText.textContent = "Remove Favourites";
              saveText.setAttribute(
                "onclick",
                `removeFavourites('${result.url}')`
              );
      }

      // Card text
      const cardText = document.createElement('p');
      cardText.classList.add('.card-text')
      cardText.textContent = result.explanation;

      // footer

      const footer = document.createElement('small');
      footer.classList.add('text-muted');
      // date
      const date = document.createElement('strong');
      date.textContent = result.date;

      // copyright
      const copyright = document.createElement('span');
      if(result.copyright === undefined)
      {
        copyright.textContent =  '';
      }
      copyright.textContent = ` ${result.copyright}`;

      //appending
      footer.append(date , copyright);
      cardbody.append(cardTitle , saveText , cardText , footer);
      link.appendChild(image);
      card.append(link , cardbody);
      console.log(card)
      imagesContainer.appendChild(card)
    })
}
function updatedom(whichpage)
{
  if(localStorage.getItem('favArticles'))
  {
    favourites = JSON.parse(localStorage.getItem('favArticles'));

  }
  imagesContainer.textContent = '';
  createdom(whichpage);
  showcontent(whichpage);
}

async function getnasaimages() {
  // show loader
  loader.classList.remove('hidden')
  try {
    const response = await fetch(apiurl);
    resultsarray = await response.json();
    console.log(resultsarray);
    updatedom('results');
  } catch (error) {}
}


getnasaimages();