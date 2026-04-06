import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  register: (data) =>
    api.post('/auth/register', data),
  me: () =>
    api.get('/auth/me'),
  logout: () =>
    api.post('/auth/logout'),
  refresh: () =>
    api.post('/auth/refresh'),
};

// Student API
export const studentAPI = {
  getStudents: (page = 1, perPage = 15) =>
    api.get('/students', { params: { page, per_page: perPage } }),
  getStudent: (id) =>
    api.get(`/students/${id}`),
  getStudentProfile: (id) =>
    api.get(`/students/${id}/profile`),
  updateStudent: (id, data) =>
    api.put(`/students/${id}`, data),
};

// Enrollment API
export const enrollmentAPI = {
  getEnrollments: (params = {}) =>
    api.get('/enrollments', { params }),
  getStudentEnrollments: (studentId) =>
    api.get(`/enrollments/student/${studentId}`),
  createEnrollment: (data) =>
    api.post('/enrollments', data),
  updateEnrollment: (id, data) =>
    api.put(`/enrollments/${id}`, data),
  deleteEnrollment: (id) =>
    api.delete(`/enrollments/${id}`),
};

// Course API
export const courseAPI = {
  getCourses: (params = {}) =>
    api.get('/courses', { params }),
  getCourse: (id) =>
    api.get(`/courses/${id}`),
  getCoursesByDepartment: (departmentId) =>
    api.get(`/courses/department/${departmentId}`),
};

// Semester API
export const semesterAPI = {
  getSemesters: () =>
    api.get('/semesters'),
  getCurrentSemester: () =>
    api.get('/semesters/current'),
  getSemester: (id) =>
    api.get(`/semesters/${id}`),
};

// Result API (Grades)
export const resultAPI = {
  getResults: (params = {}) =>
    api.get('/results', { params }),
  getStudentResults: (studentId) =>
    api.get(`/results/student/${studentId}`),
  getResult: (id) =>
    api.get(`/results/${id}`),
};

// Attendance API
export const attendanceAPI = {
  getStudentCourseAttendance: (studentId, courseOfferingId) =>
    api.get(`/attendance/students/${studentId}/courses/${courseOfferingId}`),
  getStudentOverallAttendance: (studentId) =>
    api.get(`/attendance/students/${studentId}/overall`),
};

// Payment API
export const paymentAPI = {
  getStudentPayments: (studentId, params = {}) =>
    api.get(`/payments/students/${studentId}`, { params }),
};

// Department API
export const departmentAPI = {
  getDepartments: () =>
    api.get('/departments'),
  getDepartment: (id) =>
    api.get(`/departments/${id}`),
};

export default api;
