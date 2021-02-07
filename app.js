//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}


const weatherApi = {
    key: "e5ef740c33acbde1f2ba5356842bce15",
    baseUrl: "https://api.openweathermap.org/data/2.5/onecall"
}

//Event Listener function 
window.addEventListener('load', () => {

    //Accessing Geolocation of user
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;


            // using fetch to get data
            fetch(`${weatherApi.baseUrl}?lat=${lat}&lon=${lon}&lang=no&units=metric&appid=${weatherApi.key}`)
                .then(response => {
                    return response.json();
                }).then((data) => {
                    showWeatherReport(data)
                })
                .catch((e) => {
                    console.log(e)
                })

        })
    }
})

//Show Weather Report
function showWeatherReport(weather) {

    // rendering current location
    let city = document.getElementById('city');
    city.innerText = `${weather.timezone}`;

    //current temperature
    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.current.temp)}&deg;c`

    //current temp icon
    let icon = document.getElementById('icon');
    const icons = weather.current.weather[0].icon;
    icon.innerHTML = `<img src = 'icons/${icons}.png'/>`;

    //current temperature description
    let description = document.getElementById('weather');
    description.innerHTML = `${weather.current.weather[0].description}`;

    //current date
    let date = document.getElementById("date")
    let dates = new Date(weather.current.dt * 1000).getDay()
    date.innerText = `${dates} Feb 2021`;


    // render each daily forecast

    let forecastData = document.getElementById("forecast-data")
    //looping through each day data list
    let wList = weather.daily
    for (i = 1; i <= wList.length; i++) {

        let date = new Date(wList[i].dt * 1000);
        let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
        let name = days[date.getDay()];
        let icon = wList[i].weather[0].icon
        let dayBlock = document.createElement("div");
        console.log(wList[i])
        dayBlock.className = 'forecast';

        // creating Html Elements to loop throught it to get the forecast details 
        dayBlock.innerHTML = `<div class="forecast-day">${name}</div>
          <div class="degrees">${Math.round(wList[i].temp.day)}&deg;c</div>
          <div><img  class = "image"src = "icons/${icon}.png"/></div>`;
        forecastData.appendChild(dayBlock);
    };
}






