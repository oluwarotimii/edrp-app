import { Stack } from 'expo-router';

export default function AttendanceLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Attendance',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="take" 
        options={{ 
          title: 'Take Attendance',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="location-verification" 
        options={{ 
          title: 'Location Check-in',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="records" 
        options={{ 
          title: 'Attendance Records',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="student-stats" 
        options={{ 
          title: 'Student Statistics',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="class-stats" 
        options={{ 
          title: 'Class Statistics',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="teacher-stats" 
        options={{ 
          title: 'Teacher Statistics',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="locations" 
        options={{ 
          title: 'Location Management',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
        }} 
      />
    </Stack>
  );
}