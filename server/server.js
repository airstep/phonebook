
let express = require('express');
var cors = require('cors')
let app = express();

let mongoose = require('mongoose');
let morgan = require('morgan');

let bodyParser = require('body-parser');

let port = 8080;

let contact = require('./app/routes/contact');
let config = require('config'); //we load the db location from the JSON files

//db options
let options = {
  useMongoClient: true,
};

//db connection
mongoose.connect(config.DBHost, options);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
	app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

app.use(cors())

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.get("/", (req, res) => res.json({message: "Welcome to our Phonebook Store!"}));

app.route("/contact")
	.get(contact.getContacts)
	.post(contact.postContact);

app.route("/contact/:id")
	.get(contact.getContact)
	.delete(contact.deleteContact)
	.put(contact.updateContact);


app.listen(port);

console.log("Listening on port " + port);

module.exports = app; // for testing
