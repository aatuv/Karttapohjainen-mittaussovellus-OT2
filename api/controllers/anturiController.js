var conn = require('../../db');

module.exports =
    {
        fetchSensors: (req, res) => {
            conn.request.query("select * from anturi", (err, rows) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(rows.recordset);
                }
            });
        },
        insertSensor: (req, res) => {
            conn.request.input('name', req.body.kartta_id);
            conn.request.input('description', req.body.anturi_id);
            conn.request.query('insert into anturi (NAME, DESCRIPTION) values (@name, @description)', (err, rows) => {
                if (err) {
                    console.log(err);
                    res.json({
                        message: "insertSensor virhe"
                    });
                } else {
                    console.log("Anturi lisätty: ");
                    res.status(200).json({
                        data: "lisätty anturi"
                    });
                }
            });
        }
    }