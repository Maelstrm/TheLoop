const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/getAll', (req, res) => {
    console.log('getAllRouter');
    
    //make sure user is logged in to view shelf
    if(req.isAuthenticated()) {
        // "item".* gets all from item table   
        // and the query only grabs username from person table
        const getAll = `SELECT target_to, person.username, person.email, person.phone_number, fill_referral.date_created, fill_referral.referral_body, fill_referral.aws_links, fill_referral.can_contact, fill_referral.favorite,  person.employer, person.position
        FROM "new_request"
        LEFT JOIN "fill_referral" ON "new_request"."request_id" = "fill_referral"."new_request_id"
        JOIN "person" ON "new_request"."target_to" = "person"."id"
        WHERE "requested_by" = $1 and "completed" IS TRUE`;
        pool.query(getAll, [req.user.id]).then((results) => {
            console.log(results.rows);
            res.send(results.rows);
        }).catch((error) => {
            console.log('error in getAll recom.route', error);
            res.sendStatus(500);
        });
    }
    else {
        res.sendStatus(403);
    }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;