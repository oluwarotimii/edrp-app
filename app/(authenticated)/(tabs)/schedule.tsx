import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Calendar, Clock, MapPin, User } from 'lucide-react-native';

export default function ScheduleScreen() {
  const [selectedDay, setSelectedDay] = useState('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const schedule = {
    Monday: [
      { time: '08:00 - 08:45', subject: 'Mathematics', class: 'Grade 5A', room: 'Room 201' },
      { time: '08:45 - 09:30', subject: 'English', class: 'Grade 5A', room: 'Room 201' },
      { time: '09:30 - 09:45', subject: 'Break', class: '', room: '' },
      { time: '09:45 - 10:30', subject: 'Science', class: 'Grade 5B', room: 'Room 202' },
      { time: '10:30 - 11:15', subject: 'Mathematics', class: 'Grade 5B', room: 'Room 202' },
      { time: '11:15 - 12:00', subject: 'Physical Education', class: 'Grade 4A', room: 'Gym' },
    ],
    Tuesday: [
      { time: '08:00 - 08:45', subject: 'Science', class: 'Grade 5A', room: 'Room 201' },
      { time: '08:45 - 09:30', subject: 'Mathematics', class: 'Grade 5A', room: 'Room 201' },
      { time: '09:30 - 09:45', subject: 'Break', class: '', room: '' },
      { time: '09:45 - 10:30', subject: 'English', class: 'Grade 5B', room: 'Room 202' },
      { time: '10:30 - 11:15', subject: 'Art', class: 'Grade 4A', room: 'Art Room' },
      { time: '11:15 - 12:00', subject: 'Music', class: 'Grade 4B', room: 'Music Room' },
    ],
    Wednesday: [
      { time: '08:00 - 08:45', subject: 'English', class: 'Grade 5A', room: 'Room 201' },
      { time: '08:45 - 09:30', subject: 'Science', class: 'Grade 5A', room: 'Room 201' },
      { time: '09:30 - 09:45', subject: 'Break', class: '', room: '' },
      { time: '09:45 - 10:30', subject: 'Mathematics', class: 'Grade 5B', room: 'Room 202' },
      { time: '10:30 - 11:15', subject: 'Social Studies', class: 'Grade 4A', room: 'Room 203' },
      { time: '11:15 - 12:00', subject: 'Computer Science', class: 'Grade 5A', room: 'Lab 1' },
    ],
    Thursday: [
      { time: '08:00 - 08:45', subject: 'Mathematics', class: 'Grade 5A', room: 'Room 201' },
      { time: '08:45 - 09:30', subject: 'Physical Education', class: 'Grade 5A', room: 'Gym' },
      { time: '09:30 - 09:45', subject: 'Break', class: '', room: '' },
      { time: '09:45 - 10:30', subject: 'Science', class: 'Grade 5B', room: 'Room 202' },
      { time: '10:30 - 11:15', subject: 'English', class: 'Grade 4A', room: 'Room 203' },
      { time: '11:15 - 12:00', subject: 'Art', class: 'Grade 4B', room: 'Art Room' },
    ],
    Friday: [
      { time: '08:00 - 08:45', subject: 'Science', class: 'Grade 5A', room: 'Room 201' },
      { time: '08:45 - 09:30', subject: 'English', class: 'Grade 5A', room: 'Room 201' },
      { time: '09:30 - 09:45', subject: 'Break', class: '', room: '' },
      { time: '09:45 - 10:30', subject: 'Mathematics', class: 'Grade 5B', room: 'Room 202' },
      { time: '10:30 - 11:15', subject: 'Music', class: 'Grade 4A', room: 'Music Room' },
      { time: '11:15 - 12:00', subject: 'Physical Education', class: 'Grade 4B', room: 'Gym' },
    ],
  };

  const currentSchedule = schedule[selectedDay as keyof typeof schedule] || [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Schedule</Text>
        <Text style={styles.subtitle}>Teaching Schedule & Classes</Text>
      </View>

      <View style={styles.daySelector}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {days.map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                selectedDay === day && styles.selectedDayButton
              ]}
              onPress={() => setSelectedDay(day)}
            >
              <Text style={[
                styles.dayButtonText,
                selectedDay === day && styles.selectedDayButtonText
              ]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.scheduleContainer}>
        {currentSchedule.map((item, index) => (
          <View key={index} style={styles.scheduleItem}>
            <View style={styles.timeContainer}>
              <Clock size={16} color="#007AFF" />
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
            
            {item.subject === 'Break' ? (
              <View style={styles.breakItem}>
                <Text style={styles.breakText}>Break Time</Text>
              </View>
            ) : (
              <View style={styles.classInfo}>
                <Text style={styles.subjectText}>{item.subject}</Text>
                <View style={styles.classDetails}>
                  <View style={styles.detailItem}>
                    <User size={14} color="#666" />
                    <Text style={styles.detailText}>{item.class}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <MapPin size={14} color="#666" />
                    <Text style={styles.detailText}>{item.room}</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.todayStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>6</Text>
          <Text style={styles.statLabel}>Classes Today</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>3</Text>
          <Text style={styles.statLabel}>Different Rooms</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>4</Text>
          <Text style={styles.statLabel}>Subjects</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  daySelector: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dayButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedDayButton: {
    backgroundColor: '#007AFF',
  },
  dayButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  selectedDayButtonText: {
    color: '#fff',
  },
  scheduleContainer: {
    flex: 1,
    padding: 20,
  },
  scheduleItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginLeft: 6,
  },
  breakItem: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  breakText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  classInfo: {
    flex: 1,
  },
  subjectText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  classDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  todayStats: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});