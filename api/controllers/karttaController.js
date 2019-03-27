var conn = require('../../db');

module.exports =
    {

        fetchMaps: (req, res) => {
            conn.query('SELECT * FROM kartta', (err, rows) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(rows);
                }
            });
        },
        insertMap: (req, res) => {
            conn.query('INSERT INTO kartta (NAME, PATH) VALUES (?, ?)', [req.body.label, req.body.value], (err, rows) => {
                if (err) {
                    console.log(err);
                    res.json({
                        message: "virhe oli"
                    });
                } else {
                    console.log("Kartta lisätty: " + JSON.stringify(rows));
                    res.status(200).json({
                        data: "lisätty"
                    }).end();
                }
            });
        }
    }