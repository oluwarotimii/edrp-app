import { Stack } from 'expo-router';

export default function StudentsLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Students',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="[id]" 
        options={{ 
          title: 'Student Details',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="create" 
        options={{ 
          title: 'Add Student',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="status" 
        options={{ 
          title: 'Manage Status',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="graduated" 
        options={{ 
          title: 'Graduated Students',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="withdrawn" 
        options={{ 
          title: 'Withdrawn Students',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="suspended" 
        options={{ 
          title: 'Suspended Students',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
        }} 
      />
    </Stack>
  );
}