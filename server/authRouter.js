const express = require('express');
const passport = require('passport');


const auth = express.Router();

auth.get('/signin', passport.authenticate('signIn', { scope: ['user-read-email', 'user-read-private', 'playlist-modify-public', 'playlist-modify-private', 'user-top-read', 'playlist-read-private'], showDialog: true }));

auth.get('/callback', passport.authenticate('signIn', { failureRedirect: '/', successRedirect: '/api/home' }));

auth.get('/logout', (req, res) => {
  console.log('REQ USER', req.user);
  req.logOut();
  console.log('USER AFTER LOGOUT', req.user);
  req.session.destroy(() => {
    console.log('SESSSION?', req.session);
    res.send('logout');
  });
});

module.exports = auth;
