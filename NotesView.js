const NotesApi = require('./NotesApi');
const notesModel = require('./notesModel');

class NotesView {
  constructor(model = new notesModel, api = new NotesApi) {
    this.model = model
    this.api = api
    this.mainContainerEl = document.querySelector('#main-container');
    this.NoteTitleSubmitEl = document.querySelector('#note-title-submit');
    this.noteTitleInputEl = document.querySelector('#note-title-input');

    this.NoteTitleSubmitEl.addEventListener('click', () => {
      this.addNotes(this.noteTitleInputEl.value);
      this.noteTitleInputEl.value = '';
    })
  }

  addNotes(titleText) {
    this.model.addNote(titleText);
    this.displayNotes()
  }

  displayNotes() {
    const oldNotes = document.querySelectorAll('div.note');
    oldNotes.forEach((note) => {
      note.remove();
    })
    let notes = this.model.getNotes();
    for (let i = 0; i < notes.length; i++) {
      let newElement = document.createElement('div');
      newElement.classList.add('note')
      newElement.innerText = `${notes[i]}`;
      this.mainContainerEl.append(newElement);
    };
  };

  displayNotesFromApi() {
    this.api.loadNotes((data) => {
      data.forEach((note) => {
        this.model.addNote(note);
        this.displayNotes();
      });
    });
  }

}

module.exports = NotesView;