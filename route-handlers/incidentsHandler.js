const sqlHelper = require('../db/sql-helper');

const incidentsHandler = (db, req, res) => {
  let conditionals = [];
  let params = [];

  if (req.query.code) {
    let codes = req.query.code.split(',');
    conditionals.push(sqlHelper.createConditionals('code', codes));
    codes.forEach(code => { params.push(code); });
  }

  if (req.query.grid) {
    let grids = req.query.grid.split(',');
    conditionals.push(sqlHelper.createConditionals('grid', grids));
    grids.forEach(grid => { params.push(grid); });
  }

  if (req.query.id) {
    let ids = req.query.id.split(',');
    conditionals.push(sqlHelper.createConditionals('neighborhood_number', ids));
    ids.forEach(id => { params.push(id); });
  }

  if (req.query.start_date && req.query.end_date) {
    conditionals.push('date_time BETWEEN (?) AND (?)');
    params.push(req.query.start_date);
    params.push(req.query.end_date);
  } 
  else if (req.query.start_date) {
    conditionals.push('date_time >= (?)');
    params.push(req.query.start_date);
  } 
  else if (req.query.end_date) {
    conditionals.push('date_time <= (?)');
    params.push(req.query.end_date);
  }

  let query = 'SELECT * FROM Incidents' + sqlHelper.linkTogether(conditionals);

  db.all(query, params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let result = {};

      for (row in data) {
        let current = data[row];
        result[`I${current.case_number}`] = {
          date: current.date_time.split('T')[0],
          time: current.date_time.split('T')[1],
          code: current.code,
          incident: current.incident,
          police_grid: current.police_grid,
          neighborhood_number: current.neighborhood_number,
          block: current.block
        };
      }

      res.send(result);
    }
  });
};

module.exports = incidentsHandler;
