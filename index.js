const express = require('express');
const path = require('path');
// const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
// const { google } = require('googleapis')

// dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

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

app.post('/contactus', async function(req, res) {
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

    // const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
    // const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, REDIRECT_URI)

    // oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })
    // const ACCESS_TOKEN = await oAuth2Client.getAccessToken()

    const options = {
        // service: 'gmail',
        // host: 'smtp.gmail.com',
        host: 'mail.privateemail.com',
        port: 587,
        // port: 465,
        secure: false,
        auth: {
            // type: 'OAuth2',
            // user: process.env.EMAIL,
            user: process.env.NAMECHEAP_EMAIL,
            pass: process.env.NAMECHEAP_PASSWORD,
            // clientId: process.env.CLIENT_ID,
            // clientSecret: process.env.CLIENT_SECRET,
            // refreshToken: process.env.REFRESH_TOKEN,
            // accessToken: ACCESS_TOKEN
        },
        tls: {
            secureProtocol: "TLSv1_method"
        }
    }
    const transporter = nodemailer.createTransport(options)

    const message = {
        // from: req.body.email, // This is ignored by Gmail
        from: process.env.NAMECHEAP_EMAIL,
        // to: process.env.EMAIL,
        to: process.env.NAMECHEAP_EMAIL,
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
            res.redirect('/thankyou')
        }
    })
    
})

app.get('/thankyou', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'thankyou.html'));
});

app.listen(PORT, () => {
    console.log('Server is starting on PORT,', PORT)
});