import api from './api';

export const communicationService = {
  // Message operations
  sendMessage: async (messageData) => {
    try {
      const response = await api.post('/messages', messageData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getMessages: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/messages?${queryParams}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getMessageById: async (id) => {
    try {
      const response = await api.get(`/messages/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateMessage: async (id, messageData) => {
    try {
      const response = await api.put(`/messages/${id}`, messageData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteMessage: async (id) => {
    try {
      const response = await api.delete(`/messages/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Announcement operations
  createAnnouncement: async (announcementData) => {
    try {
      const response = await api.post('/announcements', announcementData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAnnouncements: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/announcements?${queryParams}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAnnouncementById: async (id) => {
    try {
      const response = await api.get(`/announcements/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateAnnouncement: async (id, announcementData) => {
    try {
      const response = await api.put(`/announcements/${id}`, announcementData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteAnnouncement: async (id) => {
    try {
      const response = await api.delete(`/announcements/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Notification operations
  getNotifications: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/notifications?${queryParams}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  markNotificationAsRead: async (id) => {
    try {
      const response = await api.patch(`/notifications/${id}/read`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  markAllNotificationsAsRead: async () => {
    try {
      const response = await api.patch('/notifications/mark-all-read');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Email operations
  sendEmail: async (emailData) => {
    try {
      const response = await api.post('/communications/emails', emailData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Export all services as a single object
export default {
  ...communicationService,
};

// Also export individual services for direct import
export const messageService = {
  sendMessage: communicationService.sendMessage,
  getMessages: communicationService.getMessages,
  getMessageById: communicationService.getMessageById,
  updateMessage: communicationService.updateMessage,
  deleteMessage: communicationService.deleteMessage,
};

export const announcementService = {
  createAnnouncement: communicationService.createAnnouncement,
  getAnnouncements: communicationService.getAnnouncements,
  getAnnouncementById: communicationService.getAnnouncementById,
  updateAnnouncement: communicationService.updateAnnouncement,
  deleteAnnouncement: communicationService.deleteAnnouncement,
};

export const notificationService = {
  getNotifications: communicationService.getNotifications,
  markNotificationAsRead: communicationService.markNotificationAsRead,
  markAllNotificationsAsRead: communicationService.markAllNotificationsAsRead,
};

export const emailService = {
  sendEmail: communicationService.sendEmail,
};
