const express = require('express');
const exphbs = require('express-handlebars'); // updated to 6.0.X
//const bodyParser = require('body-parser');  // Remove
//const mysql = require('mysql'); // Remove

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Parsing middleware
// Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({extended: true})); 

// Parse application/json
// app.use(bodyParser.json());
app.use(express.json()); 

// Static Files
app.use(express.static('public'));

// Templating engine
// app.engine('hbs', exphbs({ extname: '.hbs' })); // v5.3.4
// app.set('view engine', 'hbs'); // v5.3.4

// Update to 6.0.X
const handlebars = exphbs.create({ extname: '.hbs',});
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
 const routes = require('./public/server/routes/user');
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));