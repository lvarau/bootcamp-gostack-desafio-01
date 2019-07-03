const express = require('express');
const server = express();

server.use(express.json());

let numberOfRequests = 0;
const projects = [];

/***
 * Middleware which checks
 * if the project exist
 */
function checkProjectExists(req, res, next) {
    const { id } = req.params;
   
    const project = projects.find(project => project.id === id);

    if(!project) {
        return res.status('400').json({ error: 'Project not found'});
    }

    return next();
} 

/***
 * Middleware which count 
 * numbers of requests
 */
function logRequest(req, res, next) {
    numberOfRequests++;

    console.log(`Number of requests: ${numberOfRequests}`);

    return next();
}


/*** 
 * Lists all projects
 */
server.get('/projects', (req, res) => {
    return res.json(projects)
});

/***
 * Creates new project
 */
server.post('/projects', (req, res) => {
    const { id, title } = req.body;

    if ( !id || !title ) {
        return res.status('400').json({ error: 'Validation failed' });
    }

    const projectIdExist = projects.some(project => project.id === id);

    if (projectIdExist) {
        return res.status('400').json({ error: 'Project id already exists' });
    }

    const newProject = { id, title, tasks: [] };
    projects.push(newProject);
    return res.json(newProject);
})

/***
 * Updates project title by id
 */
server.put('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    if(!title) {
        return res.status('400').json({ error: 'Validation failed' });
    }

    const project = projects.find(project => project.id === id);
    
    project.title = title;
    
    return res.json(project);
});

/**
 *  Deletes project by id
 */
server.delete('/projects/:id',checkProjectExists, (req, res) => {
    const { id } = req.params;
    
    const projectIndex = projects.findIndex(project => project.id === id);
    
    projects.splice(projectIndex, 1);
    
    return res.send(); 
})

/***
 * Creates new task inside
 * a given project
 */
server.post('/projects/id/tasks',checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    
    if(!title) {
        res.status('400').json({ error: 'Validation failed' });
    }

    const project = projects.find(project => project.id === id);

    project.tasks.push(title);

    return res.json(project);
    
});

server.listen(3000);