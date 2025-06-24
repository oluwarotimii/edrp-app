import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Palette, Upload, Eye, Save } from 'lucide-react-native';

export default function SchoolBrandingScreen() {
  const [branding, setBranding] = useState({
    schoolLogo: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=200',
    primaryColor: '#007AFF',
    secondaryColor: '#34C759',
    accentColor: '#FF9500',
    schoolMotto: 'Excellence in Education',
    schoolVision: 'To be a leading institution in providing quality education',
    schoolMission: 'Empowering students to achieve their full potential',
    contactEmail: 'info@school.edu',
    contactPhone: '+1-555-0123',
    website: 'www.school.edu',
  });

  const colorPresets = [
    { name: 'Blue Theme', primary: '#007AFF', secondary: '#34C759', accent: '#FF9500' },
    { name: 'Green Theme', primary: '#34C759', secondary: '#007AFF', accent: '#FF3B30' },
    { name: 'Purple Theme', primary: '#AF52DE', secondary: '#007AFF', accent: '#FF9500' },
    { name: 'Red Theme', primary: '#FF3B30', secondary: '#34C759', accent: '#FF9500' },
  ];

  const handleBrandingChange = (key: string, value: string) => {
    setBranding(prev => ({ ...prev, [key]: value }));
  };

  const handleColorPreset = (preset: any) => {
    setBranding(prev => ({
      ...prev,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent,
    }));
  };

  const handleUploadLogo = () => {
    Alert.alert('Upload Logo', 'Logo upload functionality would be implemented here');
  };

  const handlePreview = () => {
    Alert.alert('Preview', 'Preview functionality would show how the branding looks');
  };

  const handleSaveBranding = () => {
    Alert.alert('Success', 'School branding saved successfully');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>School Branding</Text>
        <Text style={styles.subtitle}>Customize your school's visual identity</Text>
      </View>

      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Upload size={20} color="#007AFF" />
            <Text style={styles.sectionTitle}>School Logo</Text>
          </View>
          <View style={styles.logoContainer}>
            <Image source={{ uri: branding.schoolLogo }} style={styles.logoPreview} />
            <TouchableOpacity style={styles.uploadButton} onPress={handleUploadLogo}>
              <Upload size={20} color="#007AFF" />
              <Text style={styles.uploadButtonText}>Upload New Logo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Color Theme Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Palette size={20} color="#007AFF" />
            <Text style={styles.sectionTitle}>Color Theme</Text>
          </View>
          
          <Text style={styles.subsectionTitle}>Color Presets</Text>
          <View style={styles.presetsContainer}>
            {colorPresets.map((preset, index) => (
              <TouchableOpacity
                key={index}
                style={styles.presetCard}
                onPress={() => handleColorPreset(preset)}
              >
                <View style={styles.colorPreview}>
                  <View style={[styles.colorSample, { backgroundColor: preset.primary }]} />
                  <View style={[styles.colorSample, { backgroundColor: preset.secondary }]} />
                  <View style={[styles.colorSample, { backgroundColor: preset.accent }]} />
                </View>
                <Text style={styles.presetName}>{preset.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.subsectionTitle}>Custom Colors</Text>
          <View style={styles.colorInputsContainer}>
            <View style={styles.colorInputGroup}>
              <Text style={styles.colorLabel}>Primary Color</Text>
              <View style={styles.colorInputRow}>
                <View style={[styles.colorDisplay, { backgroundColor: branding.primaryColor }]} />
                <TextInput
                  style={styles.colorInput}
                  value={branding.primaryColor}
                  onChangeText={(text) => handleBrandingChange('primaryColor', text)}
                  placeholder="#007AFF"
                />
              </View>
            </View>
            <View style={styles.colorInputGroup}>
              <Text style={styles.colorLabel}>Secondary Color</Text>
              <View style={styles.colorInputRow}>
                <View style={[styles.colorDisplay, { backgroundColor: branding.secondaryColor }]} />
                <TextInput
                  style={styles.colorInput}
                  value={branding.secondaryColor}
                  onChangeText={(text) => handleBrandingChange('secondaryColor', text)}
                  placeholder="#34C759"
                />
              </View>
            </View>
            <View style={styles.colorInputGroup}>
              <Text style={styles.colorLabel}>Accent Color</Text>
              <View style={styles.colorInputRow}>
                <View style={[styles.colorDisplay, { backgroundColor: branding.accentColor }]} />
                <TextInput
                  style={styles.colorInput}
                  value={branding.accentColor}
                  onChangeText={(text) => handleBrandingChange('accentColor', text)}
                  placeholder="#FF9500"
                />
              </View>
            </View>
          </View>
        </View>

        {/* School Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>School Information</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>School Motto</Text>
            <TextInput
              style={styles.textInput}
              value={branding.schoolMotto}
              onChangeText={(text) => handleBrandingChange('schoolMotto', text)}
              placeholder="Enter school motto"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Vision Statement</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={branding.schoolVision}
              onChangeText={(text) => handleBrandingChange('schoolVision', text)}
              placeholder="Enter vision statement"
              multiline
              numberOfLines={3}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Mission Statement</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={branding.schoolMission}
              onChangeText={(text) => handleBrandingChange('schoolMission', text)}
              placeholder="Enter mission statement"
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Contact Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Contact Email</Text>
            <TextInput
              style={styles.textInput}
              value={branding.contactEmail}
              onChangeText={(text) => handleBrandingChange('contactEmail', text)}
              placeholder="info@school.edu"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Contact Phone</Text>
            <TextInput
              style={styles.textInput}
              value={branding.contactPhone}
              onChangeText={(text) => handleBrandingChange('contactPhone', text)}
              placeholder="+1-555-0123"
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Website</Text>
            <TextInput
              style={styles.textInput}
              value={branding.website}
              onChangeText={(text) => handleBrandingChange('website', text)}
              placeholder="www.school.edu"
              keyboardType="url"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.previewButton} onPress={handlePreview}>
            <Eye size={20} color="#007AFF" />
            <Text style={styles.previewButtonText}>Preview</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveBranding}>
            <Save size={20} color="#fff" />
            <Text style={styles.saveButtonText}>Save Branding</Text>
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
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 12,
    marginTop: 16,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoPreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 8,
    fontWeight: '500',
  },
  presetsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  presetCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    width: '48%',
  },
  colorPreview: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  colorSample: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 2,
  },
  presetName: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  colorInputsContainer: {
    gap: 16,
  },
  colorInputGroup: {
    gap: 8,
  },
  colorLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  colorInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  colorDisplay: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  colorInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  previewButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  previewButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
});