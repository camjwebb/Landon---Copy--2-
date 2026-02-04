require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
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
        success: req.query.success === 'true'
    });
});

// API endpoint to save booking (example database usage)
app.post('/api/bookings', async (req, res) => {
    const { name, email, phone, message } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO bookings (name, email, phone, message, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING id',
            [name, email, phone, message]
        );
        res.json({ success: true, bookingId: result.rows[0].id });
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).json({ success: false, error: 'Failed to save booking' });
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
