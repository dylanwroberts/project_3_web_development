const codesHandler = require('./route-handlers/codesHandler');
const neighborhoodsHandler = require('./route-handlers/neighborhoodsHandler');
const incidentsHandler = require('./route-handlers/incidentsHandler');
const newIncidentHandler = require('./route-handlers/newIncidentHandler');

const sqlite3 = require('sqlite3');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT;

const db = new sqlite3.Database('./db/stpaul_crime.sqlite3');

app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/codes', (req, res) => {
  codesHandler(db, req, res);
});

app.get('/neighborhoods', (req, res) => {
  neighborhoodsHandler(db, req, res);
});

app.get('/incidents', (req, res) => {
  incidentsHandler(db, req, res);
});

app.put('/new-incident', (req, res) => {
  newIncidentHandler(db, req, res);
});

app.listen(PORT, () => {
  console.log(`server is listening for requests on port ${PORT}`);
});
