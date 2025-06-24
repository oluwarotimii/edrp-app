import { Stack } from 'expo-router';

export default function ApplicationsLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Applications',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="[id]" 
        options={{ 
          title: 'Application Details',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
        }} 
      />
    </Stack>
  );
}