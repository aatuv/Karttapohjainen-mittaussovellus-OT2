var conn = require('../../db');

module.exports =
    {

        fetchMaps: (req, res) => {
            conn.request.query('select * from kartta', (err, rows) => {
                if (err) {
                    console.log(err);
                    res.json({
                        message: "fetchMaps virhe"
                    });
                } else {
                    res.status(200).send(rows.recordset);
                }
            });
        },
        insertMap: (req, res) => {
            conn.request.input('name', req.body.label);
            conn.request.input('path', req.body.value);
            conn.request.query("insert into kartta (NAME, PATH) values(@name, @path)", (err, rows) => {
                if (err) {
                    console.log(err);
                    res.json({
                        message: "insertMap virhe"
                    });
                } else {
                    res.status(200).json({
                        data: "lisätty kartta"
                    });
                }
            });
        },
        deleteMap: (req, res) => {
            conn.request.input('id', req.query.id);
            conn.request.query('delete from kartta where ID=@id', (err, rows) => {
                if (err) {
                    console.log(err);
                    res.json({
                        message: "deleteMap virhe"
                    });
                } else {
                    res.status(200).json({
                        message: "kartta poistettu"
                    })
                }
            });
        }
    }