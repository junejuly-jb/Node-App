const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const path = require('path');

const PORT = process.env.PORT || "3000";
const app = express();

// tell express about hbs.
const partialPath = path.join(__dirname, 'views/partials');
hbs.registerPartials(partialPath);

// set up views engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// import database connection
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_crud'
}
const db = require('./database/db')(dbConfig);
db.connect();

// register index handler
const indexHandler = require('./routes/index.handler')(express);
app.use('/', indexHandler);

// user handler
const userHandler = require('./api/users.handler')(express, db);
app.use('/api/v1', userHandler);

app.listen(PORT, (err) => {
    if (err) {
        console.log("Server Error: 404");
    } else {
        console.log(`Server Running: ${PORT}`);
    }
})