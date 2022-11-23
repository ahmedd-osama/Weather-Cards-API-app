const express = require('express');
const app = express();
/* Setting up the dependencies */
const bodyParser = require('body-parser')
/* Setting up the Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Using Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('website'));

// setting up port and the callback actions 
const port = 8000;
let projectData = [];
// assigning the port for the app
const server = app.listen(port, ()=> {console.log(`Currentlly running on Port: ${port}`);}); // printed in the terminal

// Setting up Get and Post functions with the Path Weather
app.post("/weather", addWeatherJournal);
function addWeatherJournal(req, res){
  projectData = req.body;
  console.log(projectData);
}
app.get('/weather', function(req, res){
  res.send(JSON.stringify(projectData));
})
