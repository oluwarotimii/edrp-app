import { Stack } from 'expo-router';

export default function FeesLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Fee Management',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="types" 
        options={{ 
          title: 'Fee Types',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="student-fees" 
        options={{ 
          title: 'Student Fees',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="payments" 
        options={{ 
          title: 'Payments',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="reports" 
        options={{ 
          title: 'Fee Reports',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
        }} 
      />
    </Stack>
  );
}