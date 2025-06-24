import api from './api';
import { handleResponse, handleApiError } from '../utils/apiUtils';

/**
 * @typedef {Object} FeeStructure
 * @property {string} id - Unique identifier for the fee structure
 * @property {string} name - Name of the fee structure
 * @property {string} description - Description of the fee structure
 * @property {string} academicYearId - ID of the academic year
 * @property {string} classId - ID of the class this fee structure applies to
 * @property {Array<FeeComponent>} components - List of fee components
 * @property {boolean} isActive - Whether the fee structure is active
 * @property {string} createdAt - ISO date string when the fee structure was created
 * @property {string} updatedAt - ISO date string when the fee structure was last updated
 */

/**
 * @typedef {Object} FeeComponent
 * @property {string} name - Name of the fee component
 * @property {string} description - Description of the fee component
 * @property {number} amount - Amount for this component
 * @property {string} frequency - Frequency of payment (one_time, monthly, termly, yearly)
 * @property {boolean} isTaxable - Whether this component is taxable
 */

/**
 * @typedef {Object} FeePayment
 * @property {string} id - Unique identifier for the payment
 * @property {string} studentId - ID of the student
 * @property {string} feeStructureId - ID of the fee structure
 * @property {number} amount - Amount paid
 * @property {string} paymentMethod - Method of payment
 * @property {string} transactionId - Transaction reference ID
 * @property {string} status - Payment status (pending, completed, failed, refunded)
 * @property {string} paymentDate - ISO date string when payment was made
 * @property {string} [receiptNumber] - Receipt number for the payment
 */

/**
 * @typedef {Object} FeeSummary
 * @property {number} totalAmount - Total fee amount
 * @property {number} paidAmount - Total amount paid
 * @property {number} balance - Remaining balance
 * @property {Date} lastPaymentDate - Date of last payment
 * @property {Array<{component: string, amount: number, paid: number, balance: number}>} breakdown - Breakdown by fee component
 */

/**
 * @typedef {Object} FeeFilters
 * @property {string} [academicYearId] - Filter by academic year
 * @property {string} [classId] - Filter by class
 * @property {string} [studentId] - Filter by student
 * @property {string} [status] - Filter by payment status
 * @property {string} [startDate] - Filter by start date (ISO string)
 * @property {string} [endDate] - Filter by end date (ISO string)
 * @property {number} [page=1] - Page number for pagination
 * @property {number} [limit=10] - Number of items per page
 */

