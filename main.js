const button = document.querySelector("#search-button");
const input = document.querySelector("#city-input");
let resultDiv = document.querySelector("#search-result");

// Recoleccion de datos de una ciudad individual
async function getWeatherData(city) {
    // const apiKey = "16bca1041c60b9213f71fbf7a54da25c";
    const apiKey = "d49f768bd5ea4f249972455f214cadfe";
    const data = Object.create(null);
    try {
        const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        const obj = await resp.json();
        data.city = obj.name;
        data.country = obj.sys.country;
        data.temp = (obj.main.temp - 273.15).toFixed(2);
        data.desc = obj.weather[0].description;
        data.hum = obj.main.humidity;
        return data;
    } catch (error) {
        insertNotFound(city);
        return null;
    }
}

// Recoleccion de datos de todas las ciudades recibidas
async function getAllWeatherData(cities) {
    const promises = cities.map(city => getWeatherData(city));
    return Promise.all(promises);
}

// Insercion de datos a contenido visible en HTML
function insertNewWeatherCard(data) {
    resultDiv.innerHTML += `<div class="card weather-card">
                                <div class="card-body">
                                    <div class="text-center">
                                        <h5 class="card-title">${data.city}, ${data.country}</h5>
                                        <div class="card-text text-danger">
                                            <i class="fas fa-temperature-high"></i> ${data.temp}C
                                        </div>
                                        <div class="card-text text-warning"> 
                                            <i class="fas fa-sun"></i> ${data.desc}
                                        </div>
                                        <div class="card-text text-primary">
                                            <i class="fas fa-tint"></i> ${data.hum} %
                                        </div>
                                    </div>
                                </div>
                            </div>`
}

// Respuesta a ciudad no encontrada 
function insertNotFound(city) {
    resultDiv.innerHTML += `<div class="alert alert-warning">
                                <i class="fas fa-city"></i> ${city} not found
                            </div>`
}
// Respuesta a input no valido
function notValidInput() {
    resultDiv.innerHTML = `<div class="alert alert-info">
                                <i class="fas fa-search"></i> Insert a city before searching
                           </div>`
}

// Funcion principal de la app. Deteccion de busqueda y ejecucion general del programa.
button.addEventListener("click", async () => {
    const strIn = input.value || null;
    if (strIn != null) {
        const cities = strIn.trim().split(",");
        const collectedData = await getAllWeatherData(cities);
        collectedData.forEach(data => {
            if (data != null) {
                insertNewWeatherCard(data);
            }
        })
    } else {
        notValidInput();
    }
})