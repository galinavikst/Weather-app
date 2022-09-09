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

function forecast() {
  let forecastSpace = document.querySelector(".forecast");
  let forecastCodeHTML = `<div class="forecast-day">`;
  let days = ["Today", "Monday", "Tursday", "Wednesday", "Thursday", "Friday"];
  days.forEach(function displayAllForecast(day) {
    forecastCodeHTML =
      forecastCodeHTML +
      `
     <div class="row-day shadow">
      <h4>${day}</h4>
      <div class="row">
        <div class="col-6">
          <h2>
            <i class="day fa-solid fa-certificate"></i>
          </h2>
          <p>15°C</p>
        </div>
        <div class="col-6">
          <h2>
            <i class="night fa-solid fa-moon"></i>
          </h2>
          <p>10°C</p>
        </div>
      </div>
    </div>
  `;
  });
  forecastCodeHTML = forecastCodeHTML + `</div>`;
  forecastSpace.innerHTML = forecastCodeHTML;
}

forecast();

let temp = null;

let buttonCurrentLocation = document.querySelector("#button-current-location");
buttonCurrentLocation.addEventListener("click", navigatorOn);

let searchButton = document.querySelector("#button-search");
searchButton.addEventListener("click", getCityInputValue);

let form = document.querySelector("form");
form.addEventListener("submit", getCityInputValue);

visitApp("Farsta");
