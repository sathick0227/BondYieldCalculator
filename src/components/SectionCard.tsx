import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface SectionCardProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}

const SectionCard = ({children, title, subtitle, eyebrow}: SectionCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: '#dbe3ef',
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: {width: 0, height: 10},
    elevation: 4,
  },
  header: {
    paddingBottom: 6,
  },
  eyebrow: {
    color: '#1565d8',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
    color: '#0f172a',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: '#64748b',
  },
  content: {
    marginTop: 18,
    gap: 16,
  },
});

export default SectionCard;
