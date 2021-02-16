const cities = document.querySelector("#citiesContainer");
const citiesList = document.querySelector("#cities");
// const button = document.querySelector("#button");
const background = document.querySelector("body");
const weather = document.querySelector("#weather");
const weatherIcon = document.querySelector("#weather > #details > i");
// const autocompleteContainer = document.querySelector("#autocomplete");
// autocompleteContainer.style.display = 'none';

// Fonction pour afficher les résultats
function displayWeather(){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cities.value}&appid=bc019dfb0a96939e2188a2e2bbc49b29`;
    fetch(url)
    .then(response => response.json())
    .then((data) => {
        // Par défaut, la température affichée est en kelvin
        // Conversion 0°K = -273,15°C
        const temperature = Math.round(data.main.temp - 273.15);

        // Changement du fond en fonction de la température
        if (temperature <= 0){
            background.style.background = "linear-gradient(0.25turn, #ebf8e1, #B8D0EB, #B9FAF8)";
        } else if (temperature < 15){
            background.style.background = "linear-gradient(0.25turn, #d8e2dc, #ece4db, #ffd7ba)";
        } else if (temperature > 20){
            background.style.background = "linear-gradient(0.25turn, #ffd7ba, #fec89a, #e5989b)";
        }

        // weather est un tableau contenant un seul objet
        //<p>${data.weather[0].description}</p>
        let description = '';
        let icon = '';
        for (const properties of data.weather){
            description =  properties.description;
            icon = properties.icon;
        }

        weather.innerHTML = '';
        weather.insertAdjacentHTML('beforeend',
            `
                <h2>${cities.value}</h2>
                <div class="flex" id="details">
                    <p>${temperature}°C</p>
                    <p>${description}</p>
                    <img src="http://openweathermap.org/img/wn/${icon}.png" alt"${description}">
                </div>
            `
        );

        // Affichage de la carte
        const coordinate = data.coord;
        getMap(coordinate.lat, coordinate.long);

    })
    .catch((error) => {
        console.log(`Voici mon erreur ${error}`);
    });
}

// Autocomplétion
function autoComplete(){
    const url = 'https://places-dsn.algolia.net/1/places/query';
    fetch(url, {
        method : 'POST',
        body: JSON.stringify({query: event.currentTarget.value})     //transforme en chaine de caractère
    })
    .then(response => response.json())
    .then((data) => {
        const cityList = data.hits;

        for (let city of cityList){
            city = city.district;
            citiesList.insertAdjacentHTML('beforeend',
            `
                <option value="${city}">
            `
            );
        }
    })
    .catch((error) => {
        console.log(`Voici mon erreur : ${error}`);
    })
}

// Affichage de la géolocalisation
function getMap(lat, long){
    var mymap = L.map('mapid').setView([lat, long], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiamVzc2lpY2hhdCIsImEiOiJja2plNWloa3YwMnJ4MnJsb3lhbnI2ZzhxIn0.34MxKJrVNrWCVhk8dmbvyg'
    }).addTo(mymap);
}

// Soumission lorsqu'on appuie sur la touche entrée
cities.addEventListener('keypress', (event) => {
    autoComplete();

    if (event.keyCode === 13){
        event.preventDefault();
        displayWeather();
    }
});