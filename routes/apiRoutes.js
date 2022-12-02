const router = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');
const Add = require('../db/store');
const { readAllNotes } = require('../db/store');


// GET Route for retrieving all the tips
router.get('/notes', (req, res) => {
    Add
    .readAllNotes().then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err));

    
 
});

// POST Route for a new UX/UI tip
router.post('/notes', (req, res) => {
    Add
    .addNewNote(req.body).then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err));
});

router.delete('/notes/:id', (req, res) => {
    Add
    
    .deleteNote(req.params.id).then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err));
});

module.exports = router











