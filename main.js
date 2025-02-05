const btn = document.querySelector("#search-button");
const input = document.querySelector("#city-input");
const rsltDiv = document.querySelector("#search-result");

async function getWeatherData(city) {
    const apiKey = "16bca1041c60b9213f71fbf7a54da25c";
    const data = Object.create(null); 
    try {
        const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        const obj = await resp.json();
        data.city = obj.name;
        data.country = obj.sys.country;
        data.temp = obj.main.temp;
        data.desc = obj.weather[0].description;
        data.hum = obj.main.humidity;
        console.log(data);
    } catch {
        alert(`${city} not found`);
        return null;
    }
    return data;
}

btn.addEventListener("click", () => {
    const strIn = input.value || null;
    if (strIn != null) {
        const cities = strIn.trim().split(",");
        const weatherData = cities.map(city => {
            return getWeatherData(city);
        })

    }
})