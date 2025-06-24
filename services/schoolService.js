import api from './api';

export const schoolService = {
  // School CRUD operations
  getAllSchools: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await api.get(`/schools?${queryParams}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getSchoolById: async (id) => {
    try {
      const response = await api.get(`/schools/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createSchool: async (schoolData) => {
    try {
      const response = await api.post('/schools', schoolData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateSchool: async (id, schoolData) => {
    try {
      const response = await api.put(`/schools/${id}`, schoolData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteSchool: async (id) => {
    try {
      const response = await api.delete(`/schools/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // School statistics
  getSchoolStats: async (schoolId) => {
    try {
      const response = await api.get(`/schools/${schoolId}/stats`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