const enhancedFeeService = {
  /**
   * Create a new fee structure
   * @param {Object} feeStructureData - The fee structure data
   * @param {string} feeStructureData.name - Name of the fee structure
   * @param {string} [feeStructureData.description] - Optional description
   * @param {string} feeStructureData.academicYearId - ID of the academic year
   * @param {string} feeStructureData.classId - ID of the class
   * @param {Array<FeeComponent>} feeStructureData.components - List of fee components
   * @param {boolean} [feeStructureData.isActive=true] - Whether the fee structure is active
   * @returns {Promise<FeeStructure>} The created fee structure
   */
  createFeeStructure: async (feeStructureData) => {
    try {
      const response = await api.post('/fees/structures', feeStructureData);
      return handleResponse(response);
    } catch (error) {
      throw handleApiError(error, {
        showError: true,
        defaultMessage: 'Failed to create fee structure'
      });
    }
  },

  /**
   * Get all fee structures with optional filters
   * @param {FeeFilters} [filters={}] - Filter criteria
   * @returns {Promise<{data: FeeStructure[], pagination: Object}>} List of fee structures and pagination info
   */
  getFeeStructures: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/fees/structures?${queryParams}`);
      return handleResponse(response);
    } catch (error) {
      throw handleApiError(error, {
        showError: true,
        defaultMessage: 'Failed to fetch fee structures'
      });
    }
  },

  /**
   * Get a specific fee structure by ID
   * @param {string} id - The ID of the fee structure to retrieve
   * @returns {Promise<FeeStructure>} The requested fee structure
   */
  getFeeStructureById: async (id) => {
    try {
      const response = await api.get(`/fees/structures/${id}`);
      return handleResponse(response);
    } catch (error) {
      throw handleApiError(error, {
        showError: true,
        defaultMessage: `Failed to fetch fee structure with ID: ${id}`
      });
    }
  },

  /**
   * Update a fee structure
   * @param {string} id - The ID of the fee structure to update
   * @param {Object} feeStructureData - The updated fee structure data
   * @returns {Promise<FeeStructure>} The updated fee structure
   */
  updateFeeStructure: async (id, feeStructureData) => {
    try {
      const response = await api.put(`/fees/structures/${id}`, feeStructureData);
      return handleResponse(response);
    } catch (error) {
      throw handleApiError(error, {
        showError: true,
        defaultMessage: `Failed to update fee structure with ID: ${id}`
      });
    }
  },

  /**
   * Delete a fee structure
   * @param {string} id - The ID of the fee structure to delete
   * @returns {Promise<{success: boolean, message: string}>} Success status and message
   */
  deleteFeeStructure: async (id) => {
    try {
      const response = await api.delete(`/fees/structures/${id}`);
      return handleResponse(response);
    } catch (error) {
      throw handleApiError(error, {
        showError: true,
        defaultMessage: `Failed to delete fee structure with ID: ${id}`
      });
    }
  },

  /**
   * Record a new fee payment
   * @param {Object} paymentData - The payment data
   * @param {string} paymentData.studentId - ID of the student
   * @param {string} paymentData.feeStructureId - ID of the fee structure
   * @param {number} paymentData.amount - Amount being paid
   * @param {string} paymentData.paymentMethod - Method of payment
   * @param {string} paymentData.transactionId - Transaction reference ID
   * @param {string} [paymentData.receiptNumber] - Optional receipt number
   * @returns {Promise<FeePayment>} The recorded payment
   */
  createPayment: async (paymentData) => {
    try {
      const response = await api.post('/fees/payments', paymentData);
      return handleResponse(response);
    } catch (error) {
      throw handleApiError(error, {
        showError: true,
        defaultMessage: 'Failed to record payment'
      });
    }
  },

  /**
   * Get fee payments with optional filters
   * @param {FeeFilters} [filters={}] - Filter criteria
   * @returns {Promise<{data: FeePayment[], pagination: Object}>} List of payments and pagination info
   */
  getPayments: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/fees/payments?${queryParams}`);
      return handleResponse(response);
    } catch (error) {
      throw handleApiError(error, {
        showError: true,
        defaultMessage: 'Failed to fetch payments'
      });
    }
  },

  /**
   * Get a specific payment by ID
   * @param {string} id - The ID of the payment to retrieve
   * @returns {Promise<FeePayment>} The requested payment
   */
  getPaymentById: async (id) => {
    try {
      const response = await api.get(`/fees/payments/${id}`);
      return handleResponse(response);
    } catch (error) {
      throw handleApiError(error, {
        showError: true,
        defaultMessage: `Failed to fetch payment with ID: ${id}`
      });
    }
  },

  /**
   * Get fee summary for a student
   * @param {string} studentId - The ID of the student
   * @returns {Promise<FeeSummary>} Fee summary for the student
   */
  getStudentFeeSummary: async (studentId) => {
    try {
      const response = await api.get(`/fees/students/${studentId}/summary`);
      return handleResponse(response);
    } catch (error) {
      throw handleApiError(error, {
        showError: true,
        defaultMessage: `Failed to fetch fee summary for student: ${studentId}`
      });
    }
  },

  /**
   * Get fee transactions for a student
   * @param {string} studentId - The ID of the student
   * @param {Object} [filters={}] - Additional filters
   * @param {string} [filters.startDate] - Filter by start date (ISO string)
   * @param {string} [filters.endDate] - Filter by end date (ISO string)
   * @param {number} [filters.page=1] - Page number for pagination
   * @param {number} [filters.limit=10] - Number of items per page
   * @returns {Promise<{data: FeePayment[], pagination: Object}>} List of transactions and pagination info
   */
  getStudentFeeTransactions: async (studentId, filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/fees/students/${studentId}/transactions?${queryParams}`);
      return handleResponse(response);
    } catch (error) {
      throw handleApiError(error, {
        showError: true,
        defaultMessage: `Failed to fetch transactions for student: ${studentId}`
      });
    }
  },

  /**
   * Generate a fee report
   * @param {Object} [filters={}] - Filter criteria
   * @param {string} [filters.academicYearId] - Filter by academic year
   * @param {string} [filters.classId] - Filter by class
   * @param {string} [filters.startDate] - Filter by start date (ISO string)
   * @param {string} [filters.endDate] - Filter by end date (ISO string)
   * @returns {Promise<Blob>} The generated report file as a Blob
   */
  generateFeeReport: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/fees/reports?${queryParams}`, {
        responseType: 'blob'
      });
      return handleResponse(response);
    } catch (error) {
      throw handleApiError(error, {
        showError: true,
        defaultMessage: 'Failed to generate fee report'
      });
    }
  },

  /**
   * Get available payment methods
   * @returns {Promise<Array<{id: string, name: string, code: string}>>} List of payment methods
   */
  getPaymentMethods: async () => {
    try {
      const response = await api.get('/fees/payment-methods');
      return handleResponse(response);
    } catch (error) {
      throw handleApiError(error, {
        showError: true,
        defaultMessage: 'Failed to fetch payment methods'
      });
    }
  },
};

export default enhancedFeeService;
