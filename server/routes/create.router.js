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
        const myFriends = `SELECT email FROM person WHERE person.email LIKE $1
                            UNION ALL
                            SELECT NULL
                            FETCH FIRST 1 ROW ONLY;`;
        pool.query(myFriends, [req.params.email]).then((results) => {
            // If the email is a match, then the database will indicate this back to client
            // If no match, then Database will send a null field
            switch (results.rows[0].email) {
                case req.params.email:
                    console.log('there was a match');
                    res.send('foundData');
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
    console.log(req.body);

    let isOk = emailValidation(req.body.emailToTry);

    if(isOk === 200) {
        console.log('this is good!');

    } else {
        console.log('this is bad!');
    }

    let newRequest = {
        date_sent: req.body.date_sent,
        owned_by: req.user.id,
        written_from: req.body.emailToTry,
        request_body: req.body.request_body,
        suggested_words: req.body.suggested_words,
    }

    console.log('Request Added', newRequest);
});

module.exports = router;