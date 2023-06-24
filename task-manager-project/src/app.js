const express = require('express');
const bodyParser = require('body-parser');
const routes = require('express').Router();
const tasksInfo=require('./routes/taskRoutes')
const app=express();
app.use(routes);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
routes.use('/tasks',tasksInfo);
const PORT = 4000;
routes.get('/',(req,res)=>{
res.status(200).send("Welcome to your personalised task manager")
});
app.listen(PORT,(error)=>{
    if(!error)
    console.log("Server is running");
    else
    console.log("Error occured , server cannot start",error);
});