// Mock data for all screens
export const mockSchools = [
  {
    id: 'school1',
    name: 'Demo Elementary School',
    address: '123 Education St, Learning City',
    phone: '+1-555-0123',
    email: 'admin@demoschool.edu',
    established: '2010',
    status: 'active',
    type: 'Elementary'
  },
  {
    id: 'school2',
    name: 'Tech High School',
    address: '456 Innovation Ave, Tech Valley',
    phone: '+1-555-0456',
    email: 'contact@techhs.edu',
    established: '2015',
    status: 'active',
    type: 'High School'
  }
];

export const mockStudents = [
  {
    id: 'student1',
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    student_id: 'STU001',
    class: 'Grade 5A',
    status: 'active',
    parent_name: 'Robert Johnson',
    parent_phone: '+1-555-1001',
    admission_date: '2023-09-01',
    date_of_birth: '2014-03-15'
  },
  {
    id: 'student2',
    name: 'Bob Smith',
    email: 'bob.smith@email.com',
    student_id: 'STU002',
    class: 'Grade 5B',
    status: 'active',
    parent_name: 'Sarah Smith',
    parent_phone: '+1-555-1002',
    admission_date: '2023-09-01',
    date_of_birth: '2014-07-22'
  },
  {
    id: 'student3',
    name: 'Carol Davis',
    email: 'carol.davis@email.com',
    student_id: 'STU003',
    class: 'Grade 4A',
    status: 'suspended',
    parent_name: 'Mike Davis',
    parent_phone: '+1-555-1003',
    admission_date: '2022-09-01',
    date_of_birth: '2015-01-10'
  }
];

export const mockTeachers = [
  {
    id: 'teacher1',
    name: 'Dr. Emma Wilson',
    email: 'emma.wilson@demoschool.edu',
    teacher_id: 'TCH001',
    subjects: ['Mathematics', 'Science'],
    classes: ['Grade 5A', 'Grade 5B'],
    status: 'active',
    phone: '+1-555-2001',
    hire_date: '2020-08-15'
  },
  {
    id: 'teacher2',
    name: 'Prof. James Brown',
    email: 'james.brown@demoschool.edu',
    teacher_id: 'TCH002',
    subjects: ['English', 'Literature'],
    classes: ['Grade 4A', 'Grade 4B'],
    status: 'active',
    phone: '+1-555-2002',
    hire_date: '2019-01-10'
  }
];

export const mockApplications = [
  {
    id: 'app1',
    student_name: 'David Miller',
    parent_name: 'Lisa Miller',
    parent_email: 'lisa.miller@email.com',
    parent_phone: '+1-555-3001',
    grade_applying: 'Grade 6',
    status: 'pending',
    application_date: '2024-01-15',
    documents_submitted: true
  },
  {
    id: 'app2',
    student_name: 'Eva Garcia',
    parent_name: 'Carlos Garcia',
    parent_email: 'carlos.garcia@email.com',
    parent_phone: '+1-555-3002',
    grade_applying: 'Grade 3',
    status: 'approved',
    application_date: '2024-01-10',
    documents_submitted: true
  }
];

export const mockUsers = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john.doe@demoschool.edu',
    role: 'admin',
    status: 'active',
    last_login: '2024-01-20 09:30:00',
    created_at: '2023-08-15'
  },
  {
    id: 'user2',
    name: 'Jane Smith',
    email: 'jane.smith@demoschool.edu',
    role: 'teacher',
    status: 'pending',
    last_login: null,
    created_at: '2024-01-18'
  }
];

export const mockClasses = [
  {
    id: 'class1',
    name: 'Grade 5A',
    teacher: 'Dr. Emma Wilson',
    student_count: 28,
    room: 'Room 201',
    schedule: 'Morning'
  },
  {
    id: 'class2',
    name: 'Grade 5B',
    teacher: 'Prof. James Brown',
    student_count: 25,
    room: 'Room 202',
    schedule: 'Morning'
  }
];

