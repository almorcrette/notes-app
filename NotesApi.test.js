const Api = require('./NotesApi');

require('jest-fetch-mock').enableFetchMocks()

describe('API class', () => {
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