const OpenWeatherAPIKey = "46b81e893d3ffba91a8b72288469ebe6";

let userSearches = [];
let searchButton = document.querySelector("#search");

searchButton.addEventListener("click", function(event) {
    event.preventDefault();

    let cityInput = document.querySelector("#city").value;
    let stateInput = document.querySelector("#state").value;
    let countryInput = document.querySelector("#country").value;

    let userSearch = {
        city: cityInput,
        state: stateInput,
        country: countryInput
    }
    
    userSearches.unshift(userSearch);

    localStorage.setItem("userSearches", userSearches);
});

// Let users input cities, but they should only be able to input a city from my city.list.json object

// fetch the API for the inputted city

// save recent searches in local storage