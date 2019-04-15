var conn = require('../../db');

module.exports =
    {
        fetchMeasurement: (req, res) => {
            conn.request.input('deviceId', req.query.deviceId);
            conn.request.query("select * from Mittausdata WHERE deviceId = @deviceId", (err, rows) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(rows.recordset);
                }
            });
        },

        fetchMeasurements: (req, res) => {
            conn.request.query("select * from Mittausdata", (err, rows) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(rows.recordset);
                }
            });
        }
    }