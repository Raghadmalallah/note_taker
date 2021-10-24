const path = require("path");
const router = require("express").Router();

//module.exports = function(app){
    
    router.get("/notes", function(_req, res){
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    router.get("/", function(_req, res){
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
//}

module.exports = router;