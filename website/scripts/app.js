let apiKey = "&appid=" + document.getElementById("keyInput").value;
const baseZipURL = "http://api.openweathermap.org/geo/1.0/zip?zip=";
const baseCityNameURL = "http://api.openweathermap.org/geo/1.0/direct?q=";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?";
// Personal API Key for OpenWeatherMap API
let FetchCountLimit = 1;
let userAPIStatus;
let searchInputStatus;
let tempUniteMode;
let WeatherDataHolder;
let WeatherThemeHolder;
// the added cards are for demonistration for users first time using the app
let allcards = [
  {
    apiData: {
      temp: 7.62,
      date: 1669052468,
      country: "GB",
      name: "London",
      weatherDescription: "overcast clouds",
    },
    userData:
      "I was in london today for a bussiness trip. I thought the weather would be a little bit more warm. It was nice however. After finishing the work I had, I walked in the city holding an umbrella in my hand.",
    cardTheme: "cold",
  },
  {
    apiData: {
      temp: -4.53,
      date: 1669053348,
      country: "RU",
      name: "Moscow",
      weatherDescription: "overcast clouds",
    },
    userData:
      "The weather was really freezing today. I wore a lot of cloth in order to stay worm all day long. Despite the cold weather, I enjoyed a walk outdoors. ",
    cardTheme: "freezing",
  },
  {
    apiData: {
      temp: 19.91,
      date: 1669053547,
      country: "EG",
      name: "Ash Shāţibī",
      weatherDescription: "scattered clouds",
    },
    userData:
      "hi, the weather was nice today. I thought it would be awesome to have a walk outdoors on the beach. I brought my backpack and went to the nearest beach. After that, I met some friends. It was an awesome day.",
    cardTheme: "moderate",
  },
  {
    apiData: {
      temp: 23.33,
      date: 1669053834,
      country: "EG",
      name: "Al ‘Atabah",
      weatherDescription: "overcast clouds",
    },
    userData:
      "The weather today was a little bit hot. However, I did not let that stop me from enjoying the day. I wore light cloth, sunglasses, and a hat and went out to walk my dog.",
    cardTheme: "hot",
  },
  {
    apiData: {
      temp: 18.98,
      date: 1669053804,
      country: "MX",
      name: "Mexico City",
      weatherDescription: "sunny",
    },
    userData:
      "I was sweating all day long. The temperature was extraordinarily high today.   I thought going out of home will make me forget that but it did not. I could not even bear wearing a white t-shirt. so, I went back home and enjoyed drinking a cold drink.",
    cardTheme: "extremeHot",
  },
];
// HTML Elements Selectors
let searchValue = document.getElementById("searchValue");
let searchBy = document.getElementById("dropbtnText").getAttribute("data-searchByOption");
let journalTextarea = document.getElementById("journalTextarea");
let getWeatherBtn = document.getElementById("getWeather");
let saveBtn = document.getElementById("save");
let journalCover = document.getElementById("journalCover");
let journalContainer = document.getElementById("journalContainer");
let journalDate = document.getElementById("journalDate");
let journalLocation = document.getElementById("journalLocation");
let journalTemp = document.getElementById("journalTemp");
let journalWeather = document.getElementById("journalWeather");
let userJournals = document.getElementById("userJournals");
let keypage = document.querySelector(".keyPage");

// setting up functions to excute when buttons are clicked

// Get weather button
getWeatherBtn.onclick = ("click", () => {
    if (userAPIStatus) {
      validateSearch();
      if (searchInputStatus) {
        // removing previous validation box comments if found
        document.getElementById("searchValidationBox").innerHTML = "";

        // assempling the final URL
        let finalURL;
        if (searchBy === "zipcode") {
          finalURL = baseZipURL + searchValue.value + apiKey;
        } else if (searchBy === "cityName") {
          finalURL = baseCityNameURL + searchValue.value + `&limit=${FetchCountLimit}` + apiKey;
        } else {
          console.log("An error happend before sending fetch responce");
        }
        // Fetching data
        retrieveData(finalURL).then((result) => {
          WeatherDataHolder = result;
          updateJournalInput(result);
        });
      }
    } else {
      document.getElementById("searchValidationBox").innerHTML = `Please enter a valid <a class = "link" onclick = "document.getElementById('keyBtn').click()">API key</a> first`;
      document.getElementById("searchValidationBox").style.color = "#c30c0c";
    }
  });

// save card button
saveBtn.onclick =("click", () => {

    //##ATENTION
    // the next two lines line should be disapled if the server is working
    allcards.push({
      apiData: WeatherDataHolder,
      userData: journalTextarea.value,
      cardTheme: WeatherThemeHolder,
    });
    updateUserJournals(allcards.slice(-1));

    //##ATENTION
    // in case server.js is running on the back end next lines shoud be enabled-------------------------------
    // allcards.push({apiData: WeatherDataHolder, userData: journalTextarea.value, cardTheme: WeatherThemeHolder})
    // postData('/weather', allcards);
    // getData('/weather')
    // .then(result => updateUserJournals(result.slice(-1)));
    //----------------------------------------------------------------------------------------------------------
  });

// setting the function that adds the new journal input data according to API fetched data
function updateJournalInput(data) {
  journalLocation.innerText = `${data.country}, ${data.name}`;
  journalTemp.innerText = `${data.temp} C`;
  journalWeather.innerText = `${data.weatherDescription}`;
  let date = convertDate(data.date);
  journalDate.innerText = `${date.year}/${date.month}/${date.day}`;

  // Journal theme
  journalContainer.classList.remove("freezing");
  journalContainer.classList.remove("cold");
  journalContainer.classList.remove("moderate");
  journalContainer.classList.remove("hot");
  journalContainer.classList.remove("extremeHot");
  if (data.temp <= 0) {
    journalContainer.classList.add("freezing");
    WeatherThemeHolder = "freezing";
  } else if (data.temp <= 12 && data.temp > 0) {
    journalContainer.classList.add("cold");
    WeatherThemeHolder = "cold";
  } else if (data.temp <= 22 && data.temp > 12) {
    journalContainer.classList.add("moderate");
    WeatherThemeHolder = "moderate";
  } else if (data.temp <= 35 && data.temp > 22) {
    journalContainer.classList.add("hot");
    WeatherThemeHolder = "hot";
  } else {
    journalContainer.classList.add("extremehot");
    WeatherThemeHolder = "extremehot";
  }
  // Journal Input cover removal
  journalCover.remove();

  // focusing on the text area
  journalTextarea.focus();
}
// setting the date converstion function
convertDate = (date) => {
  let newdate = new Date(date * 1000);
  let year = newdate.getFullYear();
  let month = newdate.getMonth() + 1;
  let day = newdate.getDate();
  return { year: year, month: month, day: day };
};

// setting the function that updates the ui according to user entered data
function updateUserJournals(data) {
  let cardsHolder = document.createElement("div");
  for (card in data) {
    cardsHolder.appendChild(generateCard(data[card]));
  }
  // userJournals.appendChild(cardsHolder)
  userJournals.insertBefore(cardsHolder, userJournals.children[0]);
}

// generation of HTML structure of cards
function generateCard(data) {
  let date = convertDate(data.apiData.date);
  let newCard = document.createElement("div");
  newCard.classList.add(`journalContainer`);
  newCard.classList.add(`${data.cardTheme}`);
  newCard.innerHTML = `
  <div class="textsection">
    <p class="JournalText" id= "journalText">${data.userData}</p>
  </div>
  <div class="journalData d-flex .f-wrap">
    <div class="locatoinAndDate d-flex justify-start">
      <div class = " journalDataDisplay d-flex m-w-100"><i class="fa-solid fa-location-dot"></i><div>${data.apiData.name}, ${data.apiData.country}</div></div>
      <div class = " journalDataDisplay d-flex m-w-100"><i class="fa-solid fa-calendar-days"></i><div>${date.year}/${date.month}/${date.day}</div></div>
    </div>
    <div class="tempAndWeather d-flex justify-start w-50p">
      <div class = " journalDataDisplay d-flex m-w-100"><i class="fa-solid fa-temperature-low"></i><div>${data.apiData.temp} C</div></div>
      <div class = " journalDataDisplay d-flex m-w-100"><i class="fa-solid fa-cloud-sun"></i><div>${data.apiData.weatherDescription}</div></div>
    </div>
  </div>
  `;
  return newCard;
}

// ###################################  UI features   ################################

