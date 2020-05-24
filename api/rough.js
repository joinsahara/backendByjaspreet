const http = require('http');
const express = require('express');
const request = require('request');
const router = express.Router;
external_url = 'http://dummy.restapiexample.com/api/v1/employees'

const port = process.env.PORT || 80;

const server = http.createServer(app);
request(external_url, (req, res, err)=>{
    if(err){
        return err
    } 
    return {
        data : external_url
    }
})

server.listen(port); 