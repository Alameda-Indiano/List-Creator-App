const express = require("express");
const routerProject = express.Router();

const { deleteProject } = require("../Controllers/Projects/Delete_Project")
const { listProject } = require("../Controllers/Projects/List_Project")
const { atualizeProject } = require("../Controllers/Projects/Atualize_Project")
const { createProject } = require("../Controllers/Projects/New_Project");

const isPrivate = require("../Middlewares/Verify_Token");

routerProject.delete("/Project/:projectId", isPrivate, deleteProject);
routerProject.get("/Project/:projectId", isPrivate, listProject);
routerProject.put("/Project/:projectId", isPrivate, atualizeProject);
routerProject.post("/Project", isPrivate, createProject);

module.exports = routerProject;