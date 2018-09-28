const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


/**
 * GET route template
 */
router.get('/', (req, res) => {
});

/**
 * POST route template
 */
router.post('/checkEmail/:email', (req, res) => {
    console.log('email to check', req.params.email);
    if(req.isAuthenticated()) {
        // This will chedk the database to see if there is an email that matches the one that was sent.
        const myFriends = `SELECT email, id FROM person WHERE person.email LIKE $1
                            UNION ALL
                            SELECT NULL, NULL
                            FETCH FIRST 1 ROW ONLY;`;
        pool.query(myFriends, [req.params.email]).then((results) => {
            // If the email is a match, then the database will indicate this back to client
            // If no match, then Database will send a null field
            switch (results.rows[0].email) {
                case req.params.email:
                    console.log('there was a match');
                    let toSend = results.rows[0].id;
                    res.send({id: toSend});
                    break;
                default:
                    console.log('not found');
                    res.send('dataNotFound');
                    break;
            }
        }).catch((error) => {
            console.log('there was no match', error);
            res.sendStatus(404);
        });
    }
    else {
        res.sendStatus(403);
    }
});

/**
 * POST route template
 */
router.post('/addRequest', (req, res) => {
    console.log('in addRequest', req.body);

    if(req.isAuthenticated()) {
        // Will add new request to DB
        const newReferral = `INSERT INTO "new_request" ("date_sent", "owned_by", "written_from", "request_body", "suggested_words")
        VALUES ($1, $2, $3, $4, $5);`;
        pool.query(newReferral, [req.body.date_sent, req.body.owned_by, req.body.written_from, req.body.request_body, req.body.suggested_words]).then((results) => {
           res.sendStatus(200)
        }).catch((error) => {
            console.log('error adding to DB', error);
            res.sendStatus(500);
        });
    }
    else {
        res.sendStatus(403);
    }
});

module.exports = router;