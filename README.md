# API Weather journal App by Ahmed Osama
githup: @ahmedd-osama   

## overview
the app is using the async method provided natively in javascript to fetch data from an external API: Open Weather Map. The user can search the weather of his location by __city name__ or __Zipcode__. After fetching the data from the API, the app present a card with the information fetched from the data including: __location, Date, Temperature, and weather State__. The themes of the card can be changed according to the temperature of the location. the new card include a textarea for the user to record their journals and save it in the 'My Journals' section as demonistrated in the app.   

The app also could run with a server side coding and storaing of the user entry in the __server.js__ file created with __Node.js__ and other packeges __including express, bodyparser, and cors__.Any future upgrades may include configuring the server side to store the users' data in a database. Currently, the app endpoint data is stored in a variable in the server called projectData.   

the __app.js__ uses javascript __async promises__ to perform POST and GET actions to send and receive data to and from the server.    

## Instructions Of Usage:   

before you run the application, you should know that you need an OpenWeatherMap.com API Key in order for the app to fetch the data of your location. In case you do not have one, you can easily sign up for free and get one at https://home.openweathermap.org/users/sign_up .   

There are __Two options to run the app__.   

1- running __without running the server__ side script:   
__Insutructioins__:   
    1- in the __website folder__, you will find an __index.html__. Just run the file using your internet browser.   
    2- when you oben the app you, click on key icon on the right of the screen to get directed to the API key input bage. once you enter a valid API key, the icon will turn from red to green. Then you can use the application normally.   


2- running __with running the server.js script__.   
    The server side is utilizing Node.js modules, so, you will need to __install node.js__ on your device to be able to run the app with the server side. the node.js Dependancies (packages) you will need to install are __Express, Bodyparser, and Cors__. Additionally, You will find a __package.json__ containing the information about the server side a long with the dependancies used in the project.   
__Instructions__:
    1- There is two different changes you will meke in the __app.js code__. first, go to line 125 of app.js file at the __saveBtn.onclick__ function and follow the instructions mentioned in the comments. you will comment the code that makes the program run offline and un-comment the code that activates the server side. secondlly, at the end of the app.js file at line 380 you will do the same by following the insturctions in the comments.  
    2- After installing the Node.js dependancies needed for the application (stated above). open the terminal and rout to the directory containing the server.js file. and run the file using node by typing the command "__node server.js__"   
    3- Once the server.js file is running the application will be hosted on the port 8000:  __localhost:8000__ by default.   
    4- Head to localhost:8000 by your internet browser to be able to find the app.   
    5- when you oben the app you, click on key icon on the right of the screen to get directed to the API key input bage. once you enter a valid API key, the icon will turn from red to green. Then you can use the application normally.   


## Extra information / Attributions:
1- in the main folder of the app you will find a folder with the name 'node_modules' which is created with the package.json file by Node.js
2-The application uses Fontawesome for Icons.
3- The diferent illustrations of the themes of the cards are from Freepik website.