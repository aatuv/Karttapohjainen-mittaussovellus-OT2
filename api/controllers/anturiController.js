var conn = require('../../db');

module.exports = 
{
    fetchSensors: (req, res) => {
        conn.query('SELECT * FROM anturi', (err, rows) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(rows);
            }
        });
    },
    insertSensor: (req, res) => {
        conn.query('INSERT INTO anturi (NAME, DESCRIPTION) VALUES (?, ?)', [req.body.name, req.body.description], (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    message: "Internal Server Error"
                });
            } else {
                console.log("Anturi lisätty: " + JSON.stringify(rows));
                res.status(200).json({
                    message: "Success"
                }).end();
            }
        });
    }
}