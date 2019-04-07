var conn = require('../../db');

module.exports = 
{
    fetchMeasurements: (req, res) => {
        conn.query('SELECT * FROM mittaus WHERE ANTURI_ID = ?', [req.query.anturi_id], (err, rows) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(rows);
            }
        });
    },
    insertMeasurement: (req, res) => {
        conn.query('INSERT INTO mittaus (ANTURI_ID, TEMPERATURE, ATMOSP_PRESSURE, REL_AIR_HUMIDITY) VALUES (?,?,?,?)', [req.body.anturi_id, req.body.ilmanpaine, req.body.ilmankosteus], (err, rows) => {
            if (err) {
                console.log(err.message);
                res.status(500).json({
                    message:"Internal Server Error"
                });
            } else {
                res.status(201).json({
                    message: "Measurement added!"
                })
            }
        });
    }
}