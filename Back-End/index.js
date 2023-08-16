const express = require('express');
const mysql = require('mysql');
const bodyPareser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const cookieParser = require("cookie-parser");

const app = express();

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'thiqaproject',
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => { // cb = CallBack Function , that will be called 
        cb(null, 'Images') // First arg is the errors , second is the destination of the file ..
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname;
        const extension = path.extname(originalName);
        const filename = Date.now() + extension;
        cb(null, filename)
    },

});
const upload = multer({storage : storage});

app.use(express.json());
app.use(express.static("Images"));
app.use(bodyPareser.urlencoded({extended: true}));
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

const store = new session.MemoryStore();

app.use(cookieParser());

app.use(session({
    secret: 'secret-key',
    resave: false,
    key: "StudentId",
    saveUninitialized: false,
    cookie: {
        expires: 3000000,
    },
    store
}
));



app.post('/api/register', (req, res) => {
    const Email = req.body.Email;
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const Birthdate = req.body.Birthdate;
    const Photo = req.body.Photo;
    const Password = req.body.Password;
    const LevelOfStudy = req.body.LevelOfStudy;
    const Program = req.body.Program;
    const Division = req.body.Division;
    
    bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(Password, salt, (err,HashedPass)=> {
        if(err) return console.log(err);

        const query = `INSERT INTO students(Email, First_Name, Last_Name, Password, Photo, Birthdate, LOS, Program, Division)
                       VALUES("${Email}", "${FirstName}", "${LastName}", "${HashedPass}", "${Photo}" ,"${Birthdate}" , "${LevelOfStudy}", "${Program}", "${Division}")`;
        db.query(query, (err, result) => {
            if (err) return console.log(err);
            res.send(result);
        })
    })
})
});

app.post('/api/upload', upload.single('image'), (req, res) => {
    if (req.file) {
        const name = req.file.filename;

        const query = `SELECT MAX(StudentId) AS CurrentID FROM students`
        db.query(query, (err, result) => {
            if (err) return console.log(err);
            const query2 = `UPDATE students SET Photo = "${name}" WHERE StudentId = ${result[0].CurrentID}`
            db.query(query2, (err, result) => {
                if (err) return console.log(err);
            })
        })
        console.log('Image saved:', name);
        res.json({ message: 'Image uploaded successfully' });
    } else {
      res.status(400).json({ error: 'No image file received' });
    }
});

app.post('/api/login', (req, res) => {
    const Email = req.body.Email;
    const Password = req.body.Password;
    console.log(Email + " " + Password)

    const query = `SELECT * FROM students WHERE email = '${Email}'`;
    db.query(query, (err, result) => {
        if (err) return console.log(err);

        bcrypt.compare(Password, result[0].Password, (error, response) => {
            if(response){
                req.session.user = result[0]
                req.session.isLoggedIn = true;
                res.send(true);
            }else {
                res.send(false)
            }
        })
    })
});

app.get('/api/login_status', (req, res) => {
    res.send(req.session.isLoggedIn)
});

app.get('/api/logout', (req, res) => {
    res.clearCookie("StudentId");
    req.session.destroy();
    res.send();
});

app.get('/api/dashboard', (req, res) => {
    const StudentID = req.session.user.StudentId

    console.log(StudentID)

    const query = `SELECT First_Name, Last_Name, Photo, LOS, Program, Division FROM students WHERE studentId = ${StudentID}`;
    db.query(query, (err, result) => {
        if (err) return console.log(err);

        if(result.length == 0) return res.send("Invalid");
        res.send(result[0]);
    })
});

app.get('/api/getImage', (req, res) => {
    const StudentID = req.session.user.StudentId

    console.log(StudentID)

    const query = `SELECT Photo FROM students WHERE studentId = ${StudentID}`;
    db.query(query, (err, result) => {
        if (err) return console.log(err);

        if(result.length == 0) return res.send("Invalid");
        const PhotoName = result[0];
        res.json({PhotoName});
    })
});



app.listen(3001, () => {
    console.log('listening on port 3001');
});