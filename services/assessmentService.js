import api from './api';
import { handleResponse, handleApiError } from '../utils/apiUtils';

/**
 * @typedef {Object} Assessment
 * @property {string} id - Unique identifier for the assessment
 * @property {string} title - Title of the assessment
 * @property {string} description - Description of the assessment
 * @property {string} type - Type of assessment (exam, quiz, assignment, etc.)
 * @property {string} subjectId - ID of the subject this assessment belongs to
 * @property {string} classId - ID of the class this assessment is for
 * @property {string} dueDate - ISO date string when the assessment is due
 * @property {number} maxScore - Maximum possible score for this assessment
 * @property {string} status - Status of the assessment (draft, published, completed)
 * @property {string} createdAt - ISO date string when the assessment was created
 * @property {string} updatedAt - ISO date string when the assessment was last updated
 */

/**
 * @typedef {Object} Grade
 * @property {string} id - Unique identifier for the grade
 * @property {string} assessmentId - ID of the assessment
 * @property {string} studentId - ID of the student
 * @property {number} score - Numeric score
 * @property {string} [feedback] - Optional feedback for the student
 * @property {string} gradedBy - ID of the teacher who graded this
 * @property {string} [gradedAt] - ISO date string when the grade was given
 */

/**
 * @typedef {Object} AssessmentFilters
 * @property {string} [classId] - Filter by class ID
 * @property {string} [subjectId] - Filter by subject ID
 * @property {string} [type] - Filter by assessment type
 * @property {string} [status] - Filter by status (draft, published, completed)
 * @property {string} [startDate] - Filter by start date (ISO string)
 * @property {string} [endDate] - Filter by end date (ISO string)
 * @property {number} [page=1] - Page number for pagination
 * @property {number} [limit=10] - Number of items per page
 */

const assessmentService = {
  /**
   * Create a new assessment
   * @param {Object} assessmentData - The assessment data
   * @param {string} assessmentData.title - Title of the assessment
   * @param {string} [assessmentData.description] - Description of the assessment
   * @param {string} assessmentData.type - Type of assessment
   * @param {string} assessmentData.subjectId - ID of the subject
   * @param {string} assessmentData.classId - ID of the class
   * @param {string} assessmentData.dueDate - ISO date string
   * @param {number} assessmentData.maxScore - Maximum possible score
   * @returns {Promise<Assessment>} The created assessment
   */
  createAssessment: async (assessmentData) => {
    try {
      const response = await api.post('/assessments', assessmentData);
      return handleResponse(response);
    } catch (error) {
      throw handleApiError(error, {
        showError: true,
        defaultMessage: 'Failed to create assessment'
      });
    }
  },

  /**
   * Get a list of assessments with optional filters
   * @param {AssessmentFilters} [filters={}] - Filters for the query
   * @returns {Promise<{data: Assessment[], pagination: Object}>} List of assessments and pagination info
   */
  getAssessments: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/assessments?${queryParams}`);
      return handleResponse(response);
    } catch (error) {
      throw handleApiError(error, {
        showError: true,
        defaultMessage: 'Failed to fetch assessments'
      });
    }
  },

  /**
   * Get a single assessment by ID
   * @param {string} id - The ID of the assessment to retrieve
   * @returns {Promise<Assessment>} The requested assessment
   */
  getAssessmentById: async (id) => {
    try {
      const response = await api.get(`/assessments/${id}`);
      return handleResponse(response);
    } catch (error) {
      throw handleApiError(error, {
        showError: true,
        defaultMessage: `Failed to fetch assessment with ID: ${id}`
      });
    }
  },

  /**
   * Update an existing assessment
   * @param {string} id - The ID of the assessment to update
   * @param {Object} assessmentData - The updated assessment data
   * @returns {Promise<Assessment>} The updated assessment
   */
  updateAssessment: async (id, assessmentData) => {
    try {
      const response = await api.put(`/assessments/${id}`, assessmentData);
      return handleResponse(response);
    } catch (error) {
      throw handleApiError(error, {
        showError: true,
        defaultMessage: `Failed to update assessment with ID: ${id}`
      });
    }
  },

  /**
   * Delete an assessment
   * @param {string} id - The ID of the assessment to delete
   * @returns {Promise<{success: boolean, message: string}>} Success status and message
   */
  deleteAssessment: async (id) => {
    try {
      const response = await api.delete(`/assessments/${id}`);
      return handleResponse(response);
    } catch (error) {
      throw handleApiError(error, {
        showError: true,
        defaultMessage: `Failed to delete assessment with ID: ${id}`
      });
    }
  },

  /**
   * Submit grades for an assessment
   * @param {string} assessmentId - The ID of the assessment
   * @param {Array<{studentId: string, score: number, feedback?: string}>} grades - Array of grade objects
   * @returns {Promise<{success: boolean, message: string, data: Grade[]}>} Success status and created/updated grades
   */
  submitGrades: async (assessmentId, grades) => {
    try {
      const response = await api.post(`/assessments/${assessmentId}/grades`, { grades });
      return handleResponse(response);
    } catch (error) {
      throw handleApiError(error, {
        showError: true,
        defaultMessage: 'Failed to submit grades'
      });
    }
  },

  /**
   * Get grades for an assessment
   * @param {string} assessmentId - The ID of the assessment
   * @returns {Promise<Grade[]>} List of grades for the assessment
   */
  getGrades: async (assessmentId) => {
    try {
      const response = await api.get(`/assessments/${assessmentId}/grades`);
      return handleResponse(response);
    } catch (error) {
      throw handleApiError(error, {
        showError: true,
        defaultMessage: `Failed to get grades for assessment: ${assessmentId}`
      });
    }
  },

  /**
   * Update a specific grade
   * @param {string} gradeId - The ID of the grade to update
   * @param {Object} gradeData - The updated grade data
   * @param {number} [gradeData.score] - Updated score
   * @param {string} [gradeData.feedback] - Updated feedback
   * @returns {Promise<Grade>} The updated grade
   */
  updateGrade: async (gradeId, gradeData) => {
    try {
      const response = await api.put(`/grades/${gradeId}`, gradeData);
      return handleResponse(response);
    } catch (error) {
      throw handleApiError(error, {
        showError: true,
        defaultMessage: `Failed to update grade with ID: ${gradeId}`
      });
    }
  },

  /**
   * Get available assessment types
   * @returns {Promise<Array<{id: string, name: string, description: string}>>} List of assessment types
   */
  getAssessmentTypes: async () => {
    try {
      const response = await api.get('/assessments/types');
      return handleResponse(response);
    } catch (error) {
      throw handleApiError(error, {
        showError: true,
        defaultMessage: 'Failed to fetch assessment types'
      });
    }
  },

  /**
   * Get statistics for an assessment
   * @param {string} assessmentId - The ID of the assessment
   * @returns {Promise<{
   *   average: number,
   *   highest: number,
   *   lowest: number,
   *   totalStudents: number,
   *   graded: number,
   *   gradeDistribution: Record<string, number>
   * }>} Assessment statistics
   */
  getAssessmentStats: async (assessmentId) => {
    try {
      const response = await api.get(`/assessments/${assessmentId}/stats`);
      return handleResponse(response);
    } catch (error) {
      throw handleApiError(error, {
        showError: true,
        defaultMessage: `Failed to get statistics for assessment: ${assessmentId}`
      });
    }
  }
};

export default assessmentService;
