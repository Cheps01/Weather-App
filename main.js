const button = document.querySelector("#search-button");
const input = document.querySelector("#city-input");
const resultDiv = document.querySelector("#search-result");

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
        data.city = city;
        return null;
    }
    return data;
}

function insertNewWeatherCard(data) {
    resultDiv.innerHTML += `<div class="card weather-card">
                                <div class="card-body">
                                    <div class="text-center">
                                        <h5 class="card-title">${data.city}, ${data.country}</h5>
                                        <div class="card-text text-danger">
                                            <i class="fas fa-temperature-high"></i> ${data.temp}
                                        </div>
                                        <div class="card-text text-warning"> 
                                            <i class="fas fa-sun"></i> ${data.desc}
                                        </div>
                                        <div class="card-text text-primary">
                                            <i class="fas fa-tint"></i> ${data.hum}
                                        </div>
                                    </div>
                                </div>
                            </div>`
}

function insertNotFound(city) {
    resultDiv.innerHTML += `<div class="alert alert-warning">
                                <i class="fas fa-city"></i> ${city} not found
                            </div>`
}

button.addEventListener("click", () => {
    const strIn = input.value || null;
    if (strIn != null) {
        const cities = strIn.trim().split(",");
        const weatherData = cities.map(city => {
            return getWeatherData(city);
        })
        weatherData.forEach(cityData => {
            if (cityData != null) {
                console.log(cityData);
                insertNewWeatherCard(cityData);
            } else {
                insertNotFound(cityData.city);
            }
        })
    }
})