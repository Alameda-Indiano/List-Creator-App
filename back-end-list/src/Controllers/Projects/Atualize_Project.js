const Project = require("../../Models/Project");
const Task = require("../../Models/Task");

module.exports.atualizeProject = async (req, res) => {
    const { title, description, tasks } = req.body;

    try {
        const NewProject = await Project.findByIdAndUpdate(req.params.projectId, { title, description }, { new: true });

        Project.tasks = [];
        await Task.remove({ project: NewProject._id });

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
                mensagem: "Não foi possível atualizar a lista!"
            });
        };

        res.status(200).json({
            err: false, 
            mensagem: `A lista foi atualiza.`,
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