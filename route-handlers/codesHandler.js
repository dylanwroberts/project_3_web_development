const xmlconverter = require('js2xmlparser');

const codesHandler = (db, req, res) => {
  db.all('SELECT * FROM Codes', (err, codes) => {
    if (err) {
      console.error(err);
    } else {
      let results = {};

      for (code in codes) {
        let current = codes[code];
        results[`C${current.code}`] = current.incident_type;
      }

      if (req.query.code) {
        let include = req.query.code.split(',');

        for (result in results) {
          if (!include.includes(result)) {
            delete results[result];
          }
        }
      }

      if (req.query.format && req.query.format == 'xml') {
        results = xmlconverter.parse('codeList', results);
      }

      res.send(results);
    }
  });
};

module.exports = codesHandler;