export const mockSubjects = [
  {
    id: 'subject1',
    name: 'Mathematics',
    code: 'MATH',
    description: 'Basic Mathematics for Elementary'
  },
  {
    id: 'subject2',
    name: 'English Language',
    code: 'ENG',
    description: 'English Language and Literature'
  },
  {
    id: 'subject3',
    name: 'Science',
    code: 'SCI',
    description: 'General Science'
  }
];

export const mockDepartments = [
  {
    id: 'dept1',
    name: 'Elementary Department',
    head: 'Dr. Emma Wilson',
    description: 'Grades K-5'
  },
  {
    id: 'dept2',
    name: 'Middle School Department',
    head: 'Prof. James Brown',
    description: 'Grades 6-8'
  }
];

export const mockAttendance = [
  {
    id: 'att1',
    student_id: 'student1',
    student_name: 'Alice Johnson',
    date: '2024-01-20',
    status: 'present',
    class: 'Grade 5A',
    subject: 'Mathematics'
  },
  {
    id: 'att2',
    student_id: 'student2',
    student_name: 'Bob Smith',
    date: '2024-01-20',
    status: 'absent',
    class: 'Grade 5B',
    subject: 'English'
  }
];

export const mockFees = [
  {
    id: 'fee1',
    student_id: 'student1',
    student_name: 'Alice Johnson',
    fee_type: 'Tuition',
    amount: 1500.00,
    due_date: '2024-02-01',
    status: 'paid',
    payment_date: '2024-01-25'
  },
  {
    id: 'fee2',
    student_id: 'student2',
    student_name: 'Bob Smith',
    fee_type: 'Tuition',
    amount: 1500.00,
    due_date: '2024-02-01',
    status: 'pending',
    payment_date: null
  }
];

export const mockMessages = [
  {
    id: 'msg1',
    sender: 'Dr. Emma Wilson',
    recipient: 'All Parents - Grade 5A',
    subject: 'Parent-Teacher Conference',
    message: 'Parent-teacher conferences are scheduled for next week...',
    date: '2024-01-20',
    status: 'sent'
  },
  {
    id: 'msg2',
    sender: 'Admin Office',
    recipient: 'All Staff',
    subject: 'Staff Meeting',
    message: 'Monthly staff meeting scheduled for Friday...',
    date: '2024-01-19',
    status: 'sent'
  }
];

export const mockAssessments = [
  {
    id: 'assess1',
    name: 'Math Quiz 1',
    subject: 'Mathematics',
    class: 'Grade 5A',
    date: '2024-01-25',
    total_marks: 50,
    type: 'quiz'
  },
  {
    id: 'assess2',
    name: 'English Essay',
    subject: 'English',
    class: 'Grade 5B',
    date: '2024-01-30',
    total_marks: 100,
    type: 'assignment'
  }
];

export const mockRoles = [
  {
    id: 'role1',
    name: 'School Administrator',
    description: 'Full access to school management',
    permissions_count: 45
  },
  {
    id: 'role2',
    name: 'Teacher',
    description: 'Classroom and student management',
    permissions_count: 25
  },
  {
    id: 'role3',
    name: 'Finance Officer',
    description: 'Fee and payment management',
    permissions_count: 15
  }
];

export const mockHappenings = [
  {
    id: 'event1',
    title: 'Science Fair',
    description: 'Annual science exhibition by students',
    date: '2024-02-15',
    category: 'Academic',
    status: 'upcoming'
  },
  {
    id: 'event2',
    title: 'Sports Day',
    description: 'Inter-house sports competition',
    date: '2024-03-01',
    category: 'Sports',
    status: 'upcoming'
  }
];

export const mockTimetable = [
  {
    id: 'tt1',
    class: 'Grade 5A',
    day: 'Monday',
    period: '1st Period',
    time: '08:00 - 08:45',
    subject: 'Mathematics',
    teacher: 'Dr. Emma Wilson',
    room: 'Room 201'
  },
  {
    id: 'tt2',
    class: 'Grade 5A',
    day: 'Monday',
    period: '2nd Period',
    time: '08:45 - 09:30',
    subject: 'English',
    teacher: 'Prof. James Brown',
    room: 'Room 201'
  }
];