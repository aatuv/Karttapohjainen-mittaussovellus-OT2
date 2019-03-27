/*
 Firebaseen tallennettavien kuvien (kartat) hallintaan keskittyvien funktioiden luonti
 */

const functions = require('firebase-functions');
const os = require('os');
const path = require('path');
const cors = require('cors')({ origin: true });
const Busboy = require('busboy');
const fs = require('fs');

const { Storage } = require('@google-cloud/storage');
const gcs = new Storage({
    projectId: "mittarointi-sovellus",
    keyFilename: "mittarointi-sovellus-firebase-adminsdk-bc6gz-1bfcc8c0fc.json"
});

exports.onFileChange = functions.storage.object().onFinalize((object, context) => {
});

// kuvan lisääminen
exports.onFileUpload = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        if (req.method !== "POST") {
            return res.status(500).json({
                message: "Not allowed"
            });
        }
        const busboy = new Busboy({ headers: req.headers });
        let uploadData = null;
        let filen = null;
        let urlPath = null;
        let file_ = null;

        busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
            const filepath = path.join(os.tmpdir(), filename);
            filen = filename;
            uploadData = { file: filepath, type: mimetype };
            file.pipe(fs.createWriteStream(filepath));
        });

        busboy.on("finish", () => {
            const bucket = gcs.bucket("mittarointi-sovellus.appspot.com");
            file_ = bucket.file(filen);
            let config = {
                action: 'read',
                expires: '01-01-2492'
            }
            file_.getSignedUrl(config, (err, url) => {
                if (err) {
                    console.log(err);
                }
                console.log(url);
                urlPath = url;
            });
            bucket
                .upload(uploadData.file, {
                    uploadType: "media",
                    contentType: uploadData.type,
                    metadata: {
                        metadata: {
                            contentType: uploadData.type
                        }
                    }
                })
                .then(() => {
                    return res.status(200).json({
                        name: filen,
                        path: urlPath
                    });
                })
                .catch(err => {
                    return res.status(500).json({
                        error: err
                    });
                });
        });
        busboy.end(req.rawBody);
    });
});