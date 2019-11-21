const sqlHelper = require('../db/sql-helper');
/** @todo send back all incidents when no query parameters */
/** @todo start_date - first date to include in results (e.g. ?start_date=09-01-2019) */
/** @todo end_date - last date to include in results (e.g. ?end_date=10-31-2019) */
/** @todo code - comma separated list of codes to include in result (e.g. ?code=110,700). By default all codes should be included.*/
/** @todo grid - comma separated list of police grid numbers to include in result (e.g. ?grid=38,65). By default all police grids should be included.*/
/** @todo neighborhood - comma separated list of neighborhood numbers to include in result (e.g. ?id=11,14). By default all neighborhoods should be included. */
/** @todo limit - Result should include the N most recent incidents */
const incidentsHandler = (db, req, res) => {
  let date_condition = '';
  let params = [];

  //check for what the user provided and create the query based on it
  if (req.query.start_date && req.query.end_date) {
    params.push(req.query.start_date);
    params.push(req.query.end_date);
    date_condition = 'WHERE date_time BETWEEN (?) AND (?)';
  } else if (req.query.start_date) {
    params.push(req.query.start_date);
    date_condition = 'WHERE date_time >= (?)';
  } else if (req.query.end_date) {
    params.push(req.query.end_date);
    date_condition = 'WHERE date_time <= (?)';
  }

  //push limit onto the parameter array - 10K default and fence
  params.push(req.query.limit < 10000 ? req.query.limit : 10000);

  let query = `SELECT * FROM Incidents ${date_condition} ORDER BY date_time DESC LIMIT (?)`;

  db.all(query, params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let result = {};

      for(row in data) {
        let current = data[row];
        result[`I${current.case_number}`] = {
          date: current.date_time.split('T')[0],
          time: current.date_time.split('T')[1],
          code: current.code,
          incident: current.incident,
          police_grid: current.police_grid,
          neighborhood_number: current.neighborhood_number,
          block: current.block
        }
      }

      res.send(result);
    }
  });
};

module.exports = incidentsHandler;
