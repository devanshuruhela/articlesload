const apikey = "DEMO_KEY";
const apiurl = `https://api.nasa.gov/planetary/apod?api_key=${apikey}&count=${10}`;

let resultsarray = [];

async function getnasaimages() {
  try {
    const response = await fetch(apiurl);
    resultsarray = await response.json();
    console.log(resultsarray);
  } catch (error) {}
}

//getnasaimages();