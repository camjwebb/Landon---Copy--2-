-- Database schema for Lando's BBQ
-- Run this in your AWS RDS PostgreSQL instance

CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster queries by date
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);
