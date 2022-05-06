/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const { hasUncaughtExceptionCaptureCallback } = require('process');
const NotesView = require('./NotesView');

const mockedModel = {
  getNotes: () => ['This is an example note', 'Another note'],
  addNote: () => undefined,
  setNotes: () => undefined
};

const anotherMockedModel = {
  getNotes: () => ['This is an example note', 'Another note', 'My first note title'],
};

anotherMockedModel.addNote = jest.fn()
  .mockReturnValue('My first note title')

const mockedApi = {
  loadNotes: () => ['This is an example note', 'Another note'],
  createNote: () => undefined
};

mockedApi.createNote = jest.fn()

describe('NotesView', () => {
  it('clears the text field after submitting a note', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    const notesView = new NotesView(anotherMockedModel, mockedApi);
    const noteTitleInputEl = document.querySelector('#note-title-input');
    noteTitleInputEl.value = "My first note title";
    const noteTitleSubmitEl = document.querySelector('#note-title-submit');
    noteTitleSubmitEl.click();
    expect(noteTitleInputEl.value).toBe('');
  })

  describe('.displayNotes', () => {
    it("gets the notes from model and displays it as a new div element with class 'note'", () => {
      document.body.innerHTML = fs.readFileSync('./index.html');
      const notesView = new NotesView(mockedModel, mockedApi);
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
   
    document.body.innerHTML = fs.readFileSync('./index.html')
    const notesView = new NotesView(anotherMockedModel, mockedApi);
    const noteTitleInputEl = document.querySelector('#note-title-input');
    noteTitleInputEl.value = "My first note title";
    const noteTitleSubmitEl = document.querySelector('#note-title-submit');
    noteTitleSubmitEl.click();

    it("calls the model's addNotes method with the input text", () => {
      expect(notesView.model.addNote).toHaveBeenCalledWith("My first note title");
    })

    it("calls the api's createNote method with the input text as the value of a new note's content", () => {
      expect(notesView.api.createNote).toHaveBeenCalledWith({
        "content": "My first note title"
      });
    });



  })

  describe('.displayNotesFromApi', () => {
    it('loads the notes taken from the api', () => {
      document.body.innerHTML = fs.readFileSync('./index.html');
      const notesView = new NotesView(mockedModel, mockedApi);
      notesView.displayNotesFromApi(() => {
        expect(document.querySelectorAll('div.note').length).toBe(2);
      });
    
    })
  })

})