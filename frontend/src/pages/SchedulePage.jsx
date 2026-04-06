import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useCustomHooks';
import { useToast } from '../context/ToastContext';
import { Card } from '../components';
import { Loading } from '../components';
import { Badge } from '../components';
import { Tabs } from '../components';
import { transformError } from '../utils/apiErrors';
import { formatTime } from '../utils/helpers';
import { getDayName } from '../utils/dateUtils';
import { API_BASE_URL } from '../config/config';
import axios from 'axios';
import './SchedulePage.css';

const SchedulePage = () => {
  const { user } = useAuth();
  const { showError } = useToast();

  const [loading, setLoading] = useState(true);
  const [schedules, setSchedules] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [activeSemester, setActiveSemester] = useState(null);

  useEffect(() => {
    fetchScheduleData();
  }, []);

  const fetchScheduleData = async () => {
    try {
      setLoading(true);

      // Fetch semesters and schedules
      const [semesterRes, scheduleRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/semester/list`),
        axios.get(`${API_BASE_URL}/student/schedule`),
      ]);

      if (semesterRes.data.success) {
        setSemesters(semesterRes.data.data);
        if (semesterRes.data.data.length > 0) {
          setActiveSemester(semesterRes.data.data[0].id);
        }
      }

      if (scheduleRes.data.success) {
        setSchedules(scheduleRes.data.data);
      }
    } catch (error) {
      const errorMessage = transformError(error);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const groupScheduleByDay = (data) => {
    const grouped = {};
    const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    data.forEach((schedule) => {
      const day = schedule.dayOfWeek || 'Unknown';
      if (!grouped[day]) {
        grouped[day] = [];
      }
      grouped[day].push(schedule);
    });

    // Sort by day order
    return Object.keys(grouped)
      .sort((a, b) => daysOrder.indexOf(a) - daysOrder.indexOf(b))
      .reduce((obj, key) => {
        obj[key] = grouped[key].sort((a, b) => {
          const timeA = a.startTime || '00:00';
          const timeB = b.startTime || '00:00';
          return timeA.localeCompare(timeB);
        });
        return obj;
      }, {});
  };

  const getCurrentWeekSchedule = () => {
    const today = new Date();
    const todayDay = getDayName(today);

    const filtered = schedules.filter((schedule) => {
      if (activeSemester && schedule.semesterId !== activeSemester) {
        return false;
      }
      return schedule.dayOfWeek === todayDay;
    });

    return filtered;
  };

  const getScheduleByDay = (day) => {
    return schedules
      .filter((schedule) => {
        if (activeSemester && schedule.semesterId !== activeSemester) {
          return false;
        }
        return schedule.dayOfWeek === day;
      })
      .sort((a, b) => (a.startTime || '00:00').localeCompare(b.startTime || '00:00'));
  };

  const groupedSchedules = groupScheduleByDay(
    schedules.filter((s) => activeSemester ? s.semesterId === activeSemester : true)
  );

  const semesterTabs = semesters.map((semester) => ({
    id: semester.id,
    label: semester.name || `Semester ${semester.semesterNumber}`,
  }));

  if (loading) {
    return <Loading fullpage />;
  }

  return (
    <div className="schedule-page">
      <div className="page-header">
        <h1>Class Schedule</h1>
        <p>View your weekly class schedule</p>
      </div>

      {/* Today's Classes */}
      <Card title="Today's Classes" className="today-card">
        {getCurrentWeekSchedule().length > 0 ? (
          <div className="today-schedule">
            {getCurrentWeekSchedule().map((schedule) => (
              <div key={schedule.id} className="schedule-item today">
                <div className="time-block">
                  <div className="time">
                    {formatTime(new Date(`2024-01-01 ${schedule.startTime}`))}
                  </div>
                </div>
                <div className="class-info">
                  <h4>{schedule.courseCode}</h4>
                  <p className="course-name">{schedule.courseName}</p>
                  <div className="details">
                    <span className="room">
                      📍 {schedule.room || 'TBA'}
                    </span>
                    <span className="instructor">
                      👨‍🏫 {schedule.instructorName || 'TBA'}
                    </span>
                  </div>
                </div>
                <div className="duration">
                  {formatTime(new Date(`2024-01-01 ${schedule.startTime}`))} -
                  {formatTime(new Date(`2024-01-01 ${schedule.endTime}`))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-message">No classes scheduled for today</p>
        )}
      </Card>

      {/* Semester Selector */}
      {semesterTabs.length > 1 && (
        <div className="semester-selector">
          <Tabs
            tabs={semesterTabs}
            activeTab={activeSemester}
            onTabChange={setActiveSemester}
            variant="pills"
          />
        </div>
      )}

      {/* Weekly Schedule */}
      <Card title="Weekly Schedule" className="weekly-card">
        {Object.keys(groupedSchedules).length > 0 ? (
          <div className="weekly-schedule">
            {Object.keys(groupedSchedules).map((day) => (
              <div key={day} className="day-section">
                <h3 className="day-header">{day}</h3>
                {groupedSchedules[day].length > 0 ? (
                  <div className="day-classes">
                    {groupedSchedules[day].map((schedule) => (
                      <div key={schedule.id} className="schedule-item">
                        <div className="time-block">
                          <div className="time">
                            {formatTime(new Date(`2024-01-01 ${schedule.startTime}`))}
                          </div>
                          <div className="duration-badge">
                            {schedule.duration || '1h'}
                          </div>
                        </div>
                        <div className="class-info">
                          <h4>{schedule.courseCode}</h4>
                          <p className="course-name">{schedule.courseName}</p>
                          <div className="details">
                            <span className="room">
                              📍 {schedule.room || 'TBA'}
                            </span>
                            <span className="instructor">
                              👨‍🏫 {schedule.instructorName || 'TBA'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-class">No classes on this day</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-message">No schedule available for this semester</p>
        )}
      </Card>

      {/* Schedule Legend */}
      <Card title="Schedule Information" className="info-card">
        <div className="legend">
          <div className="legend-item">
            <span className="legend-icon">📍</span>
            <span>Room/Location number</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">👨‍🏫</span>
            <span>Instructor name</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">🕐</span>
            <span>Class duration</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">📚</span>
            <span>Course code and name</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SchedulePage;
