const fs = require('fs');
const path = require('path');
const debug = require('debug')('app');

const express = require('express');
const { accounts, users, writeJSON } = require('./data');

const app = express();

// set location for static files
app.use(express.static(path.join(__dirname, 'public')));
// middleware to handle POST
app.use(express.urlencoded({extended: true}));


// set view directory and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

app.get('/profile', (req, res) => {
  res.render('profile', {user:users[0]});
})


app.get('/', (req, res) => {
  res.render('index', {
    //title: 'Index'
    title: 'Account Summary',
    accounts: accounts
  });
});

app.listen(3000, function(){
  console.log('PS Project Running on port 3000!')
});
