// server.js
// where your node app starts

// init project
var express = require('express');
// setup a new database
// persisted using async file storage
// Security note: the database is saved to the file `db.json` on the local filesystem.
// It's deliberately placed in the `.data` directory which doesn't get copied if someone remixes the project.
var low = require('lowdb')
//var FileSync = require('lowdb/adapters/FileSync')
//var adapter = new FileSync('.data/balderdashdb.json')
var adapter = new LocalStorage('db')
var db = low(adapter)
//var db = low('db.json')
var app = express();

// default answer list
db.defaults({ answers: [], questions: []}).write();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/answers", function (request, response) {
  var dbAnswers=[];
  var answers = db.get('answers').value() // Find all answers in the collection
  answers.forEach(function(answer) {
    dbAnswers.push([answer.answer]); // adds their info to the dbAnswers value
  });
  response.send(dbAnswers); // sends dbAnswers back to the page
});

app.get("/questions", function (request, response) {
  var dbQuestions=[];
  var questions = db.get('questions').value() // Find all answers in the collection
  questions.forEach(function(question) {
    dbQuestions.push([question.number,question.question]); // adds their info to the dbQuestions value
  });
  response.send(dbQuestions); // sends dbAnswers back to the page
});

app.get("/adminanswers", function (request, response) {
  var dbAnswers=[];
  var answers = db.get('answers').value() // Find all answers in the collection
  answers.forEach(function(answer) {
    dbAnswers.push([answer.name,answer.answer]); // adds their info to the dbAnswers value
  });
  response.send(dbAnswers); // sends dbAnswers back to the page
});

// creates a new entry in the answers collection with the submitted values
app.post("/answers", function (request, response) {
  db.get('answers')
    .push({ name: request.query.name, answer: request.query.answer })
    .write()
  console.log("New answer inserted in the database");
  response.sendStatus(200);
});

// creates a new entry in the questions collection with the submitted values
app.post("/questions", function (request, response) {
  db.get('questions')  .remove()  .write()
  db.get('answers')  .remove()  .write()
  db.get('questions')
    .push({ number: request.query.number, question: request.query.question })
    .write()
  console.log("New question inserted in the database");
  response.sendStatus(200);
});

// removes all entries from the collection
app.get("/clear", function (request, response) {
  // removes all entries from the collection
  db.get('answers')
  .remove()
  .write()
  db.get('questions')
  .remove()
  .write()
  console.log("Database cleared");
  response.redirect("/admin.html");
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
