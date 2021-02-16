async function autoComplete(){
    const url = 'https://places-dsn.algolia.net/1/places/query';
    const response = await fetch(url);
    const city = await response.json();
    const cities = city.hits;

    cities.forEach((index) =>{
        var cityName = ' ';
        cityName = index.locale_names.default[0];
        cityList.insertAdjacentHTML('beforeend',
            `
                <option value="${cityName}">
            `
        );
    });
}
