<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login | IUMS Portal</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        body {
            background: #f1f5f9;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }

        .login-card {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
            width: 100%;
            max-width: 400px;
        }

        .login-header {
            text-align: center;
            margin-bottom: 30px;
        }

        .login-header .logo-container {
            width: 60px;
            height: 60px;
            background: #e2e8f0;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 15px;
            color: var(--primary);
            font-size: 24px;
        }

        .login-header h1 {
            font-size: 20px;
            font-weight: 700;
            color: var(--primary);
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            font-size: 14px;
            color: var(--text-secondary);
            margin-bottom: 5px;
        }

        .form-group select, .form-group input {
            width: 100%;
            padding: 12px;
            border: 1px solid var(--border);
            border-radius: 8px;
            font-size: 14px;
            outline: none;
        }

        .form-group input:focus {
            border-color: var(--secondary);
        }

        .forgot-password {
            float: right;
            font-size: 12px;
            color: var(--secondary);
            text-decoration: none;
        }

        .login-btn {
            width: 100%;
            background: #10b981;
            color: white;
            border: none;
            padding: 14px;
            border-radius: 8px;
            font-weight: 700;
            cursor: pointer;
            margin-top: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }

        .login-btn:hover {
            background: #059669;
        }

        .login-footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: var(--text-secondary);
        }
    </style>
</head>
<body>
    <div class="login-card">
        <div class="login-header">
            <div class="logo-container">
                <i class="fas fa-graduation-cap"></i>
            </div>
            <h1>IUMS Portal</h1>
            <p style="font-size: 13px; color: var(--text-secondary);">Integrated University Management System</p>
        </div>

        <form action="/login" method="POST">
            @csrf
            <h2 style="font-size: 18px; margin-bottom: 10px;">Sign In</h2>
            <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 20px;">Enter your credentials to access your account</p>

            <div class="form-group">
                <label>User Role</label>
                <select name="role">
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            <div class="form-group">
                <label>Email or Institutional ID</label>
                <input type="text" name="email" placeholder="e.g. j.doe@university.edu">
            </div>

            <div class="form-group" style="position: relative;">
                <label>Password</label>
                <a href="#" class="forgot-password">Forgot Password?</a>
                <input type="password" name="password" placeholder="********">
            </div>

            <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--text-secondary);">
                <input type="checkbox" id="remember">
                <label for="remember">Keep me logged in</label>
            </div>

            <button type="submit" class="login-btn">
                LOGIN TO PORTAL <i class="fas fa-arrow-right"></i>
            </button>
        </form>

        <div class="login-footer">
            <p><i class="fas fa-headset"></i> IT Help Desk: (555) 012-3456</p>
            <div style="margin-top: 10px; display: flex; justify-content: center; gap: 15px;">
                <a href="#" style="color: var(--text-secondary); text-decoration: none;">Privacy Policy</a>
                <a href="#" style="color: var(--text-secondary); text-decoration: none;">System Status</a>
            </div>
        </div>
    </div>
</body>
</html>
