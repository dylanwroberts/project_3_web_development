const sqlHelper = require('../db/sql-helper');
const xmlconverter = require('js2xmlparser');

const neighborhoodsHandler = (db, req, res) => {
  let query = 'SELECT * FROM Neighborhoods';

  if (req.query.id) {
    query +=
      ' WHERE ' +
      sqlHelper.createConditionals(
        'neighborhood_number',
        req.query.id.split(',')
      );
  }

  db.all(query, (err, neighborhoods) => {
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

      if (req.query.format && req.query.format == 'xml') {
        result = xmlconverter.parse('neighborhoodsList', result);
      }
      res.send(result);
    }
  });
};

module.exports = neighborhoodsHandler;
