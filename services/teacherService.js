import api from './api';

export const teacherService = {
  // Teacher operations
  getTeachers: async (schoolId, params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await api.get(`/schools/${schoolId}/teachers?${queryParams}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTeacherById: async (id) => {
    try {
      const response = await api.get(`/teachers/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createTeacher: async (teacherData) => {
    try {
      const response = await api.post('/teachers', teacherData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateTeacher: async (id, teacherData) => {
    try {
      const response = await api.put(`/teachers/${id}`, teacherData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteTeacher: async (id) => {
    try {
      const response = await api.delete(`/teachers/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Teacher's classes
  getTeacherClasses: async (teacherId, params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await api.get(`/teachers/${teacherId}/classes?${queryParams}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Teacher's schedule
  getTeacherSchedule: async (teacherId, params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await api.get(`/teachers/${teacherId}/schedule?${queryParams}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
