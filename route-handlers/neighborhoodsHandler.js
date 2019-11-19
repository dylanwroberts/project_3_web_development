/** @todo id - comma separated list of neighborhood numbers to include in result (e.g. ?id=11,14). By default all neighborhoods should be included. */
/** @todo format - json or xml (e.g. ?format=xml). By default JSON format should be used. */
const neighborhoodsHandler = (db, req, res) => {
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
};

module.exports = neighborhoodsHandler;