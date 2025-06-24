import api from './api';

export const attendanceService = {
  // Mark attendance for multiple students
  markAttendance: async (attendanceData) => {
    try {
      const response = await api.post('/attendance', attendanceData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get attendance records with filters
  getAttendance: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/attendance?${queryParams}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update attendance record
  updateAttendance: async (id, attendanceData) => {
    try {
      const response = await api.put(`/attendance/${id}`, attendanceData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get attendance for a specific student
  getStudentAttendance: async (studentId, filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/attendance/student/${studentId}?${queryParams}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get class attendance for a specific date
  getClassAttendance: async (classId, date) => {
    try {
      const response = await api.get(`/attendance/class/${classId}?date=${date}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get attendance statistics
  getAttendanceStats: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/attendance/stats?${queryParams}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
