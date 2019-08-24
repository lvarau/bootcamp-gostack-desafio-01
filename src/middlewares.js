const { projects } = require('./data');

/***
 * Middleware which count 
 * numbers of requests
 */

let numberOfRequests = 0;

function logRequest(req, res, next) {
    numberOfRequests++;

    console.log(`Number of requests: ${numberOfRequests}`);

    return next();
};

/***
 * Middleware which checks
 * if the project exist
 */
function checkProjectExists(req, res, next) {
    const { id } = req.params;
   
    const project = projects.find(project => project.id == id);

    if(!project) {
        return res.status('400').json({ error: 'Project not found'});
    };

    return next();
} 

module.exports = {
    logRequest,
    checkProjectExists
};
