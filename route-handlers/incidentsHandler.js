/** @todo send back all incidents when no query parameters */
/** @todo  start_date - first date to include in results (e.g. ?start_date=09-01-2019) */
/** @todo  end_date - last date to include in results (e.g. ?end_date=10-31-2019) */
/** @todo  code - comma separated list of codes to include in result (e.g. ?code=110,700). By default all codes should be included.*/
/** @todo  grid - comma separated list of police grid numbers to include in result (e.g. ?grid=38,65). By default all police grids should be included.*/
/** @todo neighborhood - comma separated list of neighborhood numbers to include in result (e.g. ?id=11,14). By default all neighborhoods should be included. */
/** @todo limit - maximum number of incidents to include in result (e.g. ?limit=50). By default the limit should be 10,000. Result should include the N most recent incidents */
/** @todo format - json or xml (e.g. ?format=xml). By default JSON format should be used. */
const incidentsHandler = (db, req, res) => {
  const limit = req.query.limit && req.query.limit < 10000 ? req.query.limit : 10000;
  let query = 'SELECT * FROM Incidents';
  let results = {};

  db.all(query, (err, incidents) => {});

  res.send({});
};

module.exports = incidentsHandler;