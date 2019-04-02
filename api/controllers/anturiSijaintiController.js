var conn = require('../../db');

module.exports =
    {
        fetchLocations: (req, res) => {
            conn.query('SELECT * FROM anturi_sijainti', (err, rows) => {
                if (err) {
                    res.status(500).json({
                        message: err.message
                    });
                } else {
                    res.status(200).json(rows);
                }
            });
        },
        insertLocation: (req, res) => {
            conn.query('INSERT INTO anturi_sijainti (KARTTA_ID, ANTURI_ID, X, Y) VALUES ((SELECT ID FROM kartta WHERE ID = ?), (SELECT ID FROM anturi WHERE ID = ?), ?, ?)', [req.body.kartta_id, req.body.anturi_id, req.body.x, req.body.y], (err, rows) => {
                if (err) {
                    console.log(err.message);
                    res.status(500).json({
                        message: err.message
                    });
                } else {
                    console.log(rows);
                    res.status(200).json(rows);
                }
            });
        },
        doesLocationExist: (req, res) => {
            conn.query('SELECT * FROM anturi_sijainti WHERE KARTTA_ID = ? AND ANTURI_ID = ?', [req.query.kartta_id, req.query.anturi_id], (err, rows) => {
                if (err) {
                    res.status(500).json({
                        message: err.message
                    })
                } else {
                    if (rows.length == 0) {
                        res.status(200).send("false");
                        console.log("ei ollut");
                    } else {
                    res.status(200).send("true");
                    console.log("nyt oli");
                    }
                }
            });
        },
        updateLocation: (req, res) => {
            conn.query('UPDATE anturi_sijainti SET X = ?, Y = ? WHERE KARTTA_ID = ? AND ANTURI_ID = ?', [req.body.x, req.body.y, req.body.kartta_id, req.body.anturi_id], (err, rows) => {
                if (err) {
                    res.status(500).json({
                        message: err.message
                    })
                } else {
                    res.status(200).send("true");
                }
            });
        }
    }