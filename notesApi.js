class NotesApi {
  

  loadNotes(successCB, errorCB) {
    fetch('http://localhost:3000/notes')
      .then(response => response.json())
      .then((data) => {
        successCB(data);
      })
      .catch((error) => {
        console.log('Load Error', error);
        errorCB();
      })
  }

  newestNote(data) {
    return data[data.length - 1];
  }

  createNote(noteText) {
    fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(noteText)
    })
    .then(response => response.json())
    .then( (data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    })
  };
}

module.exports = NotesApi;

