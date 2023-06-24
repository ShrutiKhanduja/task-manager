const taskRoutes = require('express').Router();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const validator = require('../helpers/validator');

taskRoutes.use(bodyParser.urlencoded({ extended: false }));
taskRoutes.use(bodyParser.json());
const tasksData = require('../tasks.json');

taskRoutes.get('/', (req, res) => {
    if (req.url.indexOf('?') !== -1) {
         if(req.query.completionStatus==='true' || req.query.completionStatus==='false' ){
            let task = tasksData.tasks;
            console.log("Here is my completion Status");
            console.log(req.query.completionStatus);
            let completionStatusPassed = req.query.completionStatus==='true';
            console.log(typeof completionStatusPassed)
            let result = task.filter(val => val.completionStatus === completionStatusPassed);
            if (result.length == 0) {
                res.json({ "status": false, "message": "No such task exists" });
            } else {
    
                let data = result;
                data.sort(function (a, b) {
                    return new Date(b.creationDate) - new Date(a.creationDate);
                });
                res.status(200);
                res.send(data);
            }
         }
         else{
            res.status(400);
            res.json({"status":false,"message":"Invalid Request , Completion Status can only be either true or false"});
         }
     
    }
    else {

        let data = tasksData.tasks;
        data.sort(function (a, b) {
            return new Date(b.creationDate) - new Date(a.creationDate);
        });

        res.status(200);
        res.send(data);
    }

});
taskRoutes.get('/:taskId', (req, res) => {
    let task = tasksData.tasks;
    let taskIdPassed = req.params.taskId;
    let result = task.filter(val => val.taskId == taskIdPassed);
    if (result.length == 0) {
        res.json({ "status": false, "message": "No such task exists" });
    } else {
        res.status(200);
        res.send(result);
    }

});

taskRoutes.post('/', (req, res) => {
    req.body.creationDate = new Date();
    const tasksDetails = req.body;

    let writePath = path.join(__dirname, '..', 'tasks.json');
    if (validator.validateTasksInfo(tasksDetails, tasksData).status) {
        let taskDataModified = JSON.parse(JSON.stringify(tasksData));
        taskDataModified.tasks.push(tasksDetails);
        fs.writeFileSync(writePath, JSON.stringify(taskDataModified), { encoding: 'utf-8', flag: 'w' });
        res.status(200);
        res.json(validator.validateTasksInfo(tasksDetails, tasksData));
    }
    else {
        res.status(400);
        res.json(validator.validateTasksInfo(tasksDetails, tasksData));
    }

});
taskRoutes.put('/:taskId', (req, res) => {

    let taskIdPassed = req.params.taskId;
    let result = tasksData.tasks.filter(val => val.taskId == taskIdPassed);
    if (result.length == 0) {
        res.json({ "status": false, "message": "No such task exists" });
    } else {
        req.body.creationDate = new Date();
        const tasksDetails = req.body;

        let writePath = path.join(__dirname, '..', 'tasks.json');
        if (validator.validateTasksInfo(tasksDetails, tasksData).status) {

            let filteredData = tasksData.tasks.filter(val => val.taskId != taskIdPassed);
            console.log(filteredData);
            tasksData.tasks = filteredData;
            let taskDataModified = JSON.parse(JSON.stringify(tasksData));
            taskDataModified.tasks.push(tasksDetails);
            fs.writeFileSync(writePath, JSON.stringify(taskDataModified), { encoding: 'utf-8', flag: 'w' });
            res.status(200);
            res.json(validator.validateTasksInfo(tasksDetails, tasksData));
        }
        else {
            res.status(400);
            res.json(validator.validateTasksInfo(tasksDetails, tasksData));
        }
    }
});
taskRoutes.delete("/:taskId", (req, res) => {
    let taskIdPassed = req.params.taskId;
    let result = tasksData.tasks.filter(val => val.taskId == taskIdPassed);
    if (result.length == 0) {
        res.json({ "status": false, "message": "No such task exists" });
    } else {


        let writePath = path.join(__dirname, '..', 'tasks.json');


        let filteredData = tasksData.tasks.filter(val => val.taskId != taskIdPassed);
        console.log(filteredData);
        tasksData.tasks = filteredData;
        let taskDataModified = JSON.parse(JSON.stringify(tasksData));

        fs.writeFileSync(writePath, JSON.stringify(taskDataModified), { encoding: 'utf-8', flag: 'w' });
        res.status(200);
        res.json({ "status": true, "message": "Task successfully deleted" });


    }
});
taskRoutes.get("/priority/:level", (req, res) => {
    let task = tasksData.tasks;
    let levelPassed = req.params.level.toLowerCase();
    if(levelPassed === "low"|| levelPassed==="high" || levelPassed==="medium"){
        console.log(levelPassed);
        let result = task.filter(val => val.priorityLevel == levelPassed);
        if (result.length == 0) {
            res.json({ "status": false, "message": "Oops! Seems like no such priority task exists" });
        } else {
            res.status(200);
            res.send(result);
        }
    }
    else{
        res.status(400);
        res.json({
            "status":false,
            "message":"Priority level can only be among the following types : high,medium,low"
        });
    }
   
});

module.exports = taskRoutes;