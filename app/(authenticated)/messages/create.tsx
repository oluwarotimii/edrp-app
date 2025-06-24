import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Send, Users, User, MessageSquare } from 'lucide-react-native';

export default function CreateMessageScreen() {
  const [messageData, setMessageData] = useState({
    recipient: 'all-parents',
    subject: '',
    message: '',
  });

  const recipientOptions = [
    { value: 'all-parents', label: 'All Parents' },
    { value: 'all-teachers', label: 'All Teachers' },
    { value: 'all-staff', label: 'All Staff' },
    { value: 'grade-5a-parents', label: 'Grade 5A Parents' },
    { value: 'grade-5b-parents', label: 'Grade 5B Parents' },
  ];

  const handleSendMessage = () => {
    if (!messageData.subject || !messageData.message) {
      Alert.alert('Error', 'Please fill in subject and message');
      return;
    }

    Alert.alert(
      'Send Message',
      'Are you sure you want to send this message?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Send', 
          onPress: () => {
            Alert.alert('Success', 'Message sent successfully');
            router.back();
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Message</Text>
        <Text style={styles.subtitle}>Send message to parents, teachers, or staff</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.form}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recipients</Text>
            <View style={styles.recipientOptions}>
              {recipientOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.recipientOption,
                    messageData.recipient === option.value && styles.selectedRecipient
                  ]}
                  onPress={() => setMessageData({...messageData, recipient: option.value})}
                >
                  <Users size={16} color={messageData.recipient === option.value ? '#fff' : '#666'} />
                  <Text style={[
                    styles.recipientText,
                    messageData.recipient === option.value && styles.selectedRecipientText
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Subject</Text>
            <View style={styles.inputContainer}>
              <MessageSquare size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter message subject"
                value={messageData.subject}
                onChangeText={(text) => setMessageData({...messageData, subject: text})}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Message</Text>
            <View style={styles.messageInputContainer}>
              <TextInput
                style={styles.messageInput}
                placeholder="Type your message here..."
                value={messageData.message}
                onChangeText={(text) => setMessageData({...messageData, message: text})}
                multiline
                numberOfLines={8}
                textAlignVertical="top"
              />
            </View>
          </View>

          <View style={styles.messagePreview}>
            <Text style={styles.previewTitle}>Preview</Text>
            <View style={styles.previewCard}>
              <Text style={styles.previewRecipient}>
                To: {recipientOptions.find(opt => opt.value === messageData.recipient)?.label}
              </Text>
              <Text style={styles.previewSubject}>
                Subject: {messageData.subject || 'No subject'}
              </Text>
              <Text style={styles.previewMessage}>
                {messageData.message || 'No message content'}
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Send size={20} color="#fff" />
              <Text style={styles.sendButtonText}>Send Message</Text>
            </TouchableOpacity>
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
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  recipientOptions: {
    gap: 8,
  },
  recipientOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f9f9f9',
  },
  selectedRecipient: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  recipientText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  selectedRecipientText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  messageInputContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  messageInput: {
    padding: 12,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  messagePreview: {
    marginBottom: 24,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  previewCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  previewRecipient: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
    marginBottom: 8,
  },
  previewSubject: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  previewMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  sendButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
});