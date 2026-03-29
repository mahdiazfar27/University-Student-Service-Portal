<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Dashboard | IUMS Portal</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        .profile-card {
            background: var(--white);
            padding: 30px;
            border-radius: 16px;
            box-shadow: var(--shadow);
            display: flex;
            align-items: center;
            gap: 30px;
            margin-bottom: 30px;
        }

        .profile-img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 4px solid #fff;
            box-shadow: var(--shadow);
        }

        .status-badge {
            background: #e2e8f0;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 600;
        }

        .action-btns .btn {
            background: var(--primary);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 13px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .routine-item {
            display: flex;
            gap: 15px;
            padding: 15px 0;
            border-bottom: 1px solid var(--border);
        }
        
        .routine-time {
            width: 60px;
            font-size: 12px;
            color: var(--text-secondary);
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="sidebar">
        <div class="logo"><i class="fas fa-graduation-cap"></i> IUMS Portal</div>
        <nav>
            <a href="#" class="active"><i class="fas fa-th-large"></i> Dashboard</a>
            <a href="#"><i class="fas fa-calendar-alt"></i> Routine</a>
            <a href="#"><i class="fas fa-poll-h"></i> Results</a>
            <a href="#"><i class="fas fa-file-invoice-dollar"></i> Fees & Billing</a>
            <a href="#"><i class="fas fa-tasks"></i> Assignments</a>
            <a href="#"><i class="fas fa-book-reader"></i> Library</a>
        </nav>
        <div class="user-profile">
            <img src="https://images.unsplash.com/photo-1519085185750-74071727311c?auto=format&fit=crop&q=80&w=100" alt="Student">
            <div>
                <p style="font-weight: 600; font-size: 14px;">Alex Henderson</p>
                <p style="font-size: 11px; opacity: 0.7;">ID: 2024-09821</p>
            </div>
        </div>
    </div>

    <div class="main-content">
        <header class="header">
            <div style="font-size: 13px; color: var(--text-secondary);">
                <i class="fas fa-home"></i> Home > Dashboard Overview
            </div>
            <div style="display: flex; align-items: center; gap: 20px;">
                <i class="fas fa-bell"></i>
                <i class="fas fa-cog"></i>
            </div>
        </header>

        <div class="profile-card">
            <img class="profile-img" src="https://images.unsplash.com/photo-1519085185750-74071727311c?auto=format&fit=crop&q=80&w=100" alt="Student">
            <div style="flex: 1;">
                <h1 style="font-size: 24px;">Good morning, Alex!</h1>
                <p style="color: var(--text-secondary); margin: 5px 0 15px; font-style: italic;">"Education is the most powerful weapon which you can use to change the world."</p>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <span class="status-badge" style="background: #dbeafe; color: #1e40af;">B.Sc. Computer Science</span>
                    <span class="status-badge">Semester 5</span>
                    <span class="status-badge">Regular Student</span>
                </div>
            </div>
            <div class="action-btns" style="display: flex; flex-direction: column; gap: 10px;">
                <button class="btn"><i class="fas fa-print"></i> Print ID Card</button>
                <button class="btn" style="background: #f1f5f9; color: var(--text-primary);"><i class="fas fa-edit"></i> Edit Profile</button>
            </div>
        </div>

        <div class="dashboard-grid">
            <div class="card" style="flex-direction: column; align-items: center; text-align: center;">
                <div style="width: 70px; height: 70px; border: 6px solid var(--sidebar); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; margin-bottom: 10px;">3.82</div>
                <h3>Cumulative GPA</h3>
                <p style="font-size: 12px; color: var(--text-secondary);">OUT OF 4.0</p>
            </div>
            <div class="card" style="flex-direction: column; align-items: flex-start;">
                <div style="display: flex; justify-content: space-between; width: 100%; margin-bottom: 5px;">
                    <span style="font-size: 13px; font-weight: 600;">92%</span>
                    <span style="font-size: 11px; background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 10px;">On Track</span>
                </div>
                <h3>Overall Attendance</h3>
                <div style="width: 100%; height: 6px; background: #e2e8f0; border-radius: 10px; margin-top: 10px;">
                    <div style="width: 92%; height: 100%; background: #10b981; border-radius: 10px;"></div>
                </div>
            </div>
            <div class="card" style="flex-direction: column; align-items: flex-start;">
                <div style="display: flex; justify-content: space-between; width: 100%; margin-bottom: 5px;">
                    <span style="font-size: 13px; font-weight: 600;">84 / 140</span>
                </div>
                <h3>Total Credits Earned</h3>
                <div style="width: 100%; height: 6px; background: #e2e8f0; border-radius: 10px; margin-top: 10px;">
                    <div style="width: 60%; height: 100%; background: var(--secondary); border-radius: 10px;"></div>
                </div>
            </div>
            <div class="card" style="flex-direction: column; align-items: flex-start;">
                <div style="display: flex; justify-content: space-between; width: 100%; margin-bottom: 5px;">
                    <span style="font-size: 13px; font-weight: 600;">04</span>
                    <span style="font-size: 11px; background: #fee2e2; color: #991b1b; padding: 2px 8px; border-radius: 10px;">Due Soon</span>
                </div>
                <h3>Assignments Pending</h3>
                <div style="width: 100%; height: 6px; background: #e2e8f0; border-radius: 10px; margin-top: 10px;">
                    <div style="width: 80%; height: 100%; background: var(--danger); border-radius: 10px;"></div>
                </div>
            </div>
        </div>

        <div class="content-grid">
            <div class="panel">
                <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                    <h2>Current Semester Courses</h2>
                    <a href="#" style="font-size: 12px; color: var(--secondary); text-decoration: none;">View All Courses</a>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="border: 1px solid var(--border); padding: 20px; border-radius: 12px;">
                        <span style="font-size: 10px; opacity: 0.6;">CSE-301</span>
                        <h4 style="margin: 5px 0 15px;">Database Management Systems</h4>
                        <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 5px;">
                            <span>Syllabus Coverage</span>
                            <span>75%</span>
                        </div>
                        <div style="width: 100%; height: 4px; background: #e2e8f0; border-radius: 10px;">
                            <div style="width: 75%; height: 100%; background: var(--sidebar); border-radius: 10px;"></div>
                        </div>
                    </div>
                    <div style="border: 1px solid var(--border); padding: 20px; border-radius: 12px;">
                        <span style="font-size: 10px; opacity: 0.6;">CSE-305</span>
                        <h4 style="margin: 5px 0 15px;">Algorithms & Complexity</h4>
                        <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 5px;">
                            <span>Syllabus Coverage</span>
                            <span>42%</span>
                        </div>
                        <div style="width: 100%; height: 4px; background: #e2e8f0; border-radius: 10px;">
                            <div style="width: 42%; height: 100%; background: var(--sidebar); border-radius: 10px;"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel">
                <h2>Today's Routine</h2>
                <div class="routine-item">
                    <div class="routine-time">09:00 AM</div>
                    <div>
                        <h4 style="font-size: 14px;">Database Systems</h4>
                        <p style="font-size: 11px; color: var(--text-secondary);">Room 402 • Prof. Sarah Jenkins</p>
                    </div>
                </div>
                <div class="routine-item">
                    <div class="routine-time">11:30 AM</div>
                    <div>
                        <h4 style="font-size: 14px;">Linear Algebra II</h4>
                        <p style="font-size: 11px; color: var(--text-secondary);">Lecture Hall B • Dr. Alan Turing</p>
                    </div>
                </div>
                <h2 style="margin-top: 30px;">Upcoming Deadlines</h2>
                <div style="border-left: 4px solid var(--danger); padding: 10px 15px; background: #fef2f2; border-radius: 0 8px 8px 0; margin-bottom: 10px;">
                    <h4 style="font-size: 13px;">DBMS Assignment 3</h4>
                    <p style="font-size: 11px; color: var(--danger);">Due in 2 hours</p>
                </div>
                <div style="border-left: 4px solid var(--warning); padding: 10px 15px; background: #fffbeb; border-radius: 0 8px 8px 0;">
                    <h4 style="font-size: 13px;">Algorithm Quiz Prep</h4>
                    <p style="font-size: 11px; color: var(--warning);">Due tomorrow</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
