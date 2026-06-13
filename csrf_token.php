<?php
/**
 * Alumni Connection Portal — CSRF Token Generator
 * @author  Ashutosh Rastogi <24MT0090@iitism.ac.in>
 * @project Alumni Connection Portal (College Project)
 * @year    2026
 */
session_start();

header('Content-Type: application/json');
header('Cache-Control: no-store, no-cache, must-revalidate');

// Generate a fresh CSRF token if one does not already exist
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

echo json_encode(['csrf_token' => $_SESSION['csrf_token']]);
?>
