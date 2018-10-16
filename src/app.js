const fs = require('fs');
const path = require('path');
const debug = require('debug')('app');

const express = require('express');

const app = express();

// set location for static files
app.use(express.static(path.join(__dirname, 'public')));

// set view directory and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const accountData = fs.readFileSync(path.join(__dirname, 'json','accounts.json'),'utf8');
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'),'utf8');
const users = JSON.parse(userData);

app.get('/savings', function(req, res){
  res.render('account', {account: accounts.savings});
})
app.get('/checking', function(req, res){
  res.render('account', {account: accounts.checking});
})
app.get('/credit', function(req, res){
  res.render('account', {account: accounts.credit});
})
app.get('/profile', function(req, res){
  res.render('profile', {user:users[0]});
})

app.get('/', function(req, res){
  res.render('index', {
    //title: 'Index'
    title: 'Account Summary',
    accounts: accounts
  });
});

app.listen(3000, function(){
  console.log('PS Project Running on port 3000!')
});
