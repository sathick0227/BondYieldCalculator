import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CouponFrequency} from '../types/bond';

interface FrequencyOption {
  label: string;
  value: CouponFrequency;
}

interface FrequencySelectorProps {
  label: string;
  options: FrequencyOption[];
  selectedValue: CouponFrequency;
  onSelect: (value: CouponFrequency) => void;
}

const FrequencySelector = ({
  label,
  options,
  selectedValue,
  onSelect,
}: FrequencySelectorProps) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.shell}>
        {options.map(option => {
          const isSelected = option.value === selectedValue;

          return (
            <Pressable
              key={option.value}
              accessibilityRole="button"
              onPress={() => onSelect(option.value)}
              style={({pressed}) => [
                styles.option,
                isSelected && styles.optionSelected,
                pressed && styles.optionPressed,
              ]}>
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
                ]}>
                {option.label}
              </Text>
              <Text
                style={[
                  styles.optionSubtext,
                  isSelected && styles.optionSubtextSelected,
                ]}>
                {option.value} payment{option.value > 1 ? 's' : ''}/year
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 10,
  },
  shell: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#f3f7fd',
    borderRadius: 22,
    padding: 6,
  },
  option: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: '#ffffff',
    shadowColor: '#1565d8',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 6},
    elevation: 3,
  },
  optionPressed: {
    opacity: 0.92,
  },
  optionText: {
    color: '#334155',
    fontWeight: '800',
    fontSize: 15,
  },
  optionTextSelected: {
    color: '#1565d8',
  },
  optionSubtext: {
    marginTop: 4,
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
  },
  optionSubtextSelected: {
    color: '#5b89d6',
  },
});

export default FrequencySelector;
