window.onload = function() {
    renderPastSearches();
}

let userSearch = {};
let userSearches = [];
let searchButton = document.querySelector("#search");

searchButton.addEventListener("click", function(event) {
    event.preventDefault();
    renderNewSearch();
});

renderPastSearches = function() {
    let savedSearches = JSON.parse(localStorage.getItem("userSearches"));
    
    if (savedSearches) {
        savedSearches.forEach(search => {
            let recentSearches = document.querySelector("#placeholder");
            let pastSearch = document.createElement("button");
            pastSearch.innerHTML = search.city;
            recentSearches.append(pastSearch);
        });
        localStorage.setItem("userSearches", JSON.stringify(savedSearches));
        userSearches = savedSearches;
    }
}

renderNewSearch = function() {
    let cityInput = document.querySelector("#city").value;
    let stateInput = document.querySelector("#state").value;
    let countryInput = document.querySelector("#country").value;

    userSearch = {
        city: cityInput,
        state: stateInput,
        country: countryInput
    }
    
    userSearches.unshift(userSearch);

    localStorage.setItem("userSearches", JSON.stringify(userSearches));

    let recentSearches = document.querySelector("#placeholder");
    let pastSearch = document.createElement("button");
    pastSearch.innerHTML = userSearch.city;
    recentSearches.prepend(pastSearch);

    document.querySelector("#city").value = "";
    document.querySelector("#state").value = "";
    document.querySelector("#country").value = "";
 
    const OpenWeatherAPIKey = "46b81e893d3ffba91a8b72288469ebe6";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${userSearch.city}&appid=${OpenWeatherAPIKey}&units=imperial`
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // current forecast
            let currentConditions = document.querySelector("#current-conditions");
            let currentInfo = document.createElement("h3");
            currentInfo.innerHTML = data.city.name + " " + data.list[0].dt_txt;
            let currentIcon = document.createElement("img");
            currentIcon.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`);
            currentInfo.appendChild(currentIcon);
            currentConditions.appendChild(currentInfo);

            let currentTemp = document.createElement("p");
            currentTemp.innerHTML = "Temperature: " + data.list[0].main.temp + "°F";
            currentConditions.appendChild(currentTemp);

            let currentWind = document.createElement("p");
            currentWind.innerHTML = "Wind speed: " + data.list[0].wind.speed + " MPH";
            currentConditions.appendChild(currentWind);

            let currentHumidity = document.createElement("p");
            currentHumidity.innerHTML = "Humidity: " + data.list[0].main.humidity + "%";
            currentConditions.appendChild(currentHumidity);

            // day 1 forecast
            let day1Conditions = document.querySelector("#day-1-forecast");
            let day1Info = document.createElement("h3");
            day1Info.innerHTML = data.list[8].dt_txt;
            let day1Icon = document.createElement("img");
            day1Icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[8].weather[0].icon}.png`);
            day1Info.appendChild(day1Icon);
            day1Conditions.appendChild(day1Info);

            let day1Temp = document.createElement("p");
            day1Temp.innerHTML = "Temperature: " + data.list[8].main.temp + "°F";
            day1Conditions.appendChild(day1Temp);

            let day1Wind = document.createElement("p");
            day1Wind.innerHTML = "Wind speed: " + data.list[8].wind.speed + " MPH";
            day1Conditions.appendChild(day1Wind);

            let day1Humidity = document.createElement("p");
            day1Humidity.innerHTML = "Humidity: " + data.list[8].main.humidity + "%";
            day1Conditions.appendChild(day1Humidity);

            // day 2 forecast
            let day2Conditions = document.querySelector("#day-2-forecast");
            let day2Info = document.createElement("h3");
            day2Info.innerHTML = data.list[16].dt_txt;
            let day2Icon = document.createElement("img");
            day2Icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[16].weather[0].icon}.png`);
            day2Info.appendChild(day2Icon);
            day2Conditions.appendChild(day2Info);

            let day2Temp = document.createElement("p");
            day2Temp.innerHTML = "Temperature: " + data.list[16].main.temp + "°F";
            day2Conditions.appendChild(day2Temp);

            let day2Wind = document.createElement("p");
            day2Wind.innerHTML = "Wind speed: " + data.list[16].wind.speed + " MPH";
            day2Conditions.appendChild(day2Wind);

            let day2Humidity = document.createElement("p");
            day2Humidity.innerHTML = "Humidity: " + data.list[16].main.humidity + "%";
            day2Conditions.appendChild(day2Humidity);

            // day 3 forecast
            let day3Conditions = document.querySelector("#day-3-forecast");
            let day3Info = document.createElement("h3");
            day3Info.innerHTML = data.list[24].dt_txt;
            let day3Icon = document.createElement("img");
            day3Icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[24].weather[0].icon}.png`);
            day3Info.appendChild(day3Icon);
            day3Conditions.appendChild(day3Info);

            let day3Temp = document.createElement("p");
            day3Temp.innerHTML = "Temperature: " + data.list[24].main.temp + "°F";
            day3Conditions.appendChild(day3Temp);

            let day3Wind = document.createElement("p");
            day3Wind.innerHTML = "Wind speed: " + data.list[24].wind.speed + " MPH";
            day3Conditions.appendChild(day3Wind);

            let day3Humidity = document.createElement("p");
            day3Humidity.innerHTML = "Humidity: " + data.list[24].main.humidity + "%";
            day3Conditions.appendChild(day3Humidity);

            // day 4 forecast
            let day4Conditions = document.querySelector("#day-3-forecast");
            let day4Info = document.createElement("h3");
            day4Info.innerHTML = data.list[32].dt_txt;
            let day4Icon = document.createElement("img");
            day4Icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[32].weather[0].icon}.png`);
            day4Info.appendChild(day4Icon);
            day4Conditions.appendChild(day4Info);

            let day4Temp = document.createElement("p");
            day4Temp.innerHTML = "Temperature: " + data.list[32].main.temp + "°F";
            day4Conditions.appendChild(day4Temp);

            let day4Wind = document.createElement("p");
            day4Wind.innerHTML = "Wind speed: " + data.list[32].wind.speed + " MPH";
            day4Conditions.appendChild(day4Wind);

            let day4Humidity = document.createElement("p");
            day4Humidity.innerHTML = "Humidity: " + data.list[32].main.humidity + "%";
            day4Conditions.appendChild(day4Humidity);

            // day 5 forecast
            let day5Conditions = document.querySelector("#day-3-forecast");
            let day5Info = document.createElement("h3");
            day5Info.innerHTML = data.list[40].dt_txt;
            let day5Icon = document.createElement("img");
            day5Icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[40].weather[0].icon}.png`);
            day5Info.appendChild(day5Icon);
            day5Conditions.appendChild(day5Info);

            let day5Temp = document.createElement("p");
            day5Temp.innerHTML = "Temperature: " + data.list[40].main.temp + "°F";
            day5Conditions.appendChild(day5Temp);

            let day5Wind = document.createElement("p");
            day5Wind.innerHTML = "Wind speed: " + data.list[40].wind.speed + " MPH";
            day5Conditions.appendChild(day5Wind);

            let day5Humidity = document.createElement("p");
            day5Humidity.innerHTML = "Humidity: " + data.list[40].main.humidity + "%";
            day5Conditions.appendChild(day5Humidity);
        })
        .catch(function (error) {
            console.log("There was a problem with the fetch operation");
        });
}


//Ideas
    // Let users input cities, but they should only be able to input a city from my city.list.json object

    // IF the city matches a city on the city.list.json AND the state matches
    // fetch API for that city

    // IF the city matches a city on the city.list.json AND the country matches