import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PriceIndicator} from '../types/bond';

type ResultTone = 'blue' | 'teal' | 'gold';

interface ResultCardProps {
  label: string;
  value: string;
  accent?: PriceIndicator;
  tone?: ResultTone;
}

const getToneStyles = (tone?: ResultTone, accent?: PriceIndicator) => {
  if (accent === 'Premium') {
    return {
      border: '#bfe8df',
      pill: '#edfdf8',
      text: '#0f766e',
    };
  }

  if (accent === 'Discount') {
    return {
      border: '#fed7aa',
      pill: '#fff7ed',
      text: '#c2410c',
    };
  }

  if (accent === 'Par') {
    return {
      border: '#c7d2fe',
      pill: '#eef2ff',
      text: '#4338ca',
    };
  }

  switch (tone) {
    case 'teal':
      return {
        border: '#b9ece5',
        pill: '#ebfffb',
        text: '#0f766e',
      };
    case 'gold':
      return {
        border: '#fcdba4',
        pill: '#fffbeb',
        text: '#b45309',
      };
    case 'blue':
    default:
      return {
        border: '#cfe0fb',
        pill: '#eff6ff',
        text: '#1565d8',
      };
  }
};

const ResultCard = ({label, value, accent, tone = 'blue'}: ResultCardProps) => {
  const colors = getToneStyles(tone, accent);

  return (
    <View style={[styles.card, {borderColor: colors.border}]}>
      <View style={[styles.pill, {backgroundColor: colors.pill}]}>
        <Text style={[styles.label, {color: colors.text}]}>{label}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    minHeight: 128,
    backgroundColor: '#fdfefe',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
  },
  pill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 18,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  value: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '800',
    color: '#0f172a',
  },
});

export default ResultCard;
