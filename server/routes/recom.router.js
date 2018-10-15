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
        const getAll = `SELECT written_from, person.username, person.first_name, person.last_name, person.email, person.phone_number, fill_referral.date_created, fill_referral.referral_body, fill_referral.aws_links, fill_referral.can_contact, fill_referral.favorite,  person.employer, person.position
        FROM "new_request"
        LEFT JOIN "fill_referral" ON "new_request"."request_id" = "fill_referral"."new_request_id"
        JOIN "person" ON "new_request"."written_from" = "person"."id"
        WHERE "owned_by" = $1 and "completed" IS TRUE
        ORDER BY new_request_id desc`;
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
router.get('/getFav', (req, res) => {
    console.log('getFavRouter');
    
    //make sure user is logged in to view shelf
    if(req.isAuthenticated()) {
        // "item".* gets all from item table
        // and the query only grabs username from person table
        const getFav = `SELECT written_from, person.username, person.first_name, person.last_name, person.email, person.phone_number, fill_referral.date_created, fill_referral.referral_body, fill_referral.aws_links, fill_referral.can_contact, fill_referral.favorite,  person.employer, person.position
        FROM "new_request"
        LEFT JOIN "fill_referral" ON "new_request"."request_id" = "fill_referral"."new_request_id"
        JOIN "person" ON "new_request"."written_from" = "person"."id"
        WHERE "owned_by" = $1 and "completed" IS TRUE and "favorite" IS TRUE
        ORDER BY new_request_id desc`;
        pool.query(getFav, [req.user.id]).then((results) => {
            console.log(results.rows);
            res.send(results.rows);
        }).catch((error) => {
            console.log('error in getFav recom.route', error);
            res.sendStatus(500);
        });
    }
    else {
        res.sendStatus(403);
    }
});

/**
 * GET all requests to be filed
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
        WHERE "written_from" = $1
        AND "completed" = FALSE`;
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

/**
 * GET all requests to be filed
 */
router.get('/getPending', (req, res) => {
    console.log('getPending in recom.router');
    
    //make sure user is logged in to view shelf
    if(req.isAuthenticated()) {
        // "item".* gets all from item table
        // and the query only grabs username from person table
        const getPending = `SELECT *
        FROM "new_request"
        JOIN "person" ON "new_request"."owned_by" = "person"."id" 
        WHERE "owned_by" = $1
        AND "completed" = FALSE;`;
        pool.query(getPending, [req.user.id]).then((results) => {
            console.log('getPending Worked:', results.rows);
            res.send(results.rows);
        }).catch((error) => {
            console.log('error in getPending recom.route', error);
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
        // finds all requests that are for the user to fill
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
 * Will add a completed referral to the db
 */
router.post('/addNew', (req, res) => {
console.log('touchdown in addNew', req.body);

if(req.isAuthenticated()) {
    // Will add new request to DB
    const newReferral = `INSERT INTO "fill_referral" ("new_request_id","referral_body", "date_created", "aws_links", "can_contact")
    VALUES ($1, $2, $3, $4, $5);`;
    pool.query(newReferral, [req.body.new_request_id, req.body.referral_body, req.body.date_created, req.body.aws_links, req.body.can_contact]).then((results) => {
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

router.put('/completeRequest/:id', (req, res) => {
    console.log('touchdown in completeRequest', req.params.id);
    
    if(req.isAuthenticated()) {
        // Will add new request to DB
        const newReferral = `UPDATE "new_request" SET "completed" = true WHERE "request_id" = $1`;
        pool.query(newReferral, [req.params.id]).then((results) => {
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