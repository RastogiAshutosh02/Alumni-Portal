<?php
/**
 * Alumni Connection Portal — Contact Form Handler
 * @author  Ashutosh Rastogi <24MT0090@iitism.ac.in>
 * @project Alumni Connection Portal (College Project)
 * @year    2026
 */
session_start();

header('Content-Type: application/json');

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
    exit;
}

// Rate limiting: max 3 submissions per 10 minutes per session
if (!isset($_SESSION['contact_attempts'])) {
    $_SESSION['contact_attempts'] = 0;
    $_SESSION['contact_window_start'] = time();
}
if (time() - $_SESSION['contact_window_start'] > 600) {
    $_SESSION['contact_attempts'] = 0;
    $_SESSION['contact_window_start'] = time();
}
if ($_SESSION['contact_attempts'] >= 3) {
    http_response_code(429);
    echo json_encode(['status' => 'error', 'message' => 'Too many requests. Please try again in 10 minutes.']);
    exit;
}

// CSRF token verification
if (
    empty($_POST['csrf_token']) ||
    empty($_SESSION['csrf_token']) ||
    !hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])
) {
    http_response_code(403);
    echo json_encode(['status' => 'error', 'message' => 'Invalid request. Please refresh and try again.']);
    exit;
}

// Collect inputs from $_POST only
$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

// Server-side validation
$errors = [];

if (mb_strlen($name) < 2 || mb_strlen($name) > 100) {
    $errors[] = 'Name must be between 2 and 100 characters.';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 254) {
    $errors[] = 'A valid email address is required.';
}
if (mb_strlen($subject) < 4 || mb_strlen($subject) > 200) {
    $errors[] = 'Subject must be between 4 and 200 characters.';
}
if (mb_strlen($message) < 20 || mb_strlen($message) > 5000) {
    $errors[] = 'Message must be between 20 and 5000 characters.';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['status' => 'error', 'message' => implode(' ', $errors)]);
    exit;
}

// Strip newlines from header values to prevent email header injection
$name    = str_replace(["\r", "\n"], ' ', $name);
$email   = str_replace(["\r", "\n"], '',  $email);
$subject = str_replace(["\r", "\n"], ' ', $subject);

// HTML-encode values for safe use in email body
$name_safe    = htmlspecialchars($name,    ENT_QUOTES, 'UTF-8');
$email_safe   = htmlspecialchars($email,   ENT_QUOTES, 'UTF-8');
$subject_safe = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
$message_safe = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

$to = "acsrao@iitism.ac.in";

// Use a fixed no-reply From address; put user's address only in Reply-To
$headers  = "From: no-reply@iitism.ac.in\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

$mail_subject = "Website Contact: " . $subject;

$body  = "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>Contact Message</title></head><body>";
$body .= "<table style='width:100%;font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse;'>";
$body .= "<tr><td style='padding:8px;border:1px solid #ddd;width:120px;'><strong>Name</strong></td><td style='padding:8px;border:1px solid #ddd;'>{$name_safe}</td></tr>";
$body .= "<tr><td style='padding:8px;border:1px solid #ddd;'><strong>Email</strong></td><td style='padding:8px;border:1px solid #ddd;'>{$email_safe}</td></tr>";
$body .= "<tr><td style='padding:8px;border:1px solid #ddd;'><strong>Subject</strong></td><td style='padding:8px;border:1px solid #ddd;'>{$subject_safe}</td></tr>";
$body .= "<tr><td style='padding:8px;border:1px solid #ddd;'><strong>Message</strong></td><td style='padding:8px;border:1px solid #ddd;'>{$message_safe}</td></tr>";
$body .= "</table></body></html>";

$_SESSION['contact_attempts']++;

$sent = mail($to, $mail_subject, $body, $headers);

// Regenerate CSRF token after each submission attempt to prevent reuse
$_SESSION['csrf_token'] = bin2hex(random_bytes(32));

if ($sent) {
    echo json_encode(['status' => 'success', 'message' => 'Your message has been sent successfully.']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to send message. Please try again later.']);
}
?>
