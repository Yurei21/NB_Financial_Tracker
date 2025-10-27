<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Your Registration Code</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px;">
        <h2 style="color: #2563eb;">NB Financial Tracker</h2>
        <p>Hello,</p>
        <p>Your registration code is:</p>

        <div style="font-size: 24px; font-weight: bold; color: #2563eb; margin: 10px 0;">
            {{ $code }}
        </div>

        <p>This code will expire in 15 minutes.</p>
        <p>If you did not request this code, please ignore this email.</p>

        <hr style="margin-top: 30px; border: none; border-top: 1px solid #e5e7eb;">
        <p style="font-size: 12px; color: #6b7280;">&copy; {{ date('Y') }} NB Financial Tracker. All rights reserved.</p>
    </div>
</body>
</html>
