const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(__dirname + '/static'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/solutions', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'solutions.html'));
});

app.get('/contactus', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'contactus.html'));
});

app.post('/contactus', function(req, res) {
    // console.log(req.body)

    const servicesObject = Object.keys(req.body)
        .filter(function(k) {
            return k.indexOf('service') == 0;
        })
        .reduce(function(newData, k) {
            newData[k] = req.body[k];
            return newData;
        }, {})
        
    const services = Object.values(servicesObject).join(', ');

    const options = {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }
    const transporter = nodemailer.createTransport(options)

    const message = {
        from: req.body.email, // This is ignored by Gmail
        to: process.env.EMAIL,
        subject: `datastellar.io - ${req.body.name} from ${req.body.company} reached out`,
        html: `
            <p><b>Name:</b> ${req.body.name}</p>
            <p><b>Email:</b> ${req.body.email}</p> 
            <p><b>Phone:</b> ${req.body.phone}</p>
            <p><b>Company:</b> ${req.body.company}</p>
            <p><b>Services:</b> ${services}</p>
            <p><b>Text:</b> ${req.body.text}</p>
        `
    }

    transporter.sendMail(message, (error, response) => {
        if (error) {
            console.log(error)
            console.error("There was an error during the email sending process")
        }
        else {
            res.redirect('/')
        }
    })
    
})


app.listen(PORT, () => {
    console.log('Server is starting on PORT,', PORT)
});