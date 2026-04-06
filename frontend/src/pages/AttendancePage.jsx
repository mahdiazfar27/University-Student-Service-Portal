import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { attendanceAPI, enrollmentAPI } from '../api/apiClient';
import { Card, DataTable, Loading, Badge, Tabs } from '../components';
import { handleAPIError } from '../utils/apiErrors';
import './AttendancePage.css';

/**
 * Attendance Page
 * 
 * View attendance records for enrolled courses
 */
const AttendancePage = () => {
  const { user } = useAuth();
  const { showError } = useToast();

  const [enrollments, setEnrollments] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get student enrollments
      const enrollRes = await enrollmentAPI.getStudentEnrollments(user.id);
      const enrollmentData = enrollRes.data.data || [];
      setEnrollments(enrollmentData);

      // Set first enrollment as default
      if (enrollmentData.length > 0) {
        setSelectedEnrollment(enrollmentData[0].id);
      }

      // Load attendance for each enrollment
      const records = {};
      for (const enrollment of enrollmentData) {
        try {
          const attendRes = await attendanceAPI.getEnrollmentAttendance(enrollment.id);
          records[enrollment.id] = attendRes.data.data || [];
        } catch (err) {
          records[enrollment.id] = [];
        }
      }
      setAttendanceRecords(records);
    } catch (err) {
      const errorInfo = handleAPIError(err);
      setError(errorInfo.message);
      showError(errorInfo.message);
    } finally {
      setLoading(false);
    }
  };

  const getAttendancePercentage = (enrollmentId) => {
    const records = attendanceRecords[enrollmentId] || [];
    if (records.length === 0) return 0;
    const present = records.filter(r => r.status === 'present').length;
    return Math.round((present / records.length) * 100);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'success';
      case 'absent':
        return 'danger';
      case 'late':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  const columns = [
    {
      key: 'date',
      label: 'Date',
      render: (value) => new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Badge variant={getStatusColor(value)}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'remarks',
      label: 'Remarks',
      render: (value) => value || '-',
    },
  ];

  if (loading) return <Loading fullpage message="Loading attendance..." />;

  const tabs = enrollments.map(enrollment => {
    const percentage = getAttendancePercentage(enrollment.id);
    const records = attendanceRecords[enrollment.id] || [];

    return {
      id: enrollment.id,
      label: `${enrollment.course?.code} (${percentage}%)`,
      content: (
        <div className="attendance-content">
          <div className="attendance-summary">
            <div className="summary-card">
              <h4>Total Classes</h4>
              <p className="summary-value">{records.length}</p>
            </div>
            <div className="summary-card">
              <h4>Present</h4>
              <p className="summary-value present">
                {records.filter(r => r.status === 'present').length}
              </p>
            </div>
            <div className="summary-card">
              <h4>Absent</h4>
              <p className="summary-value absent">
                {records.filter(r => r.status === 'absent').length}
              </p>
            </div>
            <div className="summary-card">
              <h4>Late</h4>
              <p className="summary-value late">
                {records.filter(r => r.status === 'late').length}
              </p>
            </div>
          </div>

          <div className="attendance-percentage">
            <div className="percentage-label">Attendance Percentage</div>
            <div className="percentage-bar">
              <div
                className="percentage-fill"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <div className="percentage-text">{percentage}% Present</div>
          </div>

          {records.length > 0 ? (
            <DataTable
              columns={columns}
              data={records}
              striped={true}
              hoverable={true}
            />
          ) : (
            <Card className="empty-state">
              <p>No attendance records available.</p>
            </Card>
          )}
        </div>
      ),
    };
  });

  return (
    <div className="attendance-page">
      <div className="page-header">
        <h1>Attendance Records</h1>
        <p>View your class attendance</p>
      </div>

      {error && (
        <Card className="error-card">
          <p>{error}</p>
        </Card>
      )}

      {enrollments.length > 0 ? (
        <Card className="attendance-card">
          <Tabs tabs={tabs} activeTab={selectedEnrollment} onChange={setSelectedEnrollment} />
        </Card>
      ) : (
        <Card className="empty-state">
          <p>No enrolled courses. Enroll in a course to view attendance.</p>
        </Card>
      )}
    </div>
  );
};

export default AttendancePage;
