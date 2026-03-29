<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard | IUMS Pro</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="sidebar">
        <div class="logo"><i class="fas fa-university"></i> IUMS Pro</div>
        <nav>
            <a href="#" class="active"><i class="fas fa-th-large"></i> Dashboard</a>
            <a href="#"><i class="fas fa-user-graduate"></i> Students</a>
            <a href="#"><i class="fas fa-chalkboard-teacher"></i> Faculty</a>
            <a href="#"><i class="fas fa-wallet"></i> Finance</a>
            <a href="#"><i class="fas fa-book"></i> Library</a>
            <a href="#"><i class="fas fa-file-alt"></i> Exams</a>
            <a href="#"><i class="fas fa-chart-line"></i> Reports</a>
            <a href="#"><i class="fas fa-cog"></i> System Settings</a>
        </nav>
        <div class="user-profile">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100" alt="Admin">
            <div>
                <p style="font-weight: 600; font-size: 14px;">Dr. Robert Chen</p>
                <p style="font-size: 11px; opacity: 0.7;">Super Admin</p>
            </div>
        </div>
    </div>

    <div class="main-content">
        <header class="header">
            <div class="search-bar">
                <i class="fas fa-search" style="color: var(--text-secondary);"></i>
                <input type="text" placeholder="Search student records, faculty, or invoices...">
            </div>
            <div style="display: flex; align-items: center; gap: 20px;">
                <i class="fas fa-bell" style="color: var(--text-secondary);"></i>
                <i class="fas fa-question-circle" style="color: var(--text-secondary);"></i>
                <button class="btn btn-primary" style="background: var(--sidebar); color: white; border: none; padding: 10px 20px;">+ New Entry</button>
            </div>
        </header>

        <div style="margin-bottom: 30px;">
            <h1 style="font-size: 24px; font-weight: 700;">University Overview</h1>
            <p style="color: var(--text-secondary);">Welcome back, Admin. Here's what's happening today.</p>
        </div>

        <div class="dashboard-grid">
            <div class="card">
                <div class="info">
                    <h3>Total Students</h3>
                    <p>12,458</p>
                    <span style="color: var(--success); font-size: 12px;"><i class="fas fa-arrow-up"></i> +12.5% vs last month</span>
                </div>
                <div class="icon"><i class="fas fa-user-graduate"></i></div>
            </div>
            <div class="card">
                <div class="info">
                    <h3>Total Teachers</h3>
                    <p>842</p>
                    <span style="color: var(--text-secondary); font-size: 12px;">Stable (no change)</span>
                </div>
                <div class="icon"><i class="fas fa-chalkboard-teacher"></i></div>
            </div>
            <div class="card">
                <div class="info">
                    <h3>Total Revenue</h3>
                    <p>$4.2M</p>
                    <span style="color: var(--success); font-size: 12px;"><i class="fas fa-arrow-up"></i> +5.2% vs target</span>
                </div>
                <div class="icon"><i class="fas fa-dollar-sign"></i></div>
            </div>
            <div class="card">
                <div class="info">
                    <h3>Active Sessions</h3>
                    <p>2,109</p>
                    <span style="color: var(--danger); font-size: 12px;"><i class="fas fa-arrow-down"></i> -2.1% off-peak</span>
                </div>
                <div class="icon"><i class="fas fa-signal"></i></div>
            </div>
        </div>

        <div class="content-grid">
            <div class="panel">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2>Student Enrollment Trends</h2>
                    <select style="padding: 5px; border-radius: 5px; border-color: var(--border);">
                        <option>Current Year</option>
                    </select>
                </div>
                <div style="height: 200px; display: flex; align-items: flex-end; gap: 15px; padding-bottom: 20px;">
                    <div style="flex: 1; height: 40%; background: #e2e8f0; border-radius: 4px;"></div>
                    <div style="flex: 1; height: 60%; background: #e2e8f0; border-radius: 4px;"></div>
                    <div style="flex: 1; height: 50%; background: #e2e8f0; border-radius: 4px;"></div>
                    <div style="flex: 1; height: 90%; background: var(--primary); border-radius: 4px;"></div>
                    <div style="flex: 1; height: 75%; background: #e2e8f0; border-radius: 4px;"></div>
                    <div style="flex: 1; height: 65%; background: #e2e8f0; border-radius: 4px;"></div>
                    <div style="flex: 1; height: 55%; background: #e2e8f0; border-radius: 4px;"></div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-secondary);">
                    <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span><span>JUL</span>
                </div>
            </div>
            <div class="panel">
                <h2>Revenue Trends</h2>
                <div style="height: 150px; border-bottom: 2px solid var(--border); border-left: 2px solid var(--border); position: relative; margin-bottom: 15px;">
                    <svg viewBox="0 0 100 50" style="width: 100%; height: 100%; fill: none; stroke: var(--primary); stroke-width: 2;">
                        <path d="M0,45 Q20,40 40,30 T60,20 T80,10 T100,5" />
                    </svg>
                </div>
                <div style="display: flex; gap: 15px; font-size: 12px;">
                    <span><i class="fas fa-circle" style="color: var(--primary);"></i> Gross Income</span>
                    <span><i class="fas fa-circle" style="color: #cbd5e1;"></i> Expenditure</span>
                </div>
            </div>
        </div>

        <div class="panel" style="margin-top: 30px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2>System Audit Log</h2>
                <a href="#" style="color: var(--secondary); font-size: 14px; text-decoration: none;">View All</a>
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <thead>
                    <tr style="text-align: left; color: var(--text-secondary); border-bottom: 1px solid var(--border);">
                        <th style="padding: 12px 0;">ACTION</th>
                        <th>PERFORMED BY</th>
                        <th>TARGET ENTITY</th>
                        <th>STATUS</th>
                        <th>TIMESTAMP</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid var(--border);">
                        <td style="padding: 15px 0;">New Student Admission</td>
                        <td>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <div style="width: 24px; height: 24px; background: #e0f2fe; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; color: var(--primary);">JD</div>
                                John Doe
                            </div>
                        </td>
                        <td>ST-2024-0412</td>
                        <td><span style="background: #d1fae5; color: #065f46; padding: 4px 8px; border-radius: 12px; font-size: 11px;">COMPLETED</span></td>
                        <td style="color: var(--text-secondary);">2 mins ago</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>
