const NotesApi = require('./NotesApi');
const notesModel = require('./notesModel');
const NotesView = require('./NotesView');

const model = new notesModel();

console.log('The notes app is running');

console.log(model.getNotes());

model.addNote('This is an example note');
model.addNote('Buy Milk')
const notesview = new NotesView(model)

console.log(notesview.api);

console.log(notesview.displayNotes())
