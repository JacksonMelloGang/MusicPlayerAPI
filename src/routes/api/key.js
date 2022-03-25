import { Router } from 'express';
import sql from '../../database';
import help from '../../misc/help';
import model from '../../models';

const router = Router();

function generateRandomString(myLength) {
    const chars =
        'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
    const randomArray = Array.from(
        { length: myLength },
        (v, k) => chars[Math.floor(Math.random() * chars.length)],
    );

    const randomString = randomArray.join('');
    return randomString;
}

// Get Key Route
router.get('/', (req, res) => {
    var key = null;

    // check if apikey param has been provided, if that the case, it should evaluate to false
    if (typeof req.query['apikey'] === undefined) return res.status(200).json(help.keyhelp);

    // set var key : to query value
    key = req.query['apikey'];

    // check if apikey contains key
    model.apikey.keyinfo(key, function (err, keyinfo) {
        if (err) return res.status(500).json({ error: err });

        // if we couldn't find information in the database, we return an error
        if (!keyinfo) {
            res
                .status(200)
                .json({ error: "couldn't find the key into the database" });
            return;
        }

        var masterkey = keyinfo[0].ismasterkey == 1 ? true : false; // convert boolean from sql server to true / false, to be more human readable. 
        var keyid = keyinfo[0].id;

        res.status(200).json({
            success: {
                id: keyid,
                key: key,
                masterkey: masterkey,
            },
        });
    });
});

router.put('/', (req, res) => {
    // check if key has been provided
    if (typeof req.headers['authorization'] === undefined)
        return res
            .status(401)
            .json({ error: "APIKey hasn't been provided." });

    var key = generateRandomString(30);
    var masterkey = req.body['masterkey'] !== undefined ? 1 : 0;

    model.apikey.ismasterkey(
        req.headers['authorization'],
        function (err, result) {
            if (err)
                return res
                    .status(500)
                    .json({ error: 'Unexpected error: ' + err });

            if (result) {
                model.apikey.create(
                    key,
                    masterkey,
                    function (errinsert, resultinsert) {
                        if (errinsert)
                            return res.status(500).json({ error: errinsert });

                        if (resultinsert) {
                            return res
                                .status(500)
                                .json({
                                    success: 'Key succesfully created',
                                    key: key,
                                });
                        }
                        return res
                            .status(401)
                            .json({
                                error: "Couldn't insert key.\n" + resultinsert,
                            });
                    },
                );
            }
        },
    );
});

router.delete('/', (req, res) => {
    if (typeof req.headers['authorization'] !== 'undefined') {
        if (typeof req.body['key'] !== 'undefined') {
            model.apikey.delete(req.body['key'], function (err, result) {
                if (result) {
                    res
                        .status(200)
                        .json({
                            success: 'succesfully deleted key ' + req.body['key'],
                        });
                } else {
                    res
                        .status(404)
                        .json({ error: 'key not found in database' });
                }
            });
        } else {
            res
                .status(503)
                .json({ error: 'API key to delete not specified' });
        }
    } else {
        res.status(503).json({ error: 'Not allowed.' });
    }
});

export default router;
