const Project = require("../../Models/Project");
const Task = require("../../Models/Task");

module.exports.createProject = async (req, res) => {
    const { title, description, tasks } = req.body;

    try {
        const NewProject = await Project.create({ title, description, user: req.user_id });

        await Promise.all(
            tasks.map(async (task) => {
                const ProjectTask = new Task({ ...task, project: NewProject._id });
                await ProjectTask.save();

                NewProject.tasks.push(ProjectTask);
            })
        );

        await NewProject.save();

        if(!NewProject){
            res.status(400).json({
                err: true,
                mensagem: "Não foi possível criar uma nova lista!"
            });
        };

        res.status(200).json({
            err: false, 
            mensagem: `A lista ${NewProject.title} foi criada.`,
            list: NewProject
        });
    } catch (err) {
        if(err){
            res.status(500).json({
                err: true,
                mensagem: err
            });
        };
    };
};