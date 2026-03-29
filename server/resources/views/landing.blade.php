<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Integrated University Management System (IUMS) | Welcome</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        .hero {
            background: linear-gradient(rgba(30, 58, 138, 0.8), rgba(30, 58, 138, 0.8)), url('https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=2070');
            background-size: cover;
            background-position: center;
            height: 80vh;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding-top: 80px;
        }

        .hero h1 {
            font-size: 56px;
            font-weight: 800;
            margin-bottom: 20px;
            line-height: 1.1;
        }

        .hero p {
            font-size: 20px;
            max-width: 800px;
            margin: 0 auto 40px;
            opacity: 0.9;
        }

        .btn {
            padding: 14px 28px;
            border-radius: 8px;
            font-weight: 600;
            text-decoration: none;
            transition: 0.3s;
            display: inline-block;
        }

        .btn-primary {
            background-color: white;
            color: var(--primary);
        }

        .btn-outline {
            border: 2px solid white;
            color: white;
            margin-left: 15px;
        }

        .navbar {
            padding: 20px 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: absolute;
            width: 100%;
            z-index: 1000;
            color: white;
        }

        .navbar .logo {
            font-size: 24px;
            font-weight: 700;
        }

        .navbar .links a {
            color: white;
            text-decoration: none;
            margin: 0 15px;
            font-size: 15px;
            opacity: 0.8;
        }

        .navbar .links a:hover {
            opacity: 1;
        }

        .landing-stats {
            margin-top: -60px;
            padding: 0 50px;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
        }

        .stat-card {
            background: white;
            padding: 30px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        .stat-card h2 {
            font-size: 32px;
            color: var(--primary);
            margin-bottom: 5px;
        }

        .stat-card p {
            color: var(--text-secondary);
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .section-title {
            text-align: center;
            margin: 80px 0 50px;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            padding: 0 50px;
            margin-bottom: 80px;
        }
        
        .feature-item {
            padding: 40px;
            background: #fff;
            border-radius: 16px;
            border: 1px solid var(--border);
            transition: 0.3s;
        }
        
        .feature-item:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow);
        }
        
        .feature-icon {
            font-size: 32px;
            color: var(--primary);
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="logo">IUMS</div>
        <div class="links">
            <a href="#">Academic</a>
            <a href="#">Admissions</a>
            <a href="#">Examinations</a>
            <a href="#">Research</a>
            <a href="/login" class="btn btn-primary" style="padding: 10px 20px; margin-left: 20px;">Portal Login</a>
        </div>
    </nav>

    <header class="hero">
        <div class="hero-content">
            <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; background: rgba(255,255,255,0.2); padding: 5px 15px; border-radius: 20px;">Next-Gen Education Management</span>
            <h1>Empowering Excellence in<br><span style="color: #60a5fa;">Higher Education.</span></h1>
            <p>A unified ecosystem for students, faculty, and administration to streamline academic lifecycles, research, and institutional growth.</p>
            <div class="hero-btns">
                <a href="/login" class="btn btn-primary"><i class="fas fa-user-graduate"></i> Student Portal</a>
                <a href="/login" class="btn btn-outline"><i class="fas fa-chalkboard-teacher"></i> Faculty Access</a>
            </div>
        </div>
    </header>

    <div class="landing-stats">
        <div class="stat-card">
            <h2>15,000+</h2>
            <p>Students</p>
        </div>
        <div class="stat-card">
            <h2>500+</h2>
            <p>Faculty Members</p>
        </div>
        <div class="stat-card">
            <h2>42</h2>
            <p>Departments</p>
        </div>
        <div class="stat-card">
            <h2>120+</h2>
            <p>Courses</p>
        </div>
    </div>

    <div class="section-title">
        <h2>Comprehensive Academic Management</h2>
        <p style="color: var(--text-secondary);">One unified dashboard for all university operations.</p>
    </div>

    <div class="features-grid">
        <div class="feature-item">
            <div class="feature-icon"><i class="fas fa-book-open"></i></div>
            <h3>Course Management</h3>
            <p style="color: var(--text-secondary); margin-top: 10px;">Seamlessly manage curriculum, syllabi, and course materials with automated scheduling.</p>
        </div>
        <div class="feature-item">
            <div class="feature-icon"><i class="fas fa-laptop-code"></i></div>
            <h3>Online Examinations</h3>
            <p style="color: var(--text-secondary); margin-top: 10px;">Secure digital assessment tools with proctoring support and automatic grading.</p>
        </div>
        <div class="feature-item">
            <div class="feature-icon"><i class="fas fa-file-invoice-dollar"></i></div>
            <h3>Financial Systems</h3>
            <p style="color: var(--text-secondary); margin-top: 10px;">Integrated fee payment gateways, payroll management, and financial reporting.</p>
        </div>
    </div>

    <footer style="background: #f1f5f9; padding: 60px 50px; border-top: 1px solid var(--border);">
        <div style="display: flex; justify-content: space-between;">
            <div>
                <div class="logo" style="color: var(--primary); margin-bottom: 20px;">IUMS</div>
                <p style="color: var(--text-secondary); max-width: 300px;">Providing world-class digital infrastructure for higher education institutions globally.</p>
            </div>
            <div style="display: flex; gap: 60px;">
                <div>
                    <h4 style="margin-bottom: 20px;">University Portal</h4>
                    <ul style="list-style: none; color: var(--text-secondary); line-height: 2;">
                        <li>Student Dashboard</li>
                        <li>Faculty Portal</li>
                        <li>Admission Status</li>
                    </ul>
                </div>
                <div>
                    <h4 style="margin-bottom: 20px;">Quick Links</h4>
                    <ul style="list-style: none; color: var(--text-secondary); line-height: 2;">
                        <li>Academic Calendar</li>
                        <li>Library Catalog</li>
                        <li>Research Papers</li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>
