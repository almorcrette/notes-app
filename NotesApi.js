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
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({content: note})
    })
    .then(response => response.json())
    .then((data) => {
      console.log('Success:', (data));
      callback();
    })
    .catch((error) => {
      console.error('Error:', error);
      callback();
    })
  }
}

module.exports = Api;