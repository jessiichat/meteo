const position = document.querySelector("#location");
const button = document.querySelector("#button");
const background = document.querySelector("body");
const weather = document.querySelector("#weather");
const weatherIcon = document.querySelector("#weather > #details > i");

// button.addEventListener('click', (event) => {
//     event.preventDefault();

//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${position.value}&appid=bc019dfb0a96939e2188a2e2bbc49b29`;
//     fetch(url)
//     .then(response => response.json())
//     .then((data) => {
//         // Par défaut, la température affichée est en kelvin
//         // Conversion 0°K = -273,15°C
//         const temp = Math.round(data.main.temp - 273.15);

//         // Changement du fond en fonction de la température
//         if (temp <= 0){
//             background.style.background = "linear-gradient(0.25turn, #ebf8e1, #B8D0EB ,#B9FAF8)";
//         } else if (temp < 15){
//             background.style.background = "linear-gradient(0.25turn, #d8e2dc, #ece4db ,#ffd7ba)";
//         } else if (temp > 20){
//             background.style.background = "linear-gradient(0.25turn, #ffd7ba, #fec89a ,#e5989b)";
//         }

//         // weather est un tableau contenant un seul objet
//         //<p>${data.weather[0].description}</p>
//         let description = '';
//         for (const properties of data.weather){
//             description =  properties.description;
//         }

//         weather.innerHTML = '';
//         weather.insertAdjacentHTML('beforeend',
//             `
//                 <h2>${position.value}</h2>
//                 <div id="details">
//                     <p>${temp}°C</p>
//                     <p>${description}</p>
//                 </div>
//             `
//         );
//     })
//     .catch((error) => {
//         console.log(`Voici mon erreur ${error}`);
//     });
// });

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
                <div id="details">
                    <p>${temp}°C</p>
                    <p>${description}</p>
                    <img src="http://openweathermap.org/img/wn/${icon}.png" alt"">
                </div>
            `
        );
    })
    .catch((error) => {
        console.log(`Voici mon erreur ${error}`);
    });
}

position.addEventListener('keypress', (event) => {
    if (event.keyCode === 13){
        event.preventDefault();
        displayWeather();
    }
    
});