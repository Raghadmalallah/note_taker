// Required Modules
const fs = require("fs");
const notesData = require("../db/db.json");
const router = require("express").Router();
const save = require("../db/saveData");
//module.exports = function(app){


    function writeToDB(notes){
         notes = JSON.stringify(notes);
        console.log (notes);
        fs.writeFileSync("./db/db.json", notes, function(err){
            if (err) {
                return console.log(err);
            }
        });
    }

    router.get("/notes", function(req, res){
        save.retrieveNotes().then((notes) => {
            return res.json(notes);
        })
       .catch((err) => res.status(500).json(err))
    });

    router.post("/notes", function(req, res){

        if (notesData.length == 0){
            req.body.id = "0";
        } else{
            req.body.id = JSON.stringify(JSON.parse(notesData[notesData.length - 1].id) + 1);
        }
       
        console.log("req.body.id: " + req.body.id);
        notesData.push(req.body);
        writeToDB(notesData);
        console.log(notesData);
        res.json(req.body);
    });


    router.delete("/notes/:id", function(req, res){
        let id = req.params.id.toString();
        console.log(id);
        for (i=0; i < notesData.length; i++){
           
            if (notesData[i].id == id){
                console.log("match!");
                res.send(notesData[i]);
                notesData.splice(i,1);
                break;
            }
        }
        writeToDB(notesData);

    });
//};
module.exports = router;