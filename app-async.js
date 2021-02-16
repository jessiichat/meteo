const city = document.querySelector("#citiesContainer");
const citiesList = document.querySelector("#cities");
const background = document.querySelector("body");
const weather = document.querySelector("#weather");
const weatherIcon = document.querySelector("#weather > #details > i");

// Fonction pour afficher les résultats
async function displayWeather(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bc019dfb0a96939e2188a2e2bbc49b29`;
    const response = await fetch(url);
    const weatherData = await response.json();
    const temperature = Math.round(weatherData.main.temp - 273.15);

    if (temperature <= 0){
        background.style.background = "linear-gradient(0.25turn, #ebf8e1, #B8D0EB, #B9FAF8)";
    } else if (temperature < 15){
        background.style.background = "linear-gradient(0.25turn, #d8e2dc, #ece4db, #ffd7ba)";
    } else if (temperature > 20){
        background.style.background = "linear-gradient(0.25turn, #ffd7ba, #fec89a, #e5989b)";
    }

    let description = '';
    let icon = '';
    for (const properties of weatherData.weather){
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
}

// Autocomplétion
async function autoComplete(){
    const url = 'https://places-dsn.algolia.net/1/places/query';
    const response = await fetch(url);
    const cities = await response.json();
    const cityList = cities.hits;

    for (let city of cityList){
        city = city.district;
        citiesList.insertAdjacentHTML('beforeend',
        `
            <option value="${city}">${city}</option>
        `
        );
    }
}

// Soumission lorsqu'on appuie sur la touche entrée
cities.addEventListener('keypress', (event) => {
    autoComplete();

    if (event.keyCode === 13){
        event.preventDefault();
        displayWeather(city.value);
    }
});