const express = require('express');
const app = express();
const logger = require('morgan');
const methodOverride = require("method-override");
const connectDB = require('./config/database');
const mainRoutes = require('./routes/main');

require('dotenv').config({path: './config/.env'});

connectDB();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));
app.use(methodOverride("_method"));

app.use('/', mainRoutes);
 
app.listen(process.env.PORT, "0.0.0.0", ()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})    