const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from database
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  console.log('req: ', req.body);
  
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const email = req.body.email;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const employer = req.body.employer;
  const position = req.body.position;
  const phone_number = req.body.phone_number;
  const joined_date = req.body.joined_date;

  const queryText = 'INSERT INTO person (username, password, email, first_name, last_name, employer, position, phone_number, joined_date ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id';
  pool.query(queryText, [username, password, email, first_name, last_name, employer, position, phone_number, joined_date])
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.get('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.get('/getMyFriends', (req, res) => {
    console.log('getAllRouter');
    
    //make sure user is logged in to view shelf
    if(req.isAuthenticated()) {
        // "item".* gets all from item table
        // and the query only grabs username from person table
        const myFriends = `SELECT person.username, person.first_name, person.last_name, person.email
        FROM "friendship" 
        JOIN "person" ON "friendship"."friendA_id" = "person"."id"
        WHERE "friendB_id" = $1
        UNION
        SELECT person.username, person.first_name, person.last_name, person.email
        FROM "friendship" 
        JOIN "person" ON "friendship"."friendB_id" = "person"."id"
        WHERE "friendA_id" = $1;
        `;
        pool.query(myFriends, [req.user.id]).then((results) => {
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
})

module.exports = router;
