import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';

interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal = ({
  visible,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} />
        <View style={styles.modalCard}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Reset workflow</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.infoStrip}>
            <Text style={styles.infoStripText}>
              The active results and cash flow schedule will return to the sample scenario.
            </Text>
          </View>
          <View style={styles.buttonRow}>
            <Pressable
              accessibilityRole="button"
              onPress={onCancel}
              style={({pressed}) => [
                styles.secondaryButton,
                pressed && styles.pressedButton,
              ]}>
              <Text style={styles.secondaryButtonText}>{cancelLabel}</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={onConfirm}
              style={({pressed}) => [
                styles.primaryButton,
                pressed && styles.pressedButton,
              ]}>
              <Text style={styles.primaryButtonText}>{confirmLabel}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(2, 6, 23, 0.52)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 372,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    padding: 24,
    borderWidth: 1,
    borderColor: '#dbe3ef',
    shadowColor: '#020617',
    shadowOpacity: 0.28,
    shadowRadius: 24,
    shadowOffset: {width: 0, height: 14},
    elevation: 10,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#eff6ff',
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  badgeText: {
    color: '#1565d8',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  title: {
    color: '#0f172a',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    marginBottom: 10,
  },
  message: {
    color: '#64748b',
    fontSize: 15,
    lineHeight: 22,
  },
  infoStrip: {
    marginTop: 18,
    backgroundColor: '#f8fbff',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  infoStripText: {
    color: '#33517a',
    fontSize: 13,
    lineHeight: 19,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 22,
  },
  secondaryButton: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fbff',
    borderWidth: 1,
    borderColor: '#dbe3ef',
  },
  primaryButton: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1565d8',
  },
  pressedButton: {
    opacity: 0.92,
  },
  secondaryButtonText: {
    color: '#33517a',
    fontSize: 15,
    fontWeight: '800',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
});

export default ConfirmationModal;
