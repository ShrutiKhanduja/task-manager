class validator {
    static validateTasksInfo(tasksInfo, tasksData) {
        if (tasksInfo.hasOwnProperty("title") &&
            tasksInfo.hasOwnProperty("description") &&
            tasksInfo.hasOwnProperty("completionStatus")
            && tasksInfo.hasOwnProperty("priorityLevel")
            && tasksInfo.hasOwnProperty("taskId") &&
            this.validateTitle(tasksInfo) &&
            this.validateDescription(tasksInfo) &&
            this.validateUniqueTaskId(tasksInfo, tasksData)
            && this.validateCompletionStatusType(tasksInfo)
            && this.validatePriorityLevel(tasksInfo) &&
            this.validateTaskId(tasksInfo)
        ) {
            return {
                "status": true,
                "message": "Task has been added"
            };
        }
        if (!this.validateTitle(tasksInfo, tasksData)) {
            return {
                "status": false,
                "message": "Title cannot be empty"
            };
        }
        if (!this.validateDescription(tasksInfo, tasksData)) {
            return {
                "status": false,
                "message": "Description cannot be empty"
            };
        }
        if (!this.validateUniqueTaskId(tasksInfo, tasksData)) {
            return {
                "status": false,
                "message": "Task id already exists"
            };
        }
        if (!this.validateCompletionStatusType(tasksInfo)) {
            return {
                "status": false,
                "message": "Completion status should be of type boolean"
            };
        }
        if (!this.validatePriorityLevel(tasksInfo)) {
            return {
                "status": false,
                "message": "Priority level can only be among the following types : high,medium,low"
            };
        }
        if (!this.validateTaskId(tasksInfo)) {
            return {
                "status": false,
                "message": "TaskId should be of type integer"
            };
        }
    }
    static validateTitle(tasksInfo) {
        if (tasksInfo.title.length == 0) return false;
        return true;
    }
    static validateDescription(tasksInfo) {
        if (tasksInfo.description.length == 0) return false;
        return true;
    }
    static validateUniqueTaskId(tasksInfo, tasksData) {
        let value = tasksData.tasks.some(el => el.taskId === tasksInfo.taskId);
        if (value) return false;
        return true;
    }
    static validateCompletionStatusType(tasksInfo) {
        console.log(typeof tasksInfo.completionStatus == "boolean");
        console.log(typeof tasksInfo.completionStatus);
        if (typeof tasksInfo.completionStatus == "boolean") {
            return true;
        }
        return false;
    }
    static validatePriorityLevel(tasksInfo) {
        if (tasksInfo.priorityLevel.toLowerCase() === "medium" || tasksInfo.priorityLevel.toLowerCase() === "low" || tasksInfo.priorityLevel.toLowerCase() === "high")
            return true;
        else return false;
    }
    static validateTaskId(tasksInfo) {
        console.log(typeof tasksInfo.taskId == "number");
        if (typeof tasksInfo.taskId === "number") return true;
        else return false;
    }
}
module.exports = validator;
