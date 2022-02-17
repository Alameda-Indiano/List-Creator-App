const Project = require("../../Models/Project");
const Task = require("../../Models/Task");

module.exports.deleteProject = async (req, res) => {
    try {
        const DeleteProject = await Project.findByIdAndRemove(req.params.projectId);

        await Task.remove({ project: NewProject._id });

        if(!DeleteProject){
            res.status(400).json({
                err: true,
                mensagem: "A lista que você está tentando deletar não existe!"
            });
        };

        res.status(200).json({
            err: false, 
            mensagem: `A lista foi deletada!` 
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