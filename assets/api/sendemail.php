<?php
// Email configuration
$recipient = "cameron.webb@houzd.com";
$subject = "New Event Booking Request from Lando's Barbeque";

// Get form data
$name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
$email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
$phone = isset($_POST['phone']) ? sanitize_input($_POST['phone']) : '';
$message = isset($_POST['comments']) ? sanitize_input($_POST['comments']) : '';

// Validate form data
if (empty($name) || empty($email) || empty($phone) || empty($message)) {
    die("Error: All fields are required.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Error: Invalid email address.");
}

// Create email message
$body = "You have received a new event booking request from Lando's Barbeque website.\n\n";
$body .= "Customer Details:\n";
$body .= "=====================================\n";
$body .= "Name: " . $name . "\n";
$body .= "Email: " . $email . "\n";
$body .= "Phone: " . $phone . "\n";
$body .= "=====================================\n\n";
$body .= "Message:\n";
$body .= "=====================================\n";
$body .= $message . "\n";
$body .= "=====================================\n";

// Set email headers
$headers = "From: " . $email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send email
if (mail($recipient, $subject, $body, $headers)) {
    echo "Thank you for your event booking request! We will get back to you soon.";
} else {
    echo "Error: There was a problem sending your message. Please try again later.";
}

// Function to sanitize input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>
