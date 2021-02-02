const position = document.querySelector("#location");
const button = document.querySelector("#button");
const background = document.querySelector("body");
const weather = document.querySelector("#weather");
const weatherIcon = document.querySelector("#weather > #details > i");
// const autocompleteContainer = document.querySelector("#autocomplete");
// autocompleteContainer.style.display = 'none';


// Fonction pour afficher les résultats
function displayWeather(){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${position.value}&appid=bc019dfb0a96939e2188a2e2bbc49b29`;
    fetch(url)
    .then(response => response.json())
    .then((data) => {
        // Par défaut, la température affichée est en kelvin
        // Conversion 0°K = -273,15°C
        const temp = Math.round(data.main.temp - 273.15);

        // Changement du fond en fonction de la température
        if (temp <= 0){
            background.style.background = "linear-gradient(0.25turn, #ebf8e1, #B8D0EB ,#B9FAF8)";
        } else if (temp < 15){
            background.style.background = "linear-gradient(0.25turn, #d8e2dc, #ece4db ,#ffd7ba)";
        } else if (temp > 20){
            background.style.background = "linear-gradient(0.25turn, #ffd7ba, #fec89a ,#e5989b)";
        }

        // weather est un tableau contenant un seul objet
        //<p>${data.weather[0].description}</p>
        let description = '';
        let icon = '';
        for (const properties of data.weather){
            description =  properties.description;
            icon = properties.icon
        }

        weather.innerHTML = '';
        weather.insertAdjacentHTML('beforeend',
            `
                <h2>${position.value}</h2>
                <div class="flex" id="details">
                    <p>${temp}°C</p>
                    <p>${description}</p>
                    <img src="http://openweathermap.org/img/wn/${icon}.png" alt"${description}">
                </div>
            `
        );
    })
    .catch((error) => {
        console.log(`Voici mon erreur ${error}`);
    });
}

// Autocomplétion
function autoComplete(){
    // autocompleteContainer.style.display = 'block';

    // console.log(event.currentTarget.value);
    const url = 'https://places-dsn.algolia.net/1/places/query';
    fetch(url, {
        method : 'POST',
        body: JSON.stringify({query: event.currentTarget.value})     //transforme en chaine de caractère
    })
    .then(response => response.json())
    .then((data) => {
        const cityList = data.hits;
        // position.innerHTML = '';

        for (const cityName of cityList){
            // console.log(positionName);
            const city = cityName.locale_names.default[0];
            console.log(city);

            position.insertAdjacentHTML('beforeend',
            `
                <option value="${city}"></option>
            `
            );
        }
    })
    .catch((error) => {
        console.log(`Voici mon erreur : ${error}`);
    })
}


// Soumission lorsqu'on appuie sur la touche entrée
position.addEventListener('keypress', (event) => {
    autoComplete();

    if (event.keyCode === 13){
        event.preventDefault();
        autocompleteContainer.style.display = 'none';
        displayWeather();
    }
});