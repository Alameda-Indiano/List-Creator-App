const Project = require("../../Models/Project");

module.exports.listProject = async (req, res) => {
    try {
        const ProjectList = await Project.findById(req.params.projectId).populate(['user', 'tasks']);

        if(!ProjectList){
            res.status(400).json({
                err: true,
                mensagem: "Está lista não existe!"
            });
        };

        res.status(200).json({
            err: false, 
            list: ProjectList
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