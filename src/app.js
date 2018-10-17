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


app.get('/savings', (req, res) => {
  res.render('account', {account: accounts.savings});
})
app.get('/checking', (req, res) => {
  res.render('account', {account: accounts.checking});
})
app.get('/credit', (req, res) => {
  res.render('account', {account: accounts.credit});
})
app.get('/profile', (req, res) => {
  res.render('profile', {user:users[0]});
})

app.get('/transfer', (req, res) => {
  res.render('transfer');
});
app.post('/transfer', (req, res) => {
  let amount = req.body.amount;
  accounts[req.body.from].balance -= amount;
  accounts[req.body.to].balance += parseInt(amount);
  writeJSON();
  res.render('transfer', {message:"Transfer Completed"});
});

app.get('/payment', (req, res) => {
  res.render('payment', {account: accounts.credit});
})
app.post('/payment', (req, res) => {
  let amount = req.body.amount;
  accounts.credit.balance -= amount;
  accounts.credit.available += parseInt(amount);
  writeJSON();
  res.render('payment', {message:"Payment Successful", account: accounts.credit});
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
