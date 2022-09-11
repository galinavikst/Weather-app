function getCurrentTime() {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentTime = new Date();
  let currentDay = weekDays[currentTime.getDay()];
  let currentHour = currentTime.getHours();
  let currentMinutes = currentTime.getMinutes();
  let now = document.querySelector("#now");
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  now.innerHTML = `${currentDay}, ${currentHour}:${currentMinutes}`;
}
getCurrentTime();

function getCurrentTemp(response) {
  console.log(response.data);
  temp = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let countryName = response.data.sys.country;
  let humid = response.data.main.humidity;
  let windSpeed = Math.round(response.data.wind.speed);
  let descrip = response.data.weather[0].main;
  let icon = response.data.weather[0].icon;
  let feelsLike = Math.round(response.data.main.feels_like);
  let coordLon = response.data.coord.lon;
  let coordLat = response.data.coord.lat;
  console.log(coordLat);
  console.log(coordLon);
  getForecastData(coordLat, coordLon);
  let h1 = document.querySelector("h1");
  let country = document.querySelector("#country");
  let currentTemperature = document.querySelector("#current-temperature");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let iconUrl = document.querySelector("img");
  iconUrl.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  currentTemperature.innerHTML = temp;
  h1.innerHTML = `${cityName}, `;
  country.innerHTML = countryName;
  humidity.innerHTML = humid;
  wind.innerHTML = windSpeed;
  description.innerHTML = `${descrip}, feels like ${feelsLike}°C`;
  let fTempLink = document.querySelector("#fahrenheit");
  let cTempLink = document.querySelector("#celcius");
  fTempLink.addEventListener("click", getFTemp);
  cTempLink.addEventListener("click", getCTemp);
}

function getForecastData(coordLat, coordLon) {
  console.log(coordLat);
  console.log(coordLon);
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordLat}&lon=${coordLon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(forecast);
}

function getFTemp(event) {
  event.preventDefault();
  let currentTempElement = document.querySelector("#current-temperature");
  let fTemp = Math.round(temp * 1.8 + 32);
  currentTempElement.innerHTML = fTemp;
  let fTempLink = document.querySelector("#fahrenheit");
  fTempLink.classList.add("active");
  let cTempLink = document.querySelector("#celcius");
  cTempLink.classList.remove("active");
}
function getCTemp(event) {
  event.preventDefault();
  let currentTempElement = document.querySelector("#current-temperature");
  currentTempElement.innerHTML = temp;
  let cTempLink = document.querySelector("#celcius");
  cTempLink.classList.add("active");
  let fTempLink = document.querySelector("#fahrenheit");
  fTempLink.classList.remove("active");
}

function getCityInputValue(event) {
  event.preventDefault();
  let input = document.querySelector("input");
  let city = input.value;
  let apiKey = "28483fb0bac69b11e99890f72d1b1c8f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCurrentTemp);
  let cTempLink = document.querySelector("#celcius");
  cTempLink.classList.add("active");
  let fTempLink = document.querySelector("#fahrenheit");
  fTempLink.classList.remove("active");
}

function visitApp(city) {
  let apiKey = "28483fb0bac69b11e99890f72d1b1c8f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCurrentTemp);
  let cTempLink = document.querySelector("#celcius");
  cTempLink.classList.add("active");
}

function showCurrentLocation(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "28483fb0bac69b11e99890f72d1b1c8f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCurrentTemp);
  let cTempLink = document.querySelector("#celcius");
  cTempLink.classList.add("active");
  let fTempLink = document.querySelector("#fahrenheit");
  fTempLink.classList.remove("active");
}

function navigatorOn(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}
function getWeekDays(unixTime) {
  let date = new Date(unixTime * 1000);
  let weekDay = date.getDay();
  let day = date.getDate();
  let month = date.getMonth();
  let monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return `${days[weekDay]} ${day}/${monthName[month]}`;
}

function forecast(response) {
  console.log(response.data.daily);
  let forecastArrayData = response.data.daily;
  let icon = forecastArrayData[0].weather[0].icon;
  console.log(icon);
  let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  let forecastSpace = document.querySelector(".forecast");
  let forecastCodeHTML = `<div class="forecast-day">`;

  forecastArrayData.forEach(function displayAllForecast(forecastData, index) {
    if (index < 6) {
      forecastCodeHTML =
        forecastCodeHTML +
        `
     <div class="row-day shadow">
      <h4>${getWeekDays(forecastData.dt)}</h4>
      <div class="row">
        <div class="col-6">
            <img src="media/circle-empty.png" alt="day-night-icon" width="25" />
          <p id="max-temp">${Math.round(forecastData.temp.max)}°C</p>
        </div>
        <div class="col-6">
          <img src="media/circle-full.png" alt="day-night-icon" width="25" />
          <p id="min-temp">${Math.round(forecastData.temp.min)}°C</p>
        </div>
      </div>
    </div>
      
  `;
    }
  });
  forecastCodeHTML = forecastCodeHTML + `</div>`;
  forecastSpace.innerHTML = forecastCodeHTML;
}

let temp = null;

let buttonCurrentLocation = document.querySelector("#button-current-location");
buttonCurrentLocation.addEventListener("click", navigatorOn);

let searchButton = document.querySelector("#button-search");
searchButton.addEventListener("click", getCityInputValue);

let form = document.querySelector("form");
form.addEventListener("submit", getCityInputValue);

visitApp("Farsta");
