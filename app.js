const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');
const app = express();
const PORT = 3000;

const db = new sqlite3.Database(
  path.join(__dirname, 'db', 'stpaul_crime.sqlite3')
);

app.get('/codes', (req, res) => {
  db.all('SELECT * FROM Codes', (err, codes) => {
    if (err) {
      console.error(err);
    } else {
      let result = {};
      //loop through all codes
      for (code in codes) {
        //create a key-value pair for the code in format: "C + code": "incident_type"
        result[`C${codes[code].code}`] = codes[code].incident_type;
      }
      res.send(result);
    }
  });
});

app.get('/neighborhoods', (req, res) => {
  db.all('SELECT * FROM Neighborhoods', (err, neighborhoods) => {
    if (err) {
      console.error(err);
    } else {
      let result = {};
      //loop through all codes
      for (neighborhood in neighborhoods) {
        //create a key-value pair for the neighborhood in format: "N + neighborhood_number": "neighborhood_name"
        result[`N${neighborhoods[neighborhood].neighborhood_number}`] =
          neighborhoods[neighborhood].neighborhood_name;
      }
      res.send(result);
    }
  });
});

app.get('/incidents', (req, res) => {});

app.put('/new-incident', (req, res) => {});

app.listen(PORT, () => {
  console.log(`server is listening for requests on port ${PORT}`);
});
