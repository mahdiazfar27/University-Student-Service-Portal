import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { studentAPI, enrollmentAPI, resultAPI, attendanceAPI, paymentAPI, semesterAPI } from '../api/apiClient';
import DashboardNav from '../components/DashboardNav';
import '../styles/Dashboard.css';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [studentProfile, setStudentProfile] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [results, setResults] = useState([]);
  const [attendance, setAttendance] = useState(null);
  const [payments, setPayments] = useState(null);
  const [currentSemester, setCurrentSemester] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    loadDashboardData();
  }, [user, navigate]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      // Get student profile
      const profileRes = await studentAPI.getStudentProfile(user.id);
      setStudentProfile(profileRes.data.data);

      // Get enrollments
      const enrollRes = await enrollmentAPI.getStudentEnrollments(user.id);
      setEnrollments(enrollRes.data.data || []);

      // Get results (grades)
      const resultsRes = await resultAPI.getStudentResults(user.id);
      setResults(resultsRes.data.data || []);

      // Get current semester
      const semesterRes = await semesterAPI.getCurrentSemester();
      setCurrentSemester(semesterRes.data.data);

      // Get attendance overview
      const attendRes = await attendanceAPI.getStudentOverallAttendance(user.id);
      setAttendance(attendRes.data.data);

      // Get payments
      const paymentRes = await paymentAPI.getStudentPayments(user.id);
      setPayments(paymentRes.data.data);
    } catch (err) {
      console.error('Error loading dashboard:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="dashboard">
        <DashboardNav user={user} onLogout={handleLogout} />
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  if (error && !studentProfile) {
    return (
      <div className="dashboard">
        <DashboardNav user={user} onLogout={handleLogout} />
        <div className="error-container">
          <p>{error}</p>
          <button onClick={loadDashboardData}>Retry</button>
        </div>
      </div>
    );
  }

  const calculateGPA = (results) => {
    if (!results || results.length === 0) return 0;
    const validResults = results.filter(r => r.marks_obtained !== null);
    if (validResults.length === 0) return 0;
    const total = validResults.reduce((sum, r) => sum + r.marks_obtained, 0);
    return (total / validResults.length).toFixed(2);
  };

  const attendancePercentage = attendance?.overall_percentage || 0;

  return (
    <div className="dashboard">
      <DashboardNav user={user} onLogout={handleLogout} activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="dashboard-content">
        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            Courses & Enrollment
          </button>
          <button
            className={`tab-btn ${activeTab === 'grades' ? 'active' : ''}`}
            onClick={() => setActiveTab('grades')}
          >
            Grades & GPA
          </button>
          <button
            className={`tab-btn ${activeTab === 'attendance' ? 'active' : ''}`}
            onClick={() => setActiveTab('attendance')}
          >
            Attendance
          </button>
          <button
            className={`tab-btn ${activeTab === 'fees' ? 'active' : ''}`}
            onClick={() => setActiveTab('fees')}
          >
            Fees & Payments
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="tab-content">
            <h2>Dashboard Overview</h2>

            <div className="student-info">
              <div className="info-card">
                <h3>Student Information</h3>
                <p><strong>Name:</strong> {studentProfile?.user?.name}</p>
                <p><strong>Student ID:</strong> {studentProfile?.student_id}</p>
                <p><strong>Email:</strong> {studentProfile?.user?.email}</p>
                <p><strong>Department:</strong> {studentProfile?.department?.name}</p>
                <p><strong>Enrollment Status:</strong> <span className="status-active">{studentProfile?.enrollment_status}</span></p>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <h4>Overall GPA</h4>
                  <p className="stat-value">{calculateGPA(results)}</p>
                </div>
                <div className="stat-card">
                  <h4>Attendance</h4>
                  <p className="stat-value">{attendancePercentage.toFixed(1)}%</p>
                </div>
                <div className="stat-card">
                  <h4>Courses Taken</h4>
                  <p className="stat-value">{enrollments.length}</p>
                </div>
                <div className="stat-card">
                  <h4>Fees Status</h4>
                  <p className="stat-value">{payments?.summary?.total_outstanding > 0 ? 'Pending' : 'Paid'}</p>
                </div>
              </div>
            </div>

            {currentSemester && (
              <div className="current-semester">
                <h3>Current Semester</h3>
                <p><strong>{currentSemester.academic_year} {currentSemester.semester}</strong></p>
                <p>From {new Date(currentSemester.start_date).toLocaleDateString()} to {new Date(currentSemester.end_date).toLocaleDateString()}</p>
              </div>
            )}
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="tab-content">
            <h2>My Courses</h2>
            {enrollments.length > 0 ? (
              <div className="courses-grid">
                {enrollments.map((enrollment) => (
                  <div key={enrollment.id} className="course-card">
                    <h3>{enrollment.courseOffering?.course?.title}</h3>
                    <p><strong>Code:</strong> {enrollment.courseOffering?.course?.code}</p>
                    <p><strong>Credits:</strong> {enrollment.courseOffering?.course?.credit_hours}</p>
                    <p><strong>Instructor:</strong> {enrollment.courseOffering?.teacher?.user?.name}</p>
                    <p><strong>Semester:</strong> {enrollment.courseOffering?.semester?.academic_year}</p>
                    <p><strong>Status:</strong> <span className="status-active">{enrollment.status}</span></p>
                    <p><strong>Enrolled:</strong> {new Date(enrollment.created_at).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No courses enrolled yet</p>
            )}
          </div>
        )}

        {/* Grades Tab */}
        {activeTab === 'grades' && (
          <div className="tab-content">
            <h2>Grades & GPA</h2>
            <div className="gpa-summary">
              <div className="gpa-card">
                <h3>Cumulative GPA</h3>
                <p className="gpa-value">{calculateGPA(results)}</p>
              </div>
            </div>

            {results.length > 0 ? (
              <table className="grades-table">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Code</th>
                    <th>Marks</th>
                    <th>Grade</th>
                    <th>Semester</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => (
                    <tr key={result.id}>
                      <td>{result.course?.title}</td>
                      <td>{result.course?.code}</td>
                      <td>{result.marks_obtained || '-'}</td>
                      <td>
                        <span className={`grade-badge grade-${result.grade?.toLowerCase() || 'na'}`}>
                          {result.grade || '-'}
                        </span>
                      </td>
                      <td>{result.semester?.academic_year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-data">No grades available yet</p>
            )}
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <div className="tab-content">
            <h2>Attendance Overview</h2>
            {attendance ? (
              <div className="attendance-container">
                <div className="attendance-summary">
                  <div className="attendance-card">
                    <h3>Overall Attendance</h3>
                    <p className="attendance-value">{attendance.overall_percentage.toFixed(1)}%</p>
                    <p className="attendance-detail">
                      {attendance.total_present} of {attendance.total_classes} classes
                    </p>
                  </div>
                  <div className="attendance-card">
                    <h3>Classes Present</h3>
                    <p className="attendance-value">{attendance.total_present}</p>
                  </div>
                  <div className="attendance-card">
                    <h3>Classes Absent</h3>
                    <p className="attendance-value" style={{ color: '#e74c3c' }}>
                      {attendance.total_absent}
                    </p>
                  </div>
                </div>

                {attendance.by_course && attendance.by_course.length > 0 && (
                  <div className="course-attendance">
                    <h3>Per Course Attendance</h3>
                    <div className="attendance-courses">
                      {attendance.by_course.map((course) => (
                        <div key={course.course_offering_id} className="course-attendance-item">
                          <h4>{course.course?.title}</h4>
                          <div className="attendance-bar-container">
                            <div
                              className="attendance-bar"
                              style={{ width: `${course.attendance_percentage}%` }}
                            >
                              {course.attendance_percentage.toFixed(1)}%
                            </div>
                          </div>
                          <p className="attendance-detail">
                            {course.classes_present}/{course.total_classes} classes
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="no-data">No attendance data available</p>
            )}
          </div>
        )}

        {/* Fees Tab */}
        {activeTab === 'fees' && (
          <div className="tab-content">
            <h2>Fees & Payments</h2>
            {payments?.summary ? (
              <div className="payments-container">
                <div className="payment-summary">
                  <div className="payment-card">
                    <h3>Total Due</h3>
                    <p className="payment-value">₨{payments.summary.total_due?.toLocaleString()}</p>
                  </div>
                  <div className="payment-card">
                    <h3>Total Paid</h3>
                    <p className="payment-value" style={{ color: '#27ae60' }}>
                      ₨{payments.summary.total_paid?.toLocaleString()}
                    </p>
                  </div>
                  <div className="payment-card">
                    <h3>Outstanding</h3>
                    <p className="payment-value" style={{ color: '#e74c3c' }}>
                      ₨{payments.summary.total_outstanding?.toLocaleString()}
                    </p>
                  </div>
                </div>

                {payments.payments && payments.payments.length > 0 && (
                  <table className="payments-table">
                    <thead>
                      <tr>
                        <th>Semester</th>
                        <th>Amount Due</th>
                        <th>Amount Paid</th>
                        <th>Outstanding</th>
                        <th>Status</th>
                        <th>Due Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.payments.map((payment) => (
                        <tr key={payment.id}>
                          <td>{payment.semester}</td>
                          <td>₨{payment.amount_due?.toLocaleString()}</td>
                          <td>₨{payment.amount_paid?.toLocaleString()}</td>
                          <td>₨{payment.outstanding?.toLocaleString()}</td>
                          <td>
                            <span className={`status-badge status-${payment.status}`}>
                              {payment.status}
                            </span>
                          </td>
                          <td>{payment.due_date ? new Date(payment.due_date).toLocaleDateString() : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ) : (
              <p className="no-data">No payment data available</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
