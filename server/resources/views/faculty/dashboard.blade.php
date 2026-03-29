<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Faculty Dashboard | IUMS Portal</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="sidebar">
        <div class="logo"><i class="fas fa-university"></i> IUMS</div>
        <nav>
            <a href="#" class="active"><i class="fas fa-th-large"></i> Dashboard</a>
            <a href="#"><i class="fas fa-book-open"></i> My Courses</a>
            <a href="#"><i class="fas fa-calendar-alt"></i> Schedule</a>
            <a href="#"><i class="fas fa-file-signature"></i> Examination</a>
            <a href="#"><i class="fas fa-users"></i> Students</a>
            <a href="#"><i class="fas fa-poll"></i> Reports</a>
        </nav>
        <div class="user-profile">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Faculty">
            <div>
                <p style="font-weight: 600; font-size: 14px;">Dr. Sarah Jenkins</p>
                <p style="font-size: 11px; opacity: 0.7;">Senior Faculty, CS</p>
            </div>
        </div>
    </div>

    <div class="main-content">
        <header class="header">
            <div style="font-size: 13px; color: var(--text-secondary);">
                Home > Faculty Dashboard
            </div>
            <div style="display: flex; align-items: center; gap: 20px;">
                <i class="fas fa-bell"></i>
                <div style="font-size: 12px; font-weight: 600;">Academic Year: <span style="font-weight: 700;">2023-24 (Fall)</span></div>
            </div>
        </header>

        <div class="dashboard-grid">
            <div class="card">
                <div class="info">
                    <h3>Total Students</h3>
                    <p>142</p>
                </div>
                <div class="icon"><i class="fas fa-users"></i></div>
            </div>
            <div class="card">
                <div class="info">
                    <h3>Courses Active</h3>
                    <p>4</p>
                </div>
                <div class="icon"><i class="fas fa-book"></i></div>
            </div>
            <div class="card">
                <div class="info">
                    <h3>Credit Hours</h3>
                    <p>12.5</p>
                </div>
                <div class="icon"><i class="fas fa-hourglass-half"></i></div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <button class="btn" style="background: #10b981; color: white; width: 100%; border: none; padding: 12px; border-radius: 8px;"><i class="fas fa-check-circle"></i> Attendance</button>
                <button class="btn" style="background: var(--sidebar); color: white; width: 100%; border: none; padding: 12px; border-radius: 8px;"><i class="fas fa-star"></i> Marks Entry</button>
            </div>
        </div>

        <div class="content-grid">
            <div class="panel">
                <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                    <h2>My Courses</h2>
                    <a href="#" style="font-size: 12px; color: var(--secondary); text-decoration: none;">View All Courses</a>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="border: 1px solid var(--border); padding: 20px; border-radius: 12px;">
                        <span style="font-size: 11px; background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 10px;">ACTIVE</span>
                        <h4 style="margin: 10px 0;">Data Structures</h4>
                        <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 15px;">CS-201 • Section B • 42 Students</p>
                        <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 5px;">
                            <span>Progress</span>
                            <span>65%</span>
                        </div>
                        <div style="width: 100%; height: 6px; background: #e2e8f0; border-radius: 10px;">
                            <div style="width: 65%; height: 100%; background: var(--sidebar); border-radius: 10px;"></div>
                        </div>
                    </div>
                    <div style="border: 1px solid var(--border); padding: 20px; border-radius: 12px;">
                        <span style="font-size: 11px; background: #fff7ed; color: #9a3412; padding: 2px 8px; border-radius: 10px;">EXAM PHASE</span>
                        <h4 style="margin: 10px 0;">Intro to Psychology</h4>
                        <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 15px;">PSY-101 • Section A • 35 Students</p>
                        <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 5px;">
                            <span>Progress</span>
                            <span>90%</span>
                        </div>
                        <div style="width: 100%; height: 6px; background: #e2e8f0; border-radius: 10px;">
                            <div style="width: 90%; height: 100%; background: var(--sidebar); border-radius: 10px;"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2>Today's Schedule</h2>
                    <span style="font-size: 12px; opacity: 0.6;">OCT 24, 2023</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 20px;">
                    <div style="border-left: 4px solid var(--primary); padding: 0 15px;">
                        <span style="font-size: 11px; color: var(--text-secondary);">09:00 AM • LECTURE</span>
                        <h4 style="font-size: 14px; margin: 3px 0;">Data Structures (CS-201)</h4>
                        <p style="font-size: 11px; color: var(--text-secondary);"><i class="fas fa-map-marker-alt"></i> B-402 • 90m</p>
                    </div>
                    <div style="border-left: 4px solid var(--success); padding: 0 15px;">
                        <span style="font-size: 11px; color: var(--text-secondary);">11:00 AM • LAB</span>
                        <h4 style="font-size: 14px; margin: 3px 0;">Lab: OS (CSL-301)</h4>
                        <p style="font-size: 11px; color: var(--text-secondary);"><i class="fas fa-map-marker-alt"></i> Lab 3, IT • 120m</p>
                    </div>
                </div>

                <h2 style="margin-top: 30px; margin-bottom: 20px;">Notice Board</h2>
                <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <span style="font-size: 10px; color: var(--danger); font-weight: 700;">URGENT</span>
                    <h4 style="font-size: 13px; margin: 5px 0;">Submission of Semester marks</h4>
                    <p style="font-size: 11px; color: var(--text-secondary);">Deadline: 30th Oct</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
