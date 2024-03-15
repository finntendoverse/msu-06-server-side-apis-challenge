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

displayWeather = function(userSearch) {                                                                                             // WHEN the displayWeather function is called
    const OpenWeatherAPIKey = "46b81e893d3ffba91a8b72288469ebe6";                                                                   // THEN my API key is stored in a variable
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${userSearch}&appid=${OpenWeatherAPIKey}&units=imperial`        // THEN the link to the API is saved
    
    // appending sections
    let currentConditions = document.querySelector("#current-conditions");                                                          // THEN the current conditions section is stored in a variable
    let futureForecast = document.querySelector("#future-forecast");                                                                // THEN the future forecast conditions section is stored in a variable
    let day1Conditions = document.querySelector("#day-1-forecast");                                                                 // THEN the day 1 conditions section is stored in a variable
    let day2Conditions = document.querySelector("#day-2-forecast");                                                                 // THEN the day 2 conditions section is stored in a variable
    let day3Conditions = document.querySelector("#day-3-forecast");                                                                 // THEN the day 3 conditions section is stored in a variable
    let day4Conditions = document.querySelector("#day-4-forecast");                                                                 // THEN the day 4 conditions section is stored in a variable
    let day5Conditions = document.querySelector("#day-5-forecast");                                                                 // THEN the day 5 conditions section is stored in a variable
    
    fetch(url)                                                                                                                      // THEN the API is fetched
    .then(function (response) {                                                                                                     // IF the fetch is successful
            return response.json();                                                                                                 // THEN the response is returned as a JSON object
        })
        .then(function (data) {
            // remove forecast of last search from page
            while (currentConditions.firstChild) {                                                                                  // WHILE the current conditions section had appended children
                currentConditions.removeChild(currentConditions.firstChild);                                                        // THEN they are all removed
            }
            while (day1Conditions.firstChild) {                                                                                     // WHILE the day 1 conditions section had appended children
                day1Conditions.removeChild(day1Conditions.firstChild)                                                               // THEN they are all removed
            }
            while (day2Conditions.firstChild) {                                                                                     // WHILE the day 2 conditions section had appended children
                day2Conditions.removeChild(day2Conditions.firstChild)                                                               // THEN they are all removed
            }
            while (day3Conditions.firstChild) {                                                                                     // WHILE the day 3 conditions section had appended children
                day3Conditions.removeChild(day3Conditions.firstChild);                                                              // THEN they are all removed
            }
            while (day4Conditions.firstChild) {                                                                                     // WHILE the day 4 conditions section had appended children
                day4Conditions.removeChild(day4Conditions.firstChild);                                                              // THEN they are all removed
            }
            while (day5Conditions.firstChild) {                                                                                     // WHILE the day 5 conditions section had appended children
                day5Conditions.removeChild(day5Conditions.firstChild);                                                              // THEN they are all removed
            }

            // add current search forecast to page
            currentConditions.setAttribute("class", "display-current");                                                             // THEN the current conditions section is given a CSS class for styling
            
            let currentInfo = document.createElement("h3");                                                                         // THEN an h3 element is created
            currentInfo.innerHTML = data.city.name + ", today: " + dayjs(data.list[0].dt_txt).format("M/D");                        // THEN the text of the h3 element becomes the city name and current date/time
            let currentIcon = document.createElement("img");                                                                        // THEN an image element is created
            currentIcon.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`);               // THEN the image source becomes the current weather's icon
            currentInfo.appendChild(currentIcon);                                                                                   // THEN the image is appended to the h3
            currentConditions.appendChild(currentInfo);                                                                             // THEN the h3 is appended to the current conditions section

            let currentTemp = document.createElement("p");                                                                          // THEN a p element is created
            currentTemp.innerHTML = "Temperature: " + data.list[0].main.temp + "°F";                                                // THEN the text of the p element becomes the current temperature
            currentConditions.appendChild(currentTemp);                                                                             // THEN the p element is appended to the current conditions section

            let currentWind = document.createElement("p");                                                                          // THEN a p element is created
            currentWind.innerHTML = "Wind speed: " + data.list[0].wind.speed + " MPH";                                              // THEN the text of the p element becomes the current wind speed
            currentConditions.appendChild(currentWind);                                                                             // THEN the p element is appended to the current conditions section

            let currentHumidity = document.createElement("p");                                                                      // THEN a p element is created
            currentHumidity.innerHTML = "Humidity: " + data.list[0].main.humidity + "%";                                            // THEN the text of the p element becomes the current humidity
            currentConditions.appendChild(currentHumidity);                                                                         // THEN the p element is appended to the current conditions section

            // add future forecast to page
            futureForecast.setAttribute("class", "display-future");                                                                 // THEN the future forecast section is given a CSS class for styling
            
            // day 1
            let day1Info = document.createElement("h3");                                                                            // THEN an h3 element is created
            day1Info.innerHTML = dayjs(data.list[7].dt_txt).format("dddd, M/D");                                                    // THEN the text of the h3 element becomes the day 1 date/time
            let day1Icon = document.createElement("img");                                                                           // THEN an image element is created
            day1Icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[7].weather[0].icon}.png`);                  // THEN the image source becomes the day 1 weather's icon
            day1Info.appendChild(day1Icon);                                                                                         // THEN the image is appended to the h3
            day1Conditions.appendChild(day1Info);                                                                                   // THEN the h3 is appended to the day 1 conditions section

            let day1Temp = document.createElement("p");                                                                             // THEN a p element is created
            day1Temp.innerHTML = "Temperature: " + data.list[7].main.temp + "°F";                                                   // THEN the text of the p element becomes the day 1 temperature
            day1Conditions.appendChild(day1Temp);                                                                                   // THEN the p element is appended to the day 1 conditions section

            let day1Wind = document.createElement("p");                                                                             // THEN a p element is created
            day1Wind.innerHTML = "Wind speed: " + data.list[7].wind.speed + " MPH";                                                 // THEN the text of the p element becomes the day 1 wind speed
            day1Conditions.appendChild(day1Wind);                                                                                   // THEN the p element is appended to the day 1 conditions section

            let day1Humidity = document.createElement("p");                                                                         // THEN a p element is created
            day1Humidity.innerHTML = "Humidity: " + data.list[7].main.humidity + "%";                                               // THEN the text of the p element becomes the day 1 humidity
            day1Conditions.appendChild(day1Humidity);                                                                               // THEN the p element is appended to the day 1 conditions section

            // day 2
            let day2Info = document.createElement("h3");                                                                            // THEN an h3 element is created
            day2Info.innerHTML = dayjs(data.list[15].dt_txt).format("dddd, M/D");                                                   // THEN the text of the h3 element becomes the day 2 date/time
            let day2Icon = document.createElement("img");                                                                           // THEN an image element is created
            day2Icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[15].weather[0].icon}.png`);                 // THEN the image source becomes the day 2 weather's icon
            day2Info.appendChild(day2Icon);                                                                                         // THEN the image is appended to the h3
            day2Conditions.appendChild(day2Info);                                                                                   // THEN the h3 is appended to the day 2 conditions section

            let day2Temp = document.createElement("p");                                                                             // THEN a p element is created
            day2Temp.innerHTML = "Temperature: " + data.list[15].main.temp + "°F";                                                  // THEN the text of the p element becomes the day 2 temperature
            day2Conditions.appendChild(day2Temp);                                                                                   // THEN the p element is appended to the day 2 conditions section

            let day2Wind = document.createElement("p");                                                                             // THEN a p element is created
            day2Wind.innerHTML = "Wind speed: " + data.list[15].wind.speed + " MPH";                                                // THEN the text of the p element becomes the day 2 wind speed
            day2Conditions.appendChild(day2Wind);                                                                                   // THEN the p element is appended to the day 2 conditions section

            let day2Humidity = document.createElement("p");                                                                         // THEN a p element is created
            day2Humidity.innerHTML = "Humidity: " + data.list[15].main.humidity + "%";                                              // THEN the text of the p element becomes the day 2 humidity
            day2Conditions.appendChild(day2Humidity);                                                                               // THEN the p element is appended to the day 2 conditions section

            // day 3
            let day3Info = document.createElement("h3");                                                                            // THEN an h3 element is created
            day3Info.innerHTML = dayjs(data.list[23].dt_txt).format("dddd, M/D");                                                   // THEN the text of the h3 element becomes the day 3 date/time
            let day3Icon = document.createElement("img");                                                                           // THEN an image element is created
            day3Icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[23].weather[0].icon}.png`);                 // THEN the image source becomes the day 3 weather's icon
            day3Info.appendChild(day3Icon);                                                                                         // THEN the image is appended to the h3
            day3Conditions.appendChild(day3Info);                                                                                   // THEN the h3 is appended to the day 3 conditions section

            let day3Temp = document.createElement("p");                                                                             // THEN a p element is created
            day3Temp.innerHTML = "Temperature: " + data.list[23].main.temp + "°F";                                                  // THEN the text of the p element becomes the day 3 temperature
            day3Conditions.appendChild(day3Temp);                                                                                   // THEN the p element is appended to the day 3 conditions section

            let day3Wind = document.createElement("p");                                                                             // THEN a p element is created
            day3Wind.innerHTML = "Wind speed: " + data.list[23].wind.speed + " MPH";                                                // THEN the text of the p element becomes the day 3 wind speed
            day3Conditions.appendChild(day3Wind);                                                                                   // THEN the p element is appended to the day 3 conditions section
    
            let day3Humidity = document.createElement("p");                                                                         // THEN a p element is created
            day3Humidity.innerHTML = "Humidity: " + data.list[23].main.humidity + "%";                                              // THEN the text of the p element becomes the day 3 humidity
            day3Conditions.appendChild(day3Humidity);                                                                               // THEN the p element is appended to the day 3 conditions section

            // day 4
            let day4Info = document.createElement("h3");                                                                            // THEN an h3 element is created
            day4Info.innerHTML = dayjs(data.list[31].dt_txt).format("dddd, M/D");                                                   // THEN the text of the h3 element becomes the day 4 date/time
            let day4Icon = document.createElement("img");                                                                           // THEN an image element is created
            day4Icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[31].weather[0].icon}.png`);                 // THEN the image source becomes the day 4 weather's icon
            day4Info.appendChild(day4Icon);                                                                                         // THEN the image is appended to the h3
            day4Conditions.appendChild(day4Info);                                                                                   // THEN the h3 is appended to the day 4 conditions section

            let day4Temp = document.createElement("p");                                                                             // THEN a p element is created
            day4Temp.innerHTML = "Temperature: " + data.list[31].main.temp + "°F";                                                  // THEN the text of the p element becomes the day 4 temperature
            day4Conditions.appendChild(day4Temp);                                                                                   // THEN the p element is appended to the day 4 conditions section

            let day4Wind = document.createElement("p");                                                                             // THEN a p element is created
            day4Wind.innerHTML = "Wind speed: " + data.list[31].wind.speed + " MPH";                                                // THEN the text of the p element becomes the day 4 wind speed
            day4Conditions.appendChild(day4Wind);                                                                                   // THEN the p element is appended to the day 4 conditions section
        
            let day4Humidity = document.createElement("p");                                                                         // THEN a p element is created
            day4Humidity.innerHTML = "Humidity: " + data.list[31].main.humidity + "%";                                              // THEN the text of the p element becomes the day 4 humidity
            day4Conditions.appendChild(day4Humidity);                                                                               // THEN the p element is appended to the day 4 conditions section

            // day 5
            let day5Info = document.createElement("h3");                                                                            // THEN an h3 element is created
            day5Info.innerHTML = dayjs(data.list[39].dt_txt).format("dddd, M/D");                                                   // THEN the text of the h3 element becomes the day 5 date/time
            let day5Icon = document.createElement("img");                                                                           // THEN an image element is created
            day5Icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[39].weather[0].icon}.png`);                 // THEN the image source becomes the day 1 weather's icon
            day5Info.appendChild(day5Icon);                                                                                         // THEN the image is appended to the h3
            day5Conditions.appendChild(day5Info);                                                                                   // THEN the h3 is appended to the day 5 conditions section

            let day5Temp = document.createElement("p");                                                                             // THEN a p element is created
            day5Temp.innerHTML = "Temperature: " + data.list[39].main.temp + "°F";                                                  // THEN the text of the p element becomes the day 5 temperature
            day5Conditions.appendChild(day5Temp);                                                                                   // THEN the p element is appended to the day 5 conditions section

            let day5Wind = document.createElement("p");                                                                             // THEN a p element is created
            day5Wind.innerHTML = "Wind speed: " + data.list[39].wind.speed + " MPH";                                                // THEN the text of the p element becomes the day 5 wind speed
            day5Conditions.appendChild(day5Wind);                                                                                   // THEN the p element is appended to the day 5 conditions section

            let day5Humidity = document.createElement("p");                                                                         // THEN a p element is created
            day5Humidity.innerHTML = "Humidity: " + data.list[39].main.humidity + "%";                                              // THEN the text of the p element becomes the day 5 humidity
            day5Conditions.appendChild(day5Humidity);                                                                               // THEN the p element is appended to the day 5 conditions section
        })
        .catch(function (error) {                                                                                                   // IF the API fetch is unsuccessful
            alert("you did not enter a valid city.");                                                                               // THEN the user will be alerted that they did not enter a valid city
            currentConditions.classList.remove("display-current");                                                                  // THEN the styling previously applied to the currentConditions section will be removed
            futureForecast.classList.remove("display-future");                                                                      // THEN the styling previously applied to the futureForecast section will be removed
        });
}