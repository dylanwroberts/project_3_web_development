const xmlconverter = require('js2xmlparser');
const sqlHelper = require('../db/sql-helper');
const dateHelper = require('compare-dates');
/** @todo send back all incidents when no query parameters */
/** @todo start_date - first date to include in results (e.g. ?start_date=09-01-2019) */
/** @todo end_date - last date to include in results (e.g. ?end_date=10-31-2019) */
/** @todo code - comma separated list of codes to include in result (e.g. ?code=110,700). By default all codes should be included.*/
/** @todo grid - comma separated list of police grid numbers to include in result (e.g. ?grid=38,65). By default all police grids should be included.*/
/** @todo neighborhood - comma separated list of neighborhood numbers to include in result (e.g. ?id=11,14). By default all neighborhoods should be included. */
/** @todo limit - Result should include the N most recent incidents */
const incidentsHandler = (db, req, res) => {
  const limit = req.query.limit < 10000 ? req.query.limit : 10000;

  //'T23:59:59' is appended to each query so that it will grab all incidents during that specific date
  let startDate = req.query.start_date
    ? `${req.query.start_date}T23:59:59`
    : '2014-08-14T00:00:00';

  let endDate = req.query.end_date
    ? `${req.query.end_date}T23:59:59`
    : '2019-10-30T23:57:08.000';

  let query = `SELECT * FROM Incidents WHERE date_time BETWEEN (?) AND (?) ORDER BY date_time DESC LIMIT (?)`;

  db.all(query, [startDate, endDate, limit], (err, data) => {
    res.send(data);
    console.log(err);
  });
};

module.exports = incidentsHandler;
