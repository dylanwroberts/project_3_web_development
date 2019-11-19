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
const newIncidentHandler = (db, req, res) => {

};

module.exports = newIncidentHandler;