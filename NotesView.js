const notesModel = require('./notesModel');
const notesApi = require('./notesApi');

class NotesView {
  constructor(model = new notesModel, api = new notesApi) {
    this.model = model;
    this.api = api;
    this.mainContainerEl = document.querySelector('#main-container');
    this.NoteTitleSubmitEl = document.querySelector('#note-title-submit');
    this.noteTitleInputEl = document.querySelector('#note-title-input');
    this.oldErrorMessages = document.querySelectorAll('.error-message');


    this.NoteTitleSubmitEl.addEventListener('click', () => {
      this.addNotes(this.noteTitleInputEl.value);
      this.noteTitleInputEl.value = '';
    })
  }

  addNotes(titleText) {
    this.model.addNote(titleText);
    const newNote = {
      "content": titleText
    }
    this.api.createNote(newNote,
      () => {
        let oldErrorMessages = document.querySelectorAll('.error-message');
        oldErrorMessages.forEach((errorMessage) => {
          errorMessage.remove();
        })
      },
      this.displayError);
    this.displayNotes()
  }

  displayNotes() {
    const oldNotes = document.querySelectorAll('div.note');
    oldNotes.forEach((note) => {
      note.remove();
    });
    let notes = this.model.getNotes();
    for (let i = 0; i < notes.length; i++) {
      let newElement = document.createElement('div');
      newElement.classList.add('note')
      newElement.innerText = `${notes[i]}`;
      this.mainContainerEl.append(newElement);
    };
  };

  displayNotesFromApi() {
    this.api.loadNotes(
      (presetNotes) => {
        this.model.setNotes(presetNotes);
        let oldErrorMessages = document.querySelectorAll('.error-message');
        oldErrorMessages.forEach((errorMessage) => {
          errorMessage.remove();
        });
        this.displayNotes();
      },
      this.displayError)
  }

  displayError(apiQuery) {
    let oldErrorMessages = document.querySelectorAll('.error-message');
    oldErrorMessages.forEach((errorMessage) => {
      errorMessage.remove();
    });
    let errorAreaEl = document.querySelector('#error-area');
    let errorMessageEl = document.createElement('div');
    errorMessageEl.classList.add('error-message');
    errorMessageEl.innerText = `Oops, something went wrong when ${apiQuery}!`;
    errorAreaEl.append(errorMessageEl);
  }



}

module.exports = NotesView;
