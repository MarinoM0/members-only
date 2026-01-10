require('dotenv').config();
const express = require('express');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const app = express();
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');
const pool = require('./db/db');
const {configurePassport} = require('./config/passport');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

configurePassport(passport);

app.use(
    session({
        store: new pgSession({
            pool,
            tableName: 'session',
            createTableIfMissing: true,
        }),
        secret: process.env.SESSION_SECRET,
        resave:false,
        saveUninitialized:false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('Members Only App');
});

app.use('/', authRoutes);

const PORT = process.env.PORT || 5432;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`); 
});