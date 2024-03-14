// Global variables to be used in functions
let userSearches = [];
let searchButton = document.querySelector("#search");

window.onload = function() {        // WHEN the page loads
    renderPastSearches();           // THEN the saved search history is displayed
    viewPastSearch();               // THEN the locations in the search history can be searched again by clicking the buttons
}

renderPastSearches = function() {                                               // WHEN the renderPastSearches function is called
    let savedSearches = JSON.parse(localStorage.getItem("userSearches"));       // THEN the saved searches are referenced in the local storage
    let recentSearches = document.querySelector("#placeholder");                // THEN the search history placeholder spot is targeted
    
    if (savedSearches) {                                                        // IF there are saved searches
        savedSearches.forEach(userSearch => {                                   // FOR EACH saved search
            let pastSearch = document.createElement("button");                  // THEN a button element is created
            pastSearch.innerHTML = userSearch;                                  // THEN the city's name becomes the button text
            recentSearches.append(pastSearch);                                  // THEN the button is added into the placeholder spot
        });
        userSearches = savedSearches;                                           // THEN the saved searches and the user searches are merged into one variable
    }
}

viewPastSearch = function(userSearch) {                                         // WHEN the viewPastSearch function is called
    let searchHistory = document.querySelectorAll("#placeholder button");       // THEN the buttons in the placeholder section on the page are referenced
    searchHistory.forEach((button) => {                                         // FOR EACH button in the placeholder section
        button.addEventListener("click", function() {                           // WHEN the user clicks on a past search
            userSearch = button.innerHTML;                                      // THEN the city on the button becomes the search criteria
            displayWeather(userSearch);                                         // THEN the forecast for that city is displayed on the page
        })
    })
}

searchButton.addEventListener("click", function(event) {        // WHEN the search button is clicked
    event.preventDefault();                                     // THEN the page will not refresh
    handleNewSearch();                                          // THEN it will handle the search function
});

handleNewSearch = function() {                                              // WHEN the handleSearchFunction function is called
    let userSearch = document.querySelector("#city").value;                 // THEN the user's city input is referenced
    
    userSearches.unshift(userSearch);                                       // THEN the userSearch object is pushed to the front of the userSearches array
    localStorage.setItem("userSearches", JSON.stringify(userSearches));     // THEN the user's search is stored in local storage
    document.querySelector("#city").value = "";                             // THEN the inputted text is removed from the city field so the text placeholder is shown
    renderSearchHistory(userSearch);                                        // THEN the user's search history is updated on the page
    displayWeather(userSearch);                                             // THEN the locations in the search history can be searched again by clicking the buttons
}

renderSearchHistory = function(userSearch) {                                // WHEN the renderSearchHistory function is called
    let recentSearches = document.querySelector("#placeholder");            // THEN the search history placeholder spot is targeted
    let pastSearch = document.createElement("button");                      // THEN a button element is created
    pastSearch.innerHTML = userSearch;                                      // THEN the city's name becomes the button text
    recentSearches.prepend(pastSearch);                                     // THEN the button is added into the placeholder spot
    viewPastSearch()                                                        // THEN the buttons will display the weather information when clicked
}

