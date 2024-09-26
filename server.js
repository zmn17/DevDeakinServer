const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const cors = require("cors");

// load enviroment variables
dotenv.config();

const app = express();
const PORT = 3000;

// middleware to parse incoming JSON data
app.use(express.json());
app.use(cors());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// API route to send email
app.post("/send-email", (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).send("Email is required.");

  // Email message details
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "Welcome to DEV@Deakin",
    text: "We're excited to have you on board. At Deakin, we strive to provide the best experience possible, and we are confident that you'll love what we have to offer.",
    html: "<h1>Welcome!</h1><p>Thank you for signing up! We are excited to have you on board.</p>",
  };

  // send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error)
      return res.status(500).send("Error sending email: " + error.message);

    res.send(`Welcome email sent to ${email}`);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