/* Toggling between hiding and showing the dropdown minu */
function dropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// changing values of search and UI after selecting a search option
function dropdownOption(element, searchByOption) {
  document.getElementById("searchValue").setAttribute("placeholder", `${element.innerText}`);
  document.getElementById("dropbtnText").innerText = `${element.innerText}`;
  document.getElementById("dropbtnText").setAttribute("data-searchByOption",element.getAttribute("data-searchByOption"));
  searchBy = searchByOption; // assigning the glopal variable with the value passed to the function
  // console.log(searchBy)
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

// Execute searching for weather when the user presses enter in keyboard
searchValue.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getWeatherBtn.click();
  }
});

//  ######################## APIs and Server side functionalities  ############################

// updating and validatoin the api key and search input according to user input
function updateAPIKey() {
  apiKey = "&appid=" + document.getElementById("keyInput").value;
}
function validateAPIKey() {
  fetchtest(baseCityNameURL + "Cairo" + `&limit=1` + apiKey).then((result) => {
    if (result.cod === 401) {
      userAPIStatus = false;
      document.getElementById("keyBtn").style.backgroundColor = "#c30c0c";
      document.getElementById("keyBtnPage").style.backgroundColor = "#c30c0c";
      document.getElementById("keyValidationBox").innerHTML =
        "Sorry, this key is not working! If you just got it from openweathermap.org, it might take <b>2 hours</b> to be activated";
      document.getElementById("keyValidationBox").style.color = "#c30c0c";
      return false;
    } else {
      userAPIStatus = true;
      document.getElementById("keyBtn").style.backgroundColor = "#1dc30c";
      document.getElementById("keyBtnPage").style.backgroundColor = "#1dc30c";
      document.getElementById("keyValidationBox").innerText = "Valid Key!";
      document.getElementById("keyValidationBox").style.color = "#1dc30c";
      return true;
    }
  });
}
function validateSearch() {
  if (searchValue.value === "") {
    document.getElementById(
      "searchValidationBox"
    ).innerHTML = `Please enter a valid City name or a Zipcode to search for the weather.`;
    searchInputStatus = false;
  } else {
    searchInputStatus = true;
  }
}
//generation of the zip url to use in retrieving primary data of the zip code provided by the user
const retrieveData = async (url = "") => {
  const primaryRequest = await fetch(url);
  try {
    let primaryData = await primaryRequest.json();
    if (searchBy === "cityName") {
      primaryData = primaryData[0];
      // console.log(primaryData);
    }
    const finalRequest = await fetch(
      baseURL +
        `lat=${primaryData.lat}&lon=${primaryData.lon}` +
        apiKey +
        "&units=metric"
    );
    try {
      const allData = await finalRequest.json();
      searchInputStatus = true;
      return {
        temp: allData.main.temp,
        date: allData.dt,
        country: allData.sys.country,
        name: allData.name,
        weatherDescription: allData.weather[0].description,
      };
    } catch (error) {
      console.log(
        "An error happened while fetching the final weather data",
        error
      );
      document.getElementById(
        "searchValidationBox"
      ).innerHTML = `Sorry, a problem habbened while fetching your data from the API. Please try again later.`;
      searchInputStatus = false;
    }
  } catch (error) {
    console.log("An error happened while fetching the primary data", error);
    document.getElementById(
      "searchValidationBox"
    ).innerHTML = `Sorry, we did not find what you are looking for. Please make sure the City name or zipcode are correct and try again`;
    searchInputStatus = false;
  }
};
// setting the async function that Post the data to the server
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    // to return the new data posted and then send it to the server side.
    return newData;
  } catch (error) {
    console.log("and error happened while posting data to the server.");
  }
};
// setting the asyncrounus function that fetch the data from the server
const getData = async (url = "") => {
  const response = await fetch(url);
  try {
    const newData = await response.json();
    // to return the new data posted and then send it to the server side.
    return newData;
  } catch (error) {
    console.log(
      "An error happend while getting the data from the server",
      error
    );
  }
};
//  setting an async function to test the api key provided by the user
const fetchtest = async (url = "") => {
  const primaryRequest = await fetch(url);
  try {
    const primaryData = await primaryRequest.json();
    return primaryData;
  } catch (error) {
    return "An error happend while validating the key";
  }
};
// to display previous cards

//##ATENTION
// in case server is working ------------------
// getData('/weather')
// .then(result => {
//   updateUserJournals(result.reverse());
//   allcards = result
// });
//--------------------------------------------

//##ATENTION
// the next line should be removed in case the server is not working
updateUserJournals(allcards.reverse());
