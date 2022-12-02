const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);

class Add {
    readit() {
        return readFromFile('db/db.json', 'utf-8')
    }
    writeit(note) {
        return writeToFile('db/db.json', JSON.stringify(note))
    }
    readAllNotes() {
        return this.readit().then(notes => [...JSON.parse(notes)])
    }
    addNewNote(note) {
        const { title, text } = note;
        const newNote = {
            id:uuidv4(),
            title,
            text,
          };  
        return this.readAllNotes().then(notes => [...notes,newNote]).then(notes =>this.writeit(notes)).then(() =>this.readAllNotes())
    }
    deleteNote(id) {
        
    
        return this.readAllNotes().then(notes => notes.filter(note => note.id !== id)).then(notes =>this.writeit(notes)).then(() =>this.readAllNotes())
    }


}
module.exports = new Add()
