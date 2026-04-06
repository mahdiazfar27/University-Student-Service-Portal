import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { courseAPI, enrollmentAPI, semesterAPI } from '../api/apiClient';
import { Button, Card, DataTable, Loading, Badge, Pagination } from '../components';
import { handleAPIError } from '../utils/apiErrors';
import './CoursesPage.css';

/**
 * Courses Page
 * 
 * Display available courses and manage course enrollments
 */
const CoursesPage = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [currentSemester, setCurrentSemester] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [enrollingCourseId, setEnrollingCourseId] = useState(null);

  // Load courses and enrollments
  useEffect(() => {
    loadData();
  }, [currentPage]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get current semester
      const semesterRes = await semesterAPI.getCurrentSemester();
      setCurrentSemester(semesterRes.data.data);

      // Get available courses for current semester
      const coursesRes = await courseAPI.getCourses({
        semester_id: semesterRes.data.data.id,
        page: currentPage,
        per_page: 10,
      });
      setCourses(coursesRes.data.data);
      setTotalPages(coursesRes.data.meta?.last_page || 1);

      // Get student's current enrollments
      const enrollRes = await enrollmentAPI.getStudentEnrollments(user.id);
      setEnrollments(enrollRes.data.data || []);
    } catch (err) {
      const errorInfo = handleAPIError(err);
      setError(errorInfo.message);
      showError(errorInfo.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      setEnrollingCourseId(courseId);
      
      await enrollmentAPI.createEnrollment({
        student_id: user.id,
        course_id: courseId,
        semester_id: currentSemester.id,
      });

      showSuccess('Enrolled successfully!');
      loadData();
    } catch (err) {
      const errorInfo = handleAPIError(err);
      showError(errorInfo.message);
    } finally {
      setEnrollingCourseId(null);
    }
  };

  const isEnrolled = (courseId) => {
    return enrollments.some(e => e.course_id === courseId && e.status === 'enrolled');
  };

  const columns = [
    { key: 'code', label: 'Code' },
    { key: 'name', label: 'Course Name' },
    {
      key: 'instructor_name',
      label: 'Instructor',
      render: (value) => value || 'TBA',
    },
    {
      key: 'credits',
      label: 'Credits',
      render: (value) => <Badge variant="info">{value}</Badge>,
    },
    {
      key: 'capacity',
      label: 'Capacity',
      render: (value, row) => (
        <p className="capacity-info">
          {row.enrolled_count || 0}/{value}
        </p>
      ),
    },
    {
      key: 'id',
      label: 'Action',
      render: (courseId) => (
        <Button
          variant={isEnrolled(courseId) ? 'secondary' : 'primary'}
          size="sm"
          onClick={() => handleEnroll(courseId)}
          disabled={isEnrolled(courseId) || enrollingCourseId === courseId}
          loading={enrollingCourseId === courseId}
        >
          {isEnrolled(courseId) ? 'Enrolled' : 'Enroll'}
        </Button>
      ),
    },
  ];

  if (loading) return <Loading fullpage message="Loading courses..." />;

  return (
    <div className="courses-page">
      <div className="page-header">
        <h1>Available Courses</h1>
        <p className="semester-info">
          Semester: {currentSemester?.name} ({currentSemester?.start_date} - {currentSemester?.end_date})
        </p>
      </div>

      {error && (
        <Card className="error-card">
          <p className="error-message">{error}</p>
          <Button onClick={loadData} variant="secondary">
            Retry
          </Button>
        </Card>
      )}

      {courses.length > 0 ? (
        <div className="courses-container">
          <DataTable
            columns={columns}
            data={courses}
            striped={true}
            hoverable={true}
          />
          
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      ) : (
        <Card className="empty-state">
          <p>No courses available for this semester.</p>
        </Card>
      )}

      {enrollments.length > 0 && (
        <Card title="Your Current Enrollments" className="enrollments-card">
          <div className="enrollment-list">
            {enrollments.map(enrollment => (
              <div key={enrollment.id} className="enrollment-item">
                <div className="enrollment-info">
                  <h4>{enrollment.course?.name}</h4>
                  <p>{enrollment.course?.code}</p>
                </div>
                <Badge variant="success">{enrollment.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default CoursesPage;
