import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { 
  Settings, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Clock, 
  Users,
  BookOpen,
  DollarSign,
  FileText
} from 'lucide-react-native';

export default function SchoolSettingsScreen() {
  const { schoolId } = useLocalSearchParams();
  const [settings, setSettings] = useState({
    notifications: true,
    autoApproval: false,
    publicProfile: true,
    attendanceReminders: true,
    feeReminders: true,
    parentAccess: true,
    studentSelfService: false,
    multiLanguage: false,
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const settingSections = [
    {
      title: 'General Settings',
      icon: Settings,
      items: [
        {
          key: 'notifications',
          title: 'Push Notifications',
          description: 'Enable push notifications for important updates',
          value: settings.notifications,
        },
        {
          key: 'publicProfile',
          title: 'Public School Profile',
          description: 'Allow public access to basic school information',
          value: settings.publicProfile,
        },
        {
          key: 'multiLanguage',
          title: 'Multi-language Support',
          description: 'Enable multiple language options',
          value: settings.multiLanguage,
        },
      ],
    },
    {
      title: 'User Management',
      icon: Users,
      items: [
        {
          key: 'autoApproval',
          title: 'Auto-approve Users',
          description: 'Automatically approve new user registrations',
          value: settings.autoApproval,
        },
        {
          key: 'parentAccess',
          title: 'Parent Portal Access',
          description: 'Allow parents to access student information',
          value: settings.parentAccess,
        },
        {
          key: 'studentSelfService',
          title: 'Student Self-Service',
          description: 'Allow students to update their own information',
          value: settings.studentSelfService,
        },
      ],
    },
    {
      title: 'Notifications & Reminders',
      icon: Bell,
      items: [
        {
          key: 'attendanceReminders',
          title: 'Attendance Reminders',
          description: 'Send reminders for attendance taking',
          value: settings.attendanceReminders,
        },
        {
          key: 'feeReminders',
          title: 'Fee Payment Reminders',
          description: 'Send reminders for pending fee payments',
          value: settings.feeReminders,
        },
      ],
    },
  ];

  const quickSettings = [
    { title: 'School Policies', icon: FileText, action: () => router.push('/(authenticated)/schools/policies') },
    { title: 'App Configuration', icon: Settings, action: () => router.push('/(authenticated)/schools/app-config') },
    { title: 'School Branding', icon: Palette, action: () => router.push('/(authenticated)/schools/branding') },
    { title: 'Academic Calendar', icon: Clock, action: () => Alert.alert('Calendar', 'Navigate to academic calendar') },
  ];

  const handleSaveSettings = () => {
    Alert.alert('Success', 'Settings saved successfully');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>School Settings</Text>
        <Text style={styles.subtitle}>Configure school preferences and policies</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Settings</Text>
          <View style={styles.quickSettingsGrid}>
            {quickSettings.map((setting, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickSettingCard}
                onPress={setting.action}
              >
                <setting.icon size={24} color="#007AFF" />
                <Text style={styles.quickSettingText}>{setting.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <View style={styles.sectionHeader}>
              <section.icon size={20} color="#007AFF" />
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            <View style={styles.settingsCard}>
              {section.items.map((item, itemIndex) => (
                <View key={item.key} style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingDescription}>{item.description}</Text>
                  </View>
                  <Switch
                    value={item.value}
                    onValueChange={(value) => handleSettingChange(item.key, value)}
                    trackColor={{ false: '#e0e0e0', true: '#007AFF' }}
                    thumbColor={item.value ? '#fff' : '#f4f3f4'}
                  />
                </View>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveSettings}>
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    paddingBottom: 30,
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
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  quickSettingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickSettingCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickSettingText: {
    fontSize: 12,
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
  settingsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});