import api from './api';

export const studentService = {
  // Student operations
  getStudents: async (schoolId, params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await api.get(`/schools/${schoolId}/students?${queryParams}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getStudentById: async (id) => {
    try {
      const response = await api.get(`/students/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createStudent: async (studentData) => {
    try {
      const response = await api.post('/students', studentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateStudent: async (id, studentData) => {
    try {
      const response = await api.put(`/students/${id}`, studentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteStudent: async (id) => {
    try {
      const response = await api.delete(`/students/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Student academic records
  getAcademicRecords: async (studentId) => {
    try {
      const response = await api.get(`/students/${studentId}/academic-records`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Student attendance
  getStudentAttendance: async (studentId, params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await api.get(`/students/${studentId}/attendance?${queryParams}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Student assessments
  getStudentAssessments: async (studentId, params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await api.get(`/students/${studentId}/assessments?${queryParams}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
