const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Route to handle the form submission
app.post('/send', (req, res) => {
    const { name, email, subject, comment } = req.body;

    // Nodemailer transporter setup
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,  // Use environment variable
            pass: process.env.EMAIL_PASS   // Use environment variable
        }
    });

    // Email options
    let mailOptions = {
        from: process.env.EMAIL_USER,    // Sender email
        to: process.env.EMAIL_USER,      // Your email
        subject: subject,                // Subject from form
        html: `<p><b>Name:</b> ${name}</p>
               <p><b>Email:</b> ${email}</p>
               <p><b>Message:</b> ${comment}</p>`,
        replyTo: email                    // Allows you to reply directly to the sender
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
            return res.status(500).send({ msg: 'Error occurred while sending email' });
        }
        res.status(200).send({ msg: 'Email sent successfully!' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
