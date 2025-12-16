require('dotenv').config();
const express = require('express');
const path = require('path');

const authRoutes = require('./routes/authRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', authRoutes);

app.get('/', (req, res) => {
    res.send('Members Only App');
});

const PORT = process.env.PORT || 5432;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`); 
});