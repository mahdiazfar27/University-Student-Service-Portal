import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { resultAPI, semesterAPI } from '../api/apiClient';
import { Card, DataTable, Loading, Badge, Tabs } from '../components';
import { handleAPIError, formatErrorMessage } from '../utils/apiErrors';
import './GradesPage.css';

/**
 * Grades Page
 * 
 * Display student grades and academic performance
 */
const GradesPage = () => {
  const { user } = useAuth();
  const { showError } = useToast();

  const [results, setResults] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get all semesters
      const semesterRes = await semesterAPI.getSemesters();
      setSemesters(semesterRes.data.data || []);
      
      // Set first semester as default
      if (semesterRes.data.data && semesterRes.data.data.length > 0) {
        setSelectedSemester(semesterRes.data.data[0].id);
      }

      // Get student results
      const resultsRes = await resultAPI.getStudentResults(user.id);
      setResults(resultsRes.data.data || []);
    } catch (err) {
      const errorInfo = handleAPIError(err);
      setError(errorInfo.message);
      showError(errorInfo.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateGPA = (semesterResults) => {
    if (!semesterResults || semesterResults.length === 0) return 0;
    const validResults = semesterResults.filter(r => r.marks_obtained !== null);
    if (validResults.length === 0) return 0;
    const total = validResults.reduce((sum, r) => sum + (r.marks_obtained || 0), 0);
    return (total / validResults.length).toFixed(2);
  };

  const getGradeColor = (marks) => {
    if (marks >= 90) return 'success';
    if (marks >= 80) return 'info';
    if (marks >= 70) return 'warning';
    return 'danger';
  };

  const getGradeLetter = (marks) => {
    if (marks >= 90) return 'A';
    if (marks >= 80) return 'B';
    if (marks >= 70) return 'C';
    if (marks >= 60) return 'D';
    return 'F';
  };

  const semesterResults = selectedSemester
    ? results.filter(r => r.semester_id === selectedSemester)
    : results;

  const columns = [
    { key: 'course_code', label: 'Course Code' },
    { key: 'course_name', label: 'Course Name' },
    {
      key: 'marks_obtained',
      label: 'Marks',
      render: (value) => value !== null ? `${value}/100` : 'N/A',
    },
    {
      key: 'marks_obtained',
      label: 'Grade',
      render: (value) => {
        if (value === null) return 'N/A';
        return (
          <Badge variant={getGradeColor(value)}>
            {getGradeLetter(value)}
          </Badge>
        );
      },
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Badge variant={value === 'passed' ? 'success' : 'danger'}>
          {value === 'passed' ? 'Passed' : 'Failed'}
        </Badge>
      ),
    },
  ];

  if (loading) return <Loading fullpage message="Loading grades..." />;

  const tabs = semesters.map(semester => ({
    id: semester.id,
    label: semester.name,
    content: (
      <div className="semester-grades">
        <div className="gpa-overview">
          <div className="gpa-stat">
            <p className="gpa-label">Semester GPA</p>
            <p className="gpa-value">{calculateGPA(semesterResults)}</p>
          </div>
          <div className="gpa-stat">
            <p className="gpa-label">Courses</p>
            <p className="gpa-value">{semesterResults.length}</p>
          </div>
          <div className="gpa-stat">
            <p className="gpa-label">Passed</p>
            <p className="gpa-value">
              {semesterResults.filter(r => r.status === 'passed').length}
            </p>
          </div>
        </div>

        {semesterResults.length > 0 ? (
          <DataTable
            columns={columns}
            data={semesterResults}
            striped={true}
            hoverable={true}
          />
        ) : (
          <Card className="empty-state">
            <p>No grades available for this semester.</p>
          </Card>
        )}
      </div>
    ),
  }));

  return (
    <div className="grades-page">
      <div className="page-header">
        <h1>Academic Grades</h1>
        <p>View your course grades and GPA</p>
      </div>

      {error && (
        <Card className="error-card">
          <p>{error}</p>
        </Card>
      )}

      {semesters.length > 0 ? (
        <Card className="grades-card">
          <Tabs tabs={tabs} activeTab={selectedSemester} onChange={setSelectedSemester} />
        </Card>
      ) : (
        <Card className="empty-state">
          <p>No grade information available.</p>
        </Card>
      )}

      {results.length > 0 && (
        <Card title="Overall Statistics" className="stats-card">
          <div className="overall-stats">
            <div className="stat-box">
              <h4>Overall GPA</h4>
              <p className="stat-value">{calculateGPA(results)}</p>
            </div>
            <div className="stat-box">
              <h4>Total Courses</h4>
              <p className="stat-value">{results.length}</p>
            </div>
            <div className="stat-box">
              <h4>Passed Courses</h4>
              <p className="stat-value">{results.filter(r => r.status === 'passed').length}</p>
            </div>
            <div className="stat-box">
              <h4>Failed Courses</h4>
              <p className="stat-value">{results.filter(r => r.status === 'failed').length}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default GradesPage;
