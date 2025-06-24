import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { Chrome as Home, Users, School, Settings, UserPlus, BookOpen, Calendar, DollarSign, MessageSquare, FileText, LogOut, GraduationCap, ClipboardList, ChartBar as BarChart3, Bell } from 'lucide-react-native';

export default function AuthenticatedLayout() {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#fff',
            width: 280,
          },
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitle: user?.school_name || 'ERP System',
        }}
        drawerContent={(props) => (
          <View style={styles.drawerContainer}>
            <View style={styles.drawerHeader}>
              <Text style={styles.schoolName}>{user?.school_name}</Text>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userRole}>{user?.role}</Text>
            </View>

            <View style={styles.drawerContent}>
              {/* Main Navigation Items */}
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => props.navigation.navigate('(tabs)')}
              >
                <Home size={20} color="#333" />
                <Text style={styles.drawerItemText}>Dashboard</Text>
              </TouchableOpacity>

              {/* School Management */}
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => props.navigation.navigate('schools')} // CHANGED: from 'schools/index' to 'schools'
              >
                <School size={20} color="#333" />
                <Text style={styles.drawerItemText}>School Management</Text>
              </TouchableOpacity>

              {/* User Management */}
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => props.navigation.navigate('users')} // CHANGED: from 'users/index' to 'users'
              >
                <Users size={20} color="#333" />
                <Text style={styles.drawerItemText}>User Management</Text>
              </TouchableOpacity>

              {/* Applications */}
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => props.navigation.navigate('applications')} // CHANGED: from 'applications/index' to 'applications'
              >
                <UserPlus size={20} color="#333" />
                <Text style={styles.drawerItemText}>Applications</Text>
              </TouchableOpacity>

              {/* Academic Setup */}
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => props.navigation.navigate('academic')} // CHANGED: from 'academic/index' to 'academic'
              >
                <BookOpen size={20} color="#333" />
                <Text style={styles.drawerItemText}>Academic Setup</Text>
              </TouchableOpacity>

              {/* Attendance */}
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => props.navigation.navigate('attendance')} // CHANGED: from 'attendance/index' to 'attendance'
              >
                <Calendar size={20} color="#333" />
                <Text style={styles.drawerItemText}>Attendance</Text>
              </TouchableOpacity>

              {/* Assessments */}
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => props.navigation.navigate('assessments')} // CHANGED: from 'assessments/index' to 'assessments'
              >
                <GraduationCap size={20} color="#333" />
                <Text style={styles.drawerItemText}>Assessments</Text>
              </TouchableOpacity>

              {/* Fee Management */}
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => props.navigation.navigate('fees')} // CHANGED: from 'fees/index' to 'fees'
              >
                <DollarSign size={20} color="#333" />
                <Text style={styles.drawerItemText}>Fee Management</Text>
              </TouchableOpacity>

              {/* Messages */}
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => props.navigation.navigate('messages')} // CHANGED: from 'messages/index' to 'messages'
              >
                <MessageSquare size={20} color="#333" />
                <Text style={styles.drawerItemText}>Messages</Text>
              </TouchableOpacity>

              {/* Reports */}
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => props.navigation.navigate('reports')} // CHANGED: from 'reports/index' to 'reports'
              >
                <FileText size={20} color="#333" />
                <Text style={styles.drawerItemText}>Reports</Text>
              </TouchableOpacity>

              {/* Behavior Reports */}
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => props.navigation.navigate('behavior')} // CHANGED: from 'behavior/index' to 'behavior'
              >
                <ClipboardList size={20} color="#333" />
                <Text style={styles.drawerItemText}>Behavior Reports</Text>
              </TouchableOpacity>

              {/* Happenings */}
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => props.navigation.navigate('happenings')} // CHANGED: from 'happenings/index' to 'happenings'
              >
                <Bell size={20} color="#333" />
                <Text style={styles.drawerItemText}>Happenings</Text>
              </TouchableOpacity>

              {/* Timetable */}
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => props.navigation.navigate('timetable')} // CHANGED: from 'timetable/index' to 'timetable'
              >
                <Calendar size={20} color="#333" />
                <Text style={styles.drawerItemText}>Timetable</Text>
              </TouchableOpacity>

              {/* Analytics */}
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => props.navigation.navigate('analytics')} // CHANGED: from 'analytics/index' to 'analytics'
              >
                <BarChart3 size={20} color="#333" />
                <Text style={styles.drawerItemText}>Analytics</Text>
              </TouchableOpacity>

              {/* Settings */}
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => props.navigation.navigate('settings')} // CHANGED: from 'settings/index' to 'settings'
              >
                <Settings size={20} color="#333" />
                <Text style={styles.drawerItemText}>Settings</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.drawerFooter}>
              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <LogOut size={20} color="#FF3B30" />
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      >
        <Drawer.Screen name="(tabs)" options={{ drawerLabel: 'Main' }} />
        <Drawer.Screen name="schools" options={{ drawerLabel: 'Schools' }} />
        <Drawer.Screen name="users" options={{ drawerLabel: 'Users' }} />
        <Drawer.Screen name="applications" options={{ drawerLabel: 'Applications' }} />
        <Drawer.Screen name="academic" options={{ drawerLabel: 'Academic' }} />
        <Drawer.Screen name="attendance" options={{ drawerLabel: 'Attendance' }} />
        <Drawer.Screen name="assessments" options={{ drawerLabel: 'Assessments' }} />
        <Drawer.Screen name="fees" options={{ drawerLabel: 'Fees' }} />
        <Drawer.Screen name="messages" options={{ drawerLabel: 'Messages' }} />
        <Drawer.Screen name="reports" options={{ drawerLabel: 'Reports' }} />
        <Drawer.Screen name="behavior" options={{ drawerLabel: 'Behavior' }} />
        <Drawer.Screen name="happenings" options={{ drawerLabel: 'Happenings' }} />
        <Drawer.Screen name="timetable" options={{ drawerLabel: 'Timetable' }} />
        <Drawer.Screen name="analytics" options={{ drawerLabel: 'Analytics' }} />
        <Drawer.Screen name="settings" options={{ drawerLabel: 'Settings' }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 60,
  },
  schoolName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userName: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 2,
  },
  userRole: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
    textTransform: 'capitalize',
  },
  drawerContent: {
    flex: 1,
    paddingTop: 20,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  drawerItemText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#FF3B30',
  },
});