const OpenWeatherAPIKey = "46b81e893d3ffba91a8b72288469ebe6";

window.onload = function() {
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
        console.log(userSearches);
    }
}

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

    localStorage.setItem("userSearches", JSON.stringify(userSearches));

    let recentSearches = document.querySelector("#placeholder");
    let pastSearch = document.createElement("button");
    pastSearch.innerHTML = userSearch.city;
    recentSearches.prepend(pastSearch);


    document.querySelector("#city").value = "";
    document.querySelector("#state").value = "";
    document.querySelector("#country").value = "";
});

// Let users input cities, but they should only be able to input a city from my city.list.json object

// fetch the API for the inputted city

// save recent searches in local storage