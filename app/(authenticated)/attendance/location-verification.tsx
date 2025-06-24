import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { MapPin, CircleCheck as CheckCircle, Circle as XCircle, Clock, Navigation } from 'lucide-react-native';

export default function LocationVerificationScreen() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'checking' | 'verified' | 'failed'>('idle');
  const [currentLocation, setCurrentLocation] = useState<{latitude: number, longitude: number} | null>(null);
  
  // Mock school location (in a real app, this would come from the database)
  const schoolLocation = {
    latitude: 40.7128,
    longitude: -74.0060,
    name: 'Demo Elementary School',
    radius: 100 // meters
  };

  const [attendanceMarked, setAttendanceMarked] = useState(false);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon1-lon2) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  };

  const mockGetLocation = (): Promise<{latitude: number, longitude: number}> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock location - in real app, use expo-location
        // For demo, we'll simulate being within school radius
        const mockLat = schoolLocation.latitude + (Math.random() - 0.5) * 0.001;
        const mockLon = schoolLocation.longitude + (Math.random() - 0.5) * 0.001;
        resolve({ latitude: mockLat, longitude: mockLon });
      }, 2000);
    });
  };

  const handleLocationVerification = async () => {
    setIsVerifying(true);
    setLocationStatus('checking');

    try {
      // Get current location
      const location = await mockGetLocation();
      setCurrentLocation(location);

      // Calculate distance from school
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        schoolLocation.latitude,
        schoolLocation.longitude
      );

      if (distance <= schoolLocation.radius) {
        setLocationStatus('verified');
        // Mark attendance
        setTimeout(() => {
          setAttendanceMarked(true);
          Alert.alert(
            'Attendance Marked',
            'Your attendance has been successfully recorded!',
            [{ text: 'OK', onPress: () => router.back() }]
          );
        }, 1000);
      } else {
        setLocationStatus('failed');
        Alert.alert(
          'Location Verification Failed',
          `You are ${Math.round(distance)}m away from school. You must be within ${schoolLocation.radius}m to mark attendance.`
        );
      }
    } catch (error) {
      setLocationStatus('failed');
      Alert.alert('Error', 'Failed to get your location. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const getStatusIcon = () => {
    switch (locationStatus) {
      case 'checking':
        return <ActivityIndicator size={48} color="#007AFF" />;
      case 'verified':
        return <CheckCircle size={48} color="#34C759" />;
      case 'failed':
        return <XCircle size={48} color="#FF3B30" />;
      default:
        return <MapPin size={48} color="#007AFF" />;
    }
  };

  const getStatusText = () => {
    switch (locationStatus) {
      case 'checking':
        return 'Verifying your location...';
      case 'verified':
        return 'Location verified! You are at school.';
      case 'failed':
        return 'Location verification failed.';
      default:
        return 'Tap to verify your location and mark attendance';
    }
  };

  const getStatusColor = () => {
    switch (locationStatus) {
      case 'verified':
        return '#34C759';
      case 'failed':
        return '#FF3B30';
      default:
        return '#007AFF';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Location Verification</Text>
        <Text style={styles.subtitle}>Verify your location to mark attendance</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.schoolInfo}>
          <Text style={styles.schoolName}>{schoolLocation.name}</Text>
          <Text style={styles.schoolDetails}>
            Required radius: {schoolLocation.radius}m from school
          </Text>
        </View>

        <View style={styles.verificationCard}>
          <View style={styles.statusIcon}>
            {getStatusIcon()}
          </View>
          
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {getStatusText()}
          </Text>

          {currentLocation && (
            <View style={styles.locationDetails}>
              <Text style={styles.locationTitle}>Your Location:</Text>
              <Text style={styles.locationCoords}>
                Lat: {currentLocation.latitude.toFixed(6)}
              </Text>
              <Text style={styles.locationCoords}>
                Lng: {currentLocation.longitude.toFixed(6)}
              </Text>
              {locationStatus === 'verified' && (
                <Text style={styles.distanceText}>
                  Distance from school: {Math.round(calculateDistance(
                    currentLocation.latitude,
                    currentLocation.longitude,
                    schoolLocation.latitude,
                    schoolLocation.longitude
                  ))}m
                </Text>
              )}
            </View>
          )}

          {!attendanceMarked && locationStatus !== 'checking' && (
            <TouchableOpacity
              style={[
                styles.verifyButton,
                { backgroundColor: locationStatus === 'verified' ? '#34C759' : '#007AFF' }
              ]}
              onPress={handleLocationVerification}
              disabled={isVerifying}
            >
              <Navigation size={20} color="#fff" />
              <Text style={styles.verifyButtonText}>
                {locationStatus === 'verified' ? 'Mark Attendance' : 'Verify Location'}
              </Text>
            </TouchableOpacity>
          )}

          {attendanceMarked && (
            <View style={styles.successCard}>
              <CheckCircle size={24} color="#34C759" />
              <Text style={styles.successText}>Attendance Marked Successfully!</Text>
              <Text style={styles.successTime}>
                {new Date().toLocaleTimeString()} - {new Date().toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>Instructions:</Text>
          <Text style={styles.instructionText}>
            • Make sure you are within {schoolLocation.radius}m of the school building
          </Text>
          <Text style={styles.instructionText}>
            • Enable location services on your device
          </Text>
          <Text style={styles.instructionText}>
            • Tap "Verify Location" to check your position
          </Text>
          <Text style={styles.instructionText}>
            • Your attendance will be automatically marked if location is verified
          </Text>
        </View>

        <View style={styles.todayStats}>
          <Text style={styles.statsTitle}>Today's Attendance</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>94%</Text>
              <Text style={styles.statLabel}>Present</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1,156</Text>
              <Text style={styles.statLabel}>Total Staff</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>08:30</Text>
              <Text style={styles.statLabel}>Check-in Time</Text>
            </View>
          </View>
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
  schoolInfo: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  schoolName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  schoolDetails: {
    fontSize: 14,
    color: '#666',
  },
  verificationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusIcon: {
    marginBottom: 16,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 16,
  },
  locationDetails: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    width: '100%',
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  locationCoords: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
  distanceText: {
    fontSize: 14,
    color: '#34C759',
    fontWeight: '500',
    marginTop: 8,
  },
  verifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  successCard: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0fff4',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#34C759',
    width: '100%',
  },
  successText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34C759',
    marginTop: 8,
  },
  successTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  instructionsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 4,
  },
  todayStats: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
});