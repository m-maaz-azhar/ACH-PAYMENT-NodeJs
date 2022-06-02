'use strict';
let express = require('express');
let app = express();


var assert = require('chai').assert;

var PaymentTransaction = require('./debitBankAccount');

app.use('/pay',(req,res)=>{
       let data = req.body
       let response = PaymentTransaction.debitBankAccount();
       console.log(response)
})

app.post('/banktransfer',(req,res)=>{
       let data = req.body;
       console.log("data=>",data)
})

app.listen(3002,()=>console.log("Connected"))