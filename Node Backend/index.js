const express = require('express')
const app = express()
const port = 8000
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const musicRoutes = require('./routes/musicRoutes');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}


dotenv.config();
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}, () => console.log("Database connected"));
mongoose.set('useFindAndModify', false);


app.use(express.json())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));



app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);
app.use('/api', musicRoutes);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})