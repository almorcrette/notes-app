const Api = require('./NotesApi');

require('jest-fetch-mock').enableFetchMocks()

describe('API class', () => {
  describe('loadData()', () => {
    it('calls fetch and laods data', () => {
      const api = new Api();

      fetch.mockResponseOnce(JSON.stringify({
        notes: 'notes'
      }));

      api.loadNotes((returnedDataFromApi) => {
        expect(returnedDataFromApi.notes).toBe('notes');
      });
    })
  })

  describe('createNote()', () => {
    it('it instruct the backend to crate a note', () => {
      const api = new Api();

      const data = {name: "a note"};

      fetch.mockResponseOnce(JSON.stringify(
        data
      ));
      api.createNote(data, (returnedData) => {
        expect(returnedData.name).toBe('a note')
      })
    })
  })
})