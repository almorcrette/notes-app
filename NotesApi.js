class Api {

  loadNotes(callback) {
    fetch('http://localhost:3000/notes')
    .then(response => response.json())
    .then(data => {
      callback(data)
    });
  }

  createNote(note, callback) {
    fetch('http://localhost:3000/notes',{
      method: 'POST',
      headers: {
        'Content-Type': 'application-json',
      },
      body: JSON.stringify(note)
    })
    .then(response => response.json())
    .then(data => {
      callback(data);
    })
  }

}

module.exports = Api;