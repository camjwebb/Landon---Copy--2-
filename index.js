require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// Email transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
const PORT = process.env.PORT || 8080;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: "Lando's Barbeque",
        activePage: 'home'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About - Lando's Barbeque",
        activePage: 'about'
    });
});

app.get('/menu', (req, res) => {
    res.render('menu', {
        title: "Menu - Lando's Barbeque",
        activePage: 'menu'
    });
});

app.get('/book-event', (req, res) => {
    res.render('book-event', {
        title: "Book an Event - Lando's Barbeque",
        activePage: 'book-event',
        success: req.query.success === 'true',
        error: req.query.error === 'true'
    });
});

// Handle booking form submission
app.post('/book-event', async (req, res) => {
    const { name, email, phone, message } = req.body;

    try {
        // Send email to Lando's Barbeque
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'landosbarbeque@gmail.com',
            subject: `New Booking Request from ${name}`,
            html: `
                <h2>New Booking Request</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        });

        res.redirect('/book-event?success=true');
    } catch (error) {
        console.error('Error sending email:', error);
        res.redirect('/book-event?error=true');
    }
});

// Health check endpoint for AWS
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
