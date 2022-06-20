const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');

var app = express();

app.set('view engine','hbs');

require('dotenv').config();

const port = process.env.PORT || 1080;
app.engine('hbs', exphbs.engine({extname:'.hbs'}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

app.use(express.static('public'));

const routes = require('./server/routes/user');
app.use('/', routes);

const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DB_NAME
});

//connect to DB
pool.getConnection((err,connection)=>{
    if(err) throw err; //not connected
    console.log('Connected as ID '+ connection.threadId);
});



app.listen(port, ()=>console.log(`Listening on port ${port}`));