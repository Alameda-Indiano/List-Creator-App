const DataBase = require("../DataBase/Base");

const SchemaProject = DataBase.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    user: {
        type: DataBase.Schema.Types.ObjectId,
        ref: "users",
        require: true
    },
    tasks: [{
        type: DataBase.Schema.Types.ObjectId,
        ref: "tasks",
        require: true
    }],
    creatdAt: {
        type: Date,
        typeof: Date.now
    }
});

const Project = DataBase.model("projects", SchemaProject);
module.exports = Project;