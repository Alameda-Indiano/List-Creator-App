const DataBase = require("../DataBase/Base");

const SchemaTask = DataBase.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    project: {
        type: DataBase.Schema.Types.ObjectId,
        ref: "projects",
        require: true
    },
    assignedTo: {
        type: DataBase.Schema.Types.ObjectId,
        ref: "users",
    },
    completed: {
        type: Boolean,
        require: true,
        default: false
    },
    creatdAt: {
        type: Date,
        typeof: Date.now
    }
});

const Task = DataBase.model("tasks", SchemaTask);
module.exports = Task;