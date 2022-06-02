const express = require('express');
var request = require('request');
const app = express();

let baseUrl = "https://api.test.paysafe.com";
let accountID = 1002347140;

let username = "zeeshan";
let key = "B-qa2-0-6203a64c-0-302c02143efca12df6805555014b68a7b0de56223cd6ab98021401fde99f15231eee0a3bac7a441181a9292e335b"

app.use('/cardPurchase',(req,res)=>{

    let data = {
        "merchantRefNum": "demo-1",
        "amount": 10098,
        "settleWithAuth": true,
        "card": {
            "cardNum": "4111111111111111",
            "cardExpiry": {
                "month": 2,
                "year": 2027
            },
            "cvv": 123
        },
        "billingDetails": {
            "street": "100 Queen Street West",
            "city": "Toronto",
            "state": "ON",
            "country": "CA",
            "zip": "M5H 2N2"
        }
    }

    request({
        url: `${baseUrl}/cardpayments/v1/accounts/${accountID}/auths`,
        method: "POST",
        json: true,
        body: data,
        auth: {
            'user': username,
            'pass': key
        },
    }, function (error, response, body){
        console.log(response);
        res.send(body);
    });

})

app.use('/directPurchase',(req,res)=>{
    
    let data =  {
        "merchantRefNum": "ORDER_ID:4553",
        "amount": 10098,
        "ach": {
                "accountHolderName": "XYZ Company",
                "accountType": "CHECKING",
                "accountNumber": "988772192",
                "routingNumber": "211589828",
                "payMethod": "WEB"
                },
        "customerIp": "192.0.126.111",
        "profile": {
                "firstName": "Joe",
                "lastName": "Smith",
                "email": "Joe.Smith@hotmail.com"
        },
        "billingDetails": {
                "street": "100 Queen Street West",
                "city": "Los Angeles",
                "state": "CA",
                "country": "US",
                "zip": "90210",
                "phone": "3102649010"
        }
    } 

    request({
        url: `${baseUrl}/directdebit/v1/accounts/${accountID}/purchases`,
        method: "POST",
        json: true,
        body: data,
        auth: {
            'user': username,
            'pass': key
        },
    }, function (error, response, body){
        console.log(response);
        res.send(response);
    });

})

app.listen(3001,()=>console.log("server is running on port 3001"))