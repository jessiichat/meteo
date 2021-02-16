const background = document.querySelector("body");
const city = document.querySelector('#city');
const cityList = document.querySelector('#cities');
const temp = document.querySelector("#temp");
const temperatures = [];
const dates = [];

async function fetchMeteo(ville) {
    // Affichage de la température
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=1ce64129da731d692308f766613a1037`;
    const response = await fetch(url);
    const data = await response.json();
        //Appel fonction
        getMap(data.coord.lat, data.coord.lon);

        const temperature = Math.round(data.main.temp - 273.15);

        // Changement du fond en fonction de la température
        if (temperature <= 0){
            background.style.background = "linear-gradient(0.25turn, #ebf8e1, #B8D0EB, #B9FAF8)";
        } else if (temperature < 15){
            background.style.background = "linear-gradient(0.25turn, #d8e2dc, #ece4db, #ffd7ba)";
        } else if (temperature > 20){
            background.style.background = "linear-gradient(0.25turn, #ffd7ba, #fec89a, #e5989b)";
        }

        let description = '';
        let icon = '';
        data.weather.forEach((index) => {
            description =  index.description;
            icon = index.icon;
        });

        temp.innerHTML = '';
        temp.insertAdjacentHTML('beforeend',
            `
                <h2>${city.value}</h2>
                <div class="flex" id="details">
                    <p>${temperature}°C</p>
                    <p>${description}</p>
                    <img src="http://openweathermap.org/img/wn/${icon}.png" alt"${description}">
                </div>
            `
        );

    // Affichage de la prévision sur 5 jours à 12:00:00
    const urlForecast = `http://api.openweathermap.org/data/2.5/forecast?q=${ville}&appid=1ce64129da731d692308f766613a1037`;
    const responseForecast = await fetch(urlForecast);
    const weatherForecast = await responseForecast.json();

        weatherForecast.list.forEach((index) => {
            let hours = index.dt_txt.split(" ");
            if (hours[1] === "12:00:00") {
                temperatures.push(Math.round(index.main.temp - 273.15));
                dates.push(index.dt_txt);
            }
        });
        //Appel fonction
        getGraph(dates, temperatures);
}

// Soumission lorsqu'on appuie sur la touche entrée
city.addEventListener('keypress', (event) => {
    // console.log(event.currentTarget);
    autoComplete();

    if (event.keyCode === 13){
        event.preventDefault();

        fetchMeteo(city.value);
    }
});