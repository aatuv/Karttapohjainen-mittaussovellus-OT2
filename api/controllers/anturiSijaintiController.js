var conn = require('../../db');

module.exports =
    {
        fetchLocations: (req, res) => {
            conn.request.query('select * from anturi_sijainti', (err, rows) => {
                if (err) {
                    console.log(err);
                    res.json({
                        message: "fetchLocations virhe"
                    });
                } else {
                    res.status(200).send(rows.recordset);
                }
            });
        },
        insertLocation: (req, res) => {
            conn.request.input('kartta_id', req.body.kartta_id);
            conn.request.input('anturi_id', req.body.anturi_id);
            conn.request.input('x', req.body.x);
            conn.request.input('y', req.body.y);
            conn.request.query('insert into anturi_sijainti (KARTTA_ID, ANTURI_ID, X, Y) values ((select ID from kartta where ID = @kartta_id), (select ID from anturi where ID = @anturi_id), @x, @y)', (err, rows) => {
                if (err) {
                    console.log(err);
                    res.json({
                        message: "virhe oli"
                    });
                } else {
                    res.status(200).json({
                        data: "lisätty sijainti"
                    })
                }
            });
        },
        doesLocationExist: (req, res) => {
            conn.request.input('kartta_id', req.query.kartta_id);
            conn.request.input('anturi_id', req.query.anturi_id);
            conn.request.query('SELECT * FROM anturi_sijainti WHERE KARTTA_ID = @kartta_id AND ANTURI_ID = @anturi_id', (err, rows) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        message: "virhe haettaessa sijaintia"
                    });
                } else {
                    if (rows.recordset.length !== 0) {
                    res.status(200).send({"result": true});
                    } else {
                    res.status(200).send({"result": false});
                    }
                }
            });
        },
        updateLocation: (req, res) => {
            conn.request.input('kartta_id', req.body.kartta_id);
            conn.request.input('anturi_id', req.body.anturi_id);
            conn.request.input('x', req.body.x);
            conn.request.input('y', req.body.y);
            conn.request.query('UPDATE anturi_sijainti SET X = @x, Y = @y WHERE KARTTA_ID = (select ID from kartta where ID = @kartta_id) AND ANTURI_ID = (select ID from anturi where ID = @anturi_id)', (err, rows) => {
                if (err) {
                    console.log(err);
                    res.json({
                        message: "updateLocation virhe"
                    });
                } else {
                    res.status(200).json({
                        data: "päivitetty sijainti"
                    })
                }
            });
        },
        deleteLocations: (req, res) => {
            conn.request.input('kartta_id', req.query.id);
            conn.request.query('delete from anturi_sijainti where KARTTA_ID = @kartta_id', (err, rows) => {
                if (err) {
                    console.log(err);
                    res.json({
                        message: "deleteLocations virhe"
                    });
                } else {
                    res.status(200).json({
                        message: "sijainnit poistettu kartalta"
                    })
                }
            });
        }
    }