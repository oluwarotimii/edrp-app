import { Stack } from 'expo-router';

export default function TimetableLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Timetable',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
        }} 
      />
    </Stack>
  );
}