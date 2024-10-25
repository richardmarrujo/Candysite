require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure your email credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',  // Or another email service (e.g., Yahoo, Outlook)
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Route to handle form submission
app.post('/send', (req, res) => {
    const { name, email, message } = req.body;
    console.log('Received data:', req.body);  // Log the received data

    const mailOptions = {
        from: email,
        to: 'contactdriverrater@gmail.com',
        subject: `Message from ${name}`,
        text: message
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);  // Log the error details
            return res.status(500).send('Error occurred while sending the email');
        }
        res.status(200).send('Email sent successfully');
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
