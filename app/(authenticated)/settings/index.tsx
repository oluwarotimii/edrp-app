import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Settings, User, Bell, Shield, Palette, Database, Download, Upload, CircleHelp as HelpCircle, Info } from 'lucide-react-native';

export default function SettingsScreen() {
  const settingsCategories = [
    {
      title: 'Account Settings',
      items: [
        { title: 'Profile Settings', icon: User, route: '/(authenticated)/settings/profile' },
        { title: 'Notification Preferences', icon: Bell, route: '/(authenticated)/settings/notifications' },
        { title: 'Security Settings', icon: Shield, route: '/(authenticated)/settings/security' },
      ]
    },
    {
      title: 'Application Settings',
      items: [
        { title: 'Theme & Appearance', icon: Palette, route: '/(authenticated)/settings/theme' },
        { title: 'Data Management', icon: Database, route: '/(authenticated)/settings/data' },
        { title: 'Backup & Restore', icon: Download, route: '/(authenticated)/settings/backup' },
      ]
    },
    {
      title: 'Support & Information',
      items: [
        { title: 'Help & Support', icon: HelpCircle, route: '/(authenticated)/settings/help' },
        { title: 'About', icon: Info, route: '/(authenticated)/settings/about' },
      ]
    }
  ];

  const handleSettingPress = (route: string) => {
    if (route) {
      router.push(route as any);
    } else {
      Alert.alert('Coming Soon', 'This feature will be available in a future update');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Manage your preferences and account</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.overviewCard}>
          <Settings size={24} color="#007AFF" />
          <View style={styles.overviewContent}>
            <Text style={styles.overviewTitle}>Application Settings</Text>
            <Text style={styles.overviewText}>
              Customize your experience, manage your account, and configure 
              application preferences to suit your needs.
            </Text>
          </View>
        </View>

        {settingsCategories.map((category, categoryIndex) => (
          <View key={categoryIndex} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <View style={styles.settingsCard}>
              {category.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={styles.settingItem}
                  onPress={() => handleSettingPress(item.route)}
                >
                  <View style={styles.settingIcon}>
                    <item.icon size={20} color="#007AFF" />
                  </View>
                  <Text style={styles.settingTitle}>{item.title}</Text>
                  <Text style={styles.settingArrow}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.quickActions}>
          <Text style={styles.quickActionsTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => Alert.alert('Export Data', 'This would export your data')}
            >
              <Upload size={24} color="#34C759" />
              <Text style={styles.quickActionText}>Export Data</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => Alert.alert('Import Data', 'This would import data')}
            >
              <Download size={24} color="#FF9500" />
              <Text style={styles.quickActionText}>Import Data</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.appInfo}>
          <Text style={styles.appInfoTitle}>Application Information</Text>
          <View style={styles.appInfoCard}>
            <View style={styles.appInfoRow}>
              <Text style={styles.appInfoLabel}>Version</Text>
              <Text style={styles.appInfoValue}>1.0.0</Text>
            </View>
            <View style={styles.appInfoRow}>
              <Text style={styles.appInfoLabel}>Build</Text>
              <Text style={styles.appInfoValue}>2024.01.20</Text>
            </View>
            <View style={styles.appInfoRow}>
              <Text style={styles.appInfoLabel}>Platform</Text>
              <Text style={styles.appInfoValue}>Expo React Native</Text>
            </View>
          </View>
        </View>
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
  overviewCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  overviewContent: {
    flex: 1,
    marginLeft: 16,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  overviewText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
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
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingTitle: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  settingArrow: {
    fontSize: 20,
    color: '#ccc',
    fontWeight: '300',
  },
  quickActions: {
    marginBottom: 24,
  },
  quickActionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    fontSize: 14,
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
  appInfo: {
    marginBottom: 24,
  },
  appInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  appInfoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  appInfoLabel: {
    fontSize: 14,
    color: '#666',
  },
  appInfoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});