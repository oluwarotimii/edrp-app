import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Settings, Clock, Bell, Shield, Globe, Smartphone } from 'lucide-react-native';

export default function AppConfigScreen() {
  const [config, setConfig] = useState({
    sessionTimeout: '30',
    maxLoginAttempts: '3',
    passwordMinLength: '8',
    enableTwoFactor: false,
    allowOfflineMode: true,
    autoBackup: true,
    dataRetentionDays: '365',
    enableAnalytics: true,
    allowPushNotifications: true,
    maintenanceMode: false,
  });

  const handleConfigChange = (key: string, value: string | boolean) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const configSections = [
    {
      title: 'Security Settings',
      icon: Shield,
      items: [
        {
          key: 'sessionTimeout',
          title: 'Session Timeout (minutes)',
          type: 'input',
          value: config.sessionTimeout,
          placeholder: '30',
          keyboardType: 'numeric',
        },
        {
          key: 'maxLoginAttempts',
          title: 'Max Login Attempts',
          type: 'input',
          value: config.maxLoginAttempts,
          placeholder: '3',
          keyboardType: 'numeric',
        },
        {
          key: 'passwordMinLength',
          title: 'Minimum Password Length',
          type: 'input',
          value: config.passwordMinLength,
          placeholder: '8',
          keyboardType: 'numeric',
        },
        {
          key: 'enableTwoFactor',
          title: 'Enable Two-Factor Authentication',
          type: 'switch',
          value: config.enableTwoFactor,
        },
      ],
    },
    {
      title: 'Application Settings',
      icon: Smartphone,
      items: [
        {
          key: 'allowOfflineMode',
          title: 'Allow Offline Mode',
          type: 'switch',
          value: config.allowOfflineMode,
        },
        {
          key: 'autoBackup',
          title: 'Automatic Data Backup',
          type: 'switch',
          value: config.autoBackup,
        },
        {
          key: 'dataRetentionDays',
          title: 'Data Retention (days)',
          type: 'input',
          value: config.dataRetentionDays,
          placeholder: '365',
          keyboardType: 'numeric',
        },
        {
          key: 'maintenanceMode',
          title: 'Maintenance Mode',
          type: 'switch',
          value: config.maintenanceMode,
        },
      ],
    },
    {
      title: 'Notifications & Analytics',
      icon: Bell,
      items: [
        {
          key: 'allowPushNotifications',
          title: 'Push Notifications',
          type: 'switch',
          value: config.allowPushNotifications,
        },
        {
          key: 'enableAnalytics',
          title: 'Usage Analytics',
          type: 'switch',
          value: config.enableAnalytics,
        },
      ],
    },
  ];

  const handleSaveConfig = () => {
    Alert.alert('Success', 'App configuration saved successfully');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>App Configuration</Text>
        <Text style={styles.subtitle}>Configure application settings and preferences</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.warningCard}>
          <Shield size={24} color="#FF9500" />
          <View style={styles.warningContent}>
            <Text style={styles.warningTitle}>Important Notice</Text>
            <Text style={styles.warningText}>
              Changes to these settings will affect all users. Please review carefully before saving.
            </Text>
          </View>
        </View>

        {configSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <View style={styles.sectionHeader}>
              <section.icon size={20} color="#007AFF" />
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            <View style={styles.configCard}>
              {section.items.map((item, itemIndex) => (
                <View key={item.key} style={styles.configItem}>
                  <View style={styles.configInfo}>
                    <Text style={styles.configTitle}>{item.title}</Text>
                  </View>
                  {item.type === 'switch' ? (
                    <Switch
                      value={item.value as boolean}
                      onValueChange={(value) => handleConfigChange(item.key, value)}
                      trackColor={{ false: '#e0e0e0', true: '#007AFF' }}
                      thumbColor={item.value ? '#fff' : '#f4f3f4'}
                    />
                  ) : (
                    <TextInput
                      style={styles.configInput}
                      value={item.value as string}
                      onChangeText={(text) => handleConfigChange(item.key, text)}
                      placeholder={item.placeholder}
                      keyboardType={item.keyboardType as any}
                    />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveConfig}>
            <Text style={styles.saveButtonText}>Save Configuration</Text>
          </TouchableOpacity>
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
  warningCard: {
    backgroundColor: '#FFF3CD',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FFE69C',
  },
  warningContent: {
    flex: 1,
    marginLeft: 12,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#856404',
    marginBottom: 4,
  },
  warningText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
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
  configCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  configItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  configInfo: {
    flex: 1,
    marginRight: 16,
  },
  configTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  configInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
    minWidth: 80,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});