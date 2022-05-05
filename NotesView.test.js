/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const { default: JSDOMEnvironment } = require('jest-environment-jsdom');
const { hasUncaughtExceptionCaptureCallback } = require('process');
const NotesView = require('./NotesView');

const mockedModel = {
  getNotes: () => ['This is an example note', 'Another note'],
  addNote: () => undefined
};

const anotherMockedModel = {
  getNotes: () => ['This is an example note', 'Another note', 'My first note title'],
  addNote: (titleText) => undefined
};

const mockedApi = {
  loadNotes: jest.fn(() => ['This is an example note', 'Another note']),
  createNote: jest.fn(() => { notes: ['An example note', 'another example']})
};

describe('NotesView', () => {
  describe('.displayNotes', () => {
    it("gets the notes from model and displays it as a new div element with class 'note'", () => {
      document.body.innerHTML = fs.readFileSync('./index.html');
      const notesView = new NotesView(mockedModel);
      notesView.displayNotes();
      expect(document.querySelectorAll('div.note').length).toBe(2);

    })

    it('shows the right number of notes after displayNotes is called again', () => {
      document.body.innerHTML = fs.readFileSync('./index.html');
      const notesView = new NotesView(mockedModel, mockedApi);
      notesView.displayNotes();
      notesView.displayNotes();
      expect(document.querySelectorAll('div.note').length).toBe(2);
    })
  })

  describe('.addNotes', () => {
    it('adds a new note with custom title', () => {
      document.body.innerHTML = fs.readFileSync('./index.html')
      const notesView = new NotesView(anotherMockedModel, mockedApi);
      const noteTitleInputEl = document.querySelector('#note-title-input');
      noteTitleInputEl.value = "My first note title";
      const noteTitleSubmitEl = document.querySelector('#note-title-submit');
      noteTitleSubmitEl.click();
      expect(document.querySelectorAll('div.note').length).toBe(3);
    })
  
    it('clears the text field after submitting a note', () => {
      document.body.innerHTML = fs.readFileSync('./index.html');
      const notesView = new NotesView(anotherMockedModel, mockedApi);
      const noteTitleInputEl = document.querySelector('#note-title-input');
      noteTitleInputEl.value = "My first note title";
      const noteTitleSubmitEl = document.querySelector('#note-title-submit');
      noteTitleSubmitEl.click();
      expect(noteTitleInputEl.value).toBe('');
    })

    it('uses api.createNote() to send a message to the server', () => {
      document.body.innerHTML = fs.readFileSync('./index.html')
      const notesView = new NotesView(anotherMockedModel, mockedApi);
      const noteTitleInputEl = document.querySelector('#note-title-input');
      noteTitleInputEl.value = "My first note title";
      const noteTitleSubmitEl = document.querySelector('#note-title-submit');
      noteTitleSubmitEl.click();

      expect(notesView.api.createNote()).toHaveBeenCalled();

    })
  })

  describe('.displayNotesFromApi', () => {
    it('calls loadNotes on the API class and lists notes on model and displays notes', () => {
      document.body.innerHTML = fs.readFileSync('./index.html');
      const notesView = new NotesView(mockedModel, mockedApi)
      notesView.displayNotesFromApi(() => {
        expect(document.querySelectorAll('div.note').length).toBe(2);
      })
    })
  })
})