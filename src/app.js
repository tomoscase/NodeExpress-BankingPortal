const fs = require('fs');
const path = require('path');
const debug = require('debug')('app');

const express = require('express');

const app = express();

// set location for static files
app.use(express.static(path.join(__dirname, 'public')));
// middleware to handle POST
app.use(express.urlencoded({extended: true}));


// set view directory and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const accountData = fs.readFileSync(path.join(__dirname, 'json','accounts.json'),'utf8');
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'),'utf8');
const users = JSON.parse(userData);

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
  let accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(path.join(__dirname,'json/accounts.json'),accountsJSON,'utf8');
  res.render('transfer', {message:"Transfer Completed"});
});

app.get('/payment', (req, res) => {
  res.render('payment', {account: accounts.credit});
})
app.post('/payment', (req, res) => {
  let amount = req.body.amount;
  accounts.credit.balance -= amount;
  accounts.credit.available += parseInt(amount);
  let accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(path.join(__dirname,'json/accounts.json'),accountsJSON,"utf8");
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
