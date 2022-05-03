const express = require('express');
const app = express();
const port = 8000;
const mysql = require('mysql');
const cookieParser = require('cookie-parser');// cookies
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');//session
const multer  = require('multer');// upload pictures  
const cors = require('cors');

const upload = multer({ dest: 'uploads/' });

// app uses 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
// app.use(cookieSession({
//     name: 'session',
//     keys: [/* secret keys */],
//     // Cookie Options
//     maxAge: 24 * 60 * 60 * 1000 // 24 hours
//   }));
  // var corsOptions = {
  //   origin: 'http://localhost:3000',
  //   optionsSuccessStatus: 200
  // }  


const database = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database: 'react_firebase_project1'
});

database.connect();

app.post('/register', (req, res) => {

  const nameUser = req.body.userReg;
  const lastName = req.body.lastName;
  const mailUser = req.body.mailReg;
  const passwordUser = req.body.passwordReg;
  const dateUser = '';

  database.query("INSERT INTO register_users (name, last_name, mail, password, date) VALUES (?, ?, ?, ?, ?)",[
    nameUser,
    lastName,
    mailUser,
    passwordUser,
    dateUser
  ],
  (err, result) => {
      console.log(err);
      console.log(result);
    })
  res.send('Connected on database!')
});

app.listen(port, () => {
  console.log(`Application à l'écoute sur le port ${port}!`)
});
