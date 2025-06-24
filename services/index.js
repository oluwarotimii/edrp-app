// Core services
export { default as api } from './api';

// Authentication & User services
export * as authService from './authService';

// School services
export * as schoolService from './schoolService';

// Student services
export * as studentService from './studentService';

// Teacher services
export * as teacherService from './teacherService';

// Attendance services
export * as attendanceService from './attendanceService';

// Assessment services
export * as assessmentService from './assessmentService';

// Fee services
export * as feeService from './feeService';

// Communication services
export * as communicationService from './communicationService';


// Individual service exports for direct imports
// Message services
export { messageService } from './communicationService';

// Announcement services
export { announcementService } from './communicationService';

// Notification services
export { notificationService } from './communicationService';

// Email services
export { emailService } from './communicationService';