displayWeather = function(userSearch) {
    const OpenWeatherAPIKey = "46b81e893d3ffba91a8b72288469ebe6";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${userSearch}&appid=${OpenWeatherAPIKey}&units=imperial`
    fetch(url)
    .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // current forecast
            let currentConditions = document.querySelector("#current-conditions");
            let day1Conditions = document.querySelector("#day-1-forecast");
            let day2Conditions = document.querySelector("#day-2-forecast");
            let day3Conditions = document.querySelector("#day-3-forecast");
            let day4Conditions = document.querySelector("#day-3-forecast");
            let day5Conditions = document.querySelector("#day-3-forecast");

            while (currentConditions.firstChild) {
                currentConditions.removeChild(currentConditions.firstChild);
            }
            while (day1Conditions.firstChild) {
                day1Conditions.removeChild(day1Conditions.firstChild)
            }
            while (day2Conditions.firstChild) {
                day2Conditions.removeChild(day2Conditions.firstChild)
            }
            while (day3Conditions.firstChild) {
                day3Conditions.removeChild(day3Conditions.firstChild);
            }
            while (day4Conditions.firstChild) {
                day4Conditions.removeChild(day4Conditions.firstChild);
            }
            while (day5Conditions.firstChild) {
                day5Conditions.removeChild(day5Conditions.firstChild);
            }

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
            let day1Info = document.createElement("h3");
            day1Info.innerHTML = data.list[7].dt_txt;
            let day1Icon = document.createElement("img");
            day1Icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[7].weather[0].icon}.png`);
            day1Info.appendChild(day1Icon);
            day1Conditions.appendChild(day1Info);

            let day1Temp = document.createElement("p");
            day1Temp.innerHTML = "Temperature: " + data.list[7].main.temp + "°F";
            day1Conditions.appendChild(day1Temp);

            let day1Wind = document.createElement("p");
            day1Wind.innerHTML = "Wind speed: " + data.list[7].wind.speed + " MPH";
            day1Conditions.appendChild(day1Wind);

            let day1Humidity = document.createElement("p");
            day1Humidity.innerHTML = "Humidity: " + data.list[7].main.humidity + "%";
            day1Conditions.appendChild(day1Humidity);

            // day 2 forecast
            let day2Info = document.createElement("h3");
            day2Info.innerHTML = data.list[15].dt_txt;
            let day2Icon = document.createElement("img");
            day2Icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[15].weather[0].icon}.png`);
            day2Info.appendChild(day2Icon);
            day2Conditions.appendChild(day2Info);

            let day2Temp = document.createElement("p");
            day2Temp.innerHTML = "Temperature: " + data.list[15].main.temp + "°F";
            day2Conditions.appendChild(day2Temp);

            let day2Wind = document.createElement("p");
            day2Wind.innerHTML = "Wind speed: " + data.list[15].wind.speed + " MPH";
            day2Conditions.appendChild(day2Wind);

            let day2Humidity = document.createElement("p");
            day2Humidity.innerHTML = "Humidity: " + data.list[15].main.humidity + "%";
            day2Conditions.appendChild(day2Humidity);

            // day 3 forecast
            let day3Info = document.createElement("h3");
            day3Info.innerHTML = data.list[23].dt_txt;
            let day3Icon = document.createElement("img");
            day3Icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[23].weather[0].icon}.png`);
            day3Info.appendChild(day3Icon);
            day3Conditions.appendChild(day3Info);

            let day3Temp = document.createElement("p");
            day3Temp.innerHTML = "Temperature: " + data.list[23].main.temp + "°F";
            day3Conditions.appendChild(day3Temp);

            let day3Wind = document.createElement("p");
            day3Wind.innerHTML = "Wind speed: " + data.list[23].wind.speed + " MPH";
            day3Conditions.appendChild(day3Wind);

            let day3Humidity = document.createElement("p");
            day3Humidity.innerHTML = "Humidity: " + data.list[23].main.humidity + "%";
            day3Conditions.appendChild(day3Humidity);

            // day 4 forecast
            let day4Info = document.createElement("h3");
            day4Info.innerHTML = data.list[31].dt_txt;
            let day4Icon = document.createElement("img");
            day4Icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[31].weather[0].icon}.png`);
            day4Info.appendChild(day4Icon);
            day4Conditions.appendChild(day4Info);

            let day4Temp = document.createElement("p");
            day4Temp.innerHTML = "Temperature: " + data.list[31].main.temp + "°F";
            day4Conditions.appendChild(day4Temp);

            let day4Wind = document.createElement("p");
            day4Wind.innerHTML = "Wind speed: " + data.list[31].wind.speed + " MPH";
            day4Conditions.appendChild(day4Wind);

            let day4Humidity = document.createElement("p");
            day4Humidity.innerHTML = "Humidity: " + data.list[31].main.humidity + "%";
            day4Conditions.appendChild(day4Humidity);

            // day 5 forecast
            let day5Info = document.createElement("h3");
            day5Info.innerHTML = data.list[39].dt_txt;
            let day5Icon = document.createElement("img");
            day5Icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[39].weather[0].icon}.png`);
            day5Info.appendChild(day5Icon);
            day5Conditions.appendChild(day5Info);

            let day5Temp = document.createElement("p");
            day5Temp.innerHTML = "Temperature: " + data.list[39].main.temp + "°F";
            day5Conditions.appendChild(day5Temp);

            let day5Wind = document.createElement("p");
            day5Wind.innerHTML = "Wind speed: " + data.list[39].wind.speed + " MPH";
            day5Conditions.appendChild(day5Wind);

            let day5Humidity = document.createElement("p");
            day5Humidity.innerHTML = "Humidity: " + data.list[39].main.humidity + "%";
            day5Conditions.appendChild(day5Humidity);
        })
        .catch(function (error) {
            console.log("There was a problem with the fetch operation");
        });
}