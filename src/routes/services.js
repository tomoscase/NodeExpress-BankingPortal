const express = require('express');
const router = express.Router();

const { accounts, writeJSON } = require('../data');

router.get('/transfer', (req, res) => {
  res.render('transfer');
});
router.post('/transfer', (req, res) => {
  let amount = req.body.amount;
  accounts[req.body.from].balance -= amount;
  accounts[req.body.to].balance += parseInt(amount);
  writeJSON();
  res.render('transfer', {message:"Transfer Completed"});
});

router.get('/payment', (req, res) => {
  res.render('payment', {account: accounts.credit});
})
router.post('/payment', (req, res) => {
  let amount = req.body.amount;
  accounts.credit.balance -= amount;
  accounts.credit.available += parseInt(amount);
  writeJSON();
  res.render('payment', {message:"Payment Successful", account: accounts.credit});
})

module.exports = router;
