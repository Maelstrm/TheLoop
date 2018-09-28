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
        const getAll = `SELECT written_from, person.username, person.email, person.phone_number, fill_referral.date_created, fill_referral.referral_body, fill_referral.aws_links, fill_referral.can_contact, fill_referral.favorite,  person.employer, person.position
        FROM "new_request"
        LEFT JOIN "fill_referral" ON "new_request"."request_id" = "fill_referral"."new_request_id"
        JOIN "person" ON "new_request"."written_from" = "person"."id"
        WHERE "owned_by" = $1 and "completed" IS TRUE`;
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
 * GET route template
 */
router.get('/getToFill', (req, res) => {
    console.log('getToFill in recom.router');
    
    //make sure user is logged in to view shelf
    if(req.isAuthenticated()) {
        // "item".* gets all from item table
        // and the query only grabs username from person table
        const getToFill = `SELECT *
        FROM "new_request"
        JOIN "person" ON "new_request"."owned_by" = "person"."id" 
        WHERE "written_from" = $1;`;
        pool.query(getToFill, [req.user.id]).then((results) => {
            console.log('toFill Worked :', results.rows);
            res.send(results.rows);
        }).catch((error) => {
            console.log('error in getToFill recom.route', error);
            res.sendStatus(500);
        });
    }
    else {
        res.sendStatus(403);
    }
});

router.delete('/deleteRequest/:id', function(req, res) {
    console.log('indeleteRequest', req.params.id);
    
    if(req.isAuthenticated()) {
        // "item".* gets all from item table
        // and the query only grabs username from person table
        const getToFill = `DELETE FROM "new_request" 
        WHERE request_id = $1;`;
        pool.query(getToFill, [req.params.id]).then((results) => {
            console.log('deleteRequest Worked');
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error in deleteRequest', error);
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