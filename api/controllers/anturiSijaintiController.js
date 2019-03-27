var conn = require('../../db');

module.exports = 
{
    fetchLocation: (req, res) => {
        conn.query('SELECT * FROM anturi_sijainti WHERE KARTTA_ID = ?, ANTURI_ID = ?, X = ?, Y = ?', [req.query.kartta_id, req.query.anturi_id, req.query.x, req.query.y], (err, rows) => {
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
        conn.query('', (err, rows) => {
            conn.query('INSERT INTO anturi_sijainti (KARTTA_ID, ANTURI_ID, X, Y) VALUES (?, ?, ?, ?)', [req.body.kartta_id, req.body.anturi_id, req.body.x, req.body.y], (err, rows) => {
                if (err) {
                    res.status(500).json({
                        message: err.message
                    });
                } else {
                    res.status(200).json(rows);
                }
            });
        });
    }
}