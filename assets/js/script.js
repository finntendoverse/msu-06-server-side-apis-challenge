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
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${userSearch.city}&appid=${OpenWeatherAPIKey}`
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let currentConditions = document.querySelector("#current-conditions");
            debugger;
            
            let currentInfo = document.createElement("h3");
            //figure this part out
            currentInfo.innerHTML = data.city.name + " " + data.list[0].dt_txt + " " + <img src=`https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`>;
            
            currentConditions.appendChild(currentInfo);
        })
        .catch(function (error) {
            console.log("There was a problem with the fetch operation");
        });
}


//Ideas
    // Let users input cities, but they should only be able to input a city from my city.list.json object

    // fetch the API for the inputted city

    // IF the city matches a city on the city.list.json AND the state matches
    // fetch API for that city

    // IF the city matches a city on the city.list.json AND the country matches