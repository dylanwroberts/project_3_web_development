const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');
const app = express();
const PORT = 3000;

const db = new sqlite3.Database(
  path.join(__dirname, 'db', 'stpaul_crime.sqlite3')
);

/** @todo code - comma separated list of codes to include in result (e.g. ?code=110,700). By default all codes should be included. */
/** @todo format - json or xml (e.g. ?format=xml). By default JSON format should be used. */
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

/** @todo id - comma separated list of neighborhood numbers to include in result (e.g. ?id=11,14). By default all neighborhoods should be included. */
/** @todo format - json or xml (e.g. ?format=xml). By default JSON format should be used. */
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

/** @todo send back all incidents when no query parameters */
/** @todo  start_date - first date to include in results (e.g. ?start_date=09-01-2019) */
/** @todo  end_date - last date to include in results (e.g. ?end_date=10-31-2019) */
/** @todo  code - comma separated list of codes to include in result (e.g. ?code=110,700). By default all codes should be included.*/
/** @todo  grid - comma separated list of police grid numbers to include in result (e.g. ?grid=38,65). By default all police grids should be included.*/
/** @todo neighborhood - comma separated list of neighborhood numbers to include in result (e.g. ?id=11,14). By default all neighborhoods should be included. */
/** @todo limit - maximum number of incidents to include in result (e.g. ?limit=50). By default the limit should be 10,000. Result should include the N most recent incidents */
/** @todo format - json or xml (e.g. ?format=xml). By default JSON format should be used. */
app.get('/incidents', (req, res) => {});

/** @todo take the provided data an insert a new entry into the database
 * 
 * Data fields:

    case_number
    date
    time
    code
    incident
    police_grid
    neighborhood_number
    block

    Note: response should reject (status 500) if the case number already exists in the database
*/
app.put('/new-incident', (req, res) => {});

app.listen(PORT, () => {
  console.log(`server is listening for requests on port ${PORT}`);
});
