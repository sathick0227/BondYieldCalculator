import React, {useMemo, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CashFlowTable from './src/components/CashFlowTable';
import ConfirmationModal from './src/components/ConfirmationModal';
import FrequencySelector from './src/components/FrequencySelector';
import InputField from './src/components/InputField';
import ResultCard from './src/components/ResultCard';
import SectionCard from './src/components/SectionCard';
import {DEFAULT_BOND_INPUT, FREQUENCY_OPTIONS} from './src/constants/defaults';
import {BondInput} from './src/types/bond';
import {calculateBondMetrics} from './src/utils/bondCalculations';
import {formatCurrency, formatPercent} from './src/utils/formatters';
import {validateBondInput} from './src/utils/validation';

const COLORS = {
  background: '#f3f5f9',
  canvas: '#ffffff',
  text: '#0f172a',
  muted: '#5b6472',
  border: '#d8dfeb',
  hero: '#0f2747',
  heroAccent: '#49c5b6',
  heroWarm: '#ffd166',
  primary: '#1565d8',
  primaryMuted: '#8fb5ee',
  secondarySurface: '#eef4ff',
  warning: '#f97316',
  danger: '#e11d48',
};

const App = () => {
  const [formValues, setFormValues] = useState({
    faceValue: DEFAULT_BOND_INPUT.faceValue.toString(),
    annualCouponRate: DEFAULT_BOND_INPUT.annualCouponRate.toString(),
    marketPrice: DEFAULT_BOND_INPUT.marketPrice.toString(),
    yearsToMaturity: DEFAULT_BOND_INPUT.yearsToMaturity.toString(),
    frequency: DEFAULT_BOND_INPUT.frequency,
  });
  const [submittedInput, setSubmittedInput] = useState<BondInput>(
    DEFAULT_BOND_INPUT,
  );
  const [isResetModalVisible, setIsResetModalVisible] = useState(false);

  const parsedInput = useMemo(
    () => ({
      faceValue: Number(formValues.faceValue),
      annualCouponRate: Number(formValues.annualCouponRate),
      marketPrice: Number(formValues.marketPrice),
      yearsToMaturity: Number(formValues.yearsToMaturity),
      frequency: formValues.frequency,
    }),
    [formValues],
  );

  const validation = useMemo(() => validateBondInput(formValues), [formValues]);
  const bondResult = useMemo(
    () => calculateBondMetrics(submittedInput),
    [submittedInput],
  );

  const updateField = (
    field: 'faceValue' | 'annualCouponRate' | 'marketPrice' | 'yearsToMaturity',
    value: string,
  ) => {
    setFormValues(currentValues => ({
      ...currentValues,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setIsResetModalVisible(true);
  };

  const handleConfirmReset = () => {
    setFormValues({
      faceValue: DEFAULT_BOND_INPUT.faceValue.toString(),
      annualCouponRate: DEFAULT_BOND_INPUT.annualCouponRate.toString(),
      marketPrice: DEFAULT_BOND_INPUT.marketPrice.toString(),
      yearsToMaturity: DEFAULT_BOND_INPUT.yearsToMaturity.toString(),
      frequency: DEFAULT_BOND_INPUT.frequency,
    });
    setSubmittedInput(DEFAULT_BOND_INPUT);
    setIsResetModalVisible(false);
  };

  const handleCancelReset = () => {
    setIsResetModalVisible(false);
  };

  const handleCalculate = () => {
    if (!validation.isValid) {
      return;
    }

    setSubmittedInput(parsedInput);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.hero} />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.heroOrbLarge} />
          <View style={styles.heroOrbSmall} />
          <View style={styles.heroHeaderRow}>
            <View>
              <Text style={styles.overline}>Bond Analytics Studio</Text>
              <Text style={styles.title}>Bond Yield Calculator</Text>
            </View>
            
          </View>
          <Text style={styles.subtitle}>
            Evaluate how a bond is priced relative to its face value, 
            identifying whether it is trading at a premium or discount.
          </Text>
          <View style={styles.heroStatsRow}>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatLabel}>Market Price</Text>
              <Text style={styles.heroStatValue}>
                {formatCurrency(submittedInput.marketPrice)}
              </Text>
            </View>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatLabel}>Coupon Frequency</Text>
              <Text style={styles.heroStatValue}>
                {submittedInput.frequency === 1 ? 'Annual' : 'Semi-annual'}
              </Text>
            </View>
          </View>
        </View>

        <SectionCard
          title="Bond Inputs"
          subtitle="Adjust the bond terms below, then calculate to update the active scenario."
          eyebrow="Scenario Setup">
          <InputField
            label="Face Value"
            value={formValues.faceValue}
            onChangeText={value => updateField('faceValue', value)}
            placeholder="1000"
            keyboardType="decimal-pad"
            errorMessage={validation.errors.faceValue}
          />
          <InputField
            label="Annual Coupon Rate (%)"
            value={formValues.annualCouponRate}
            onChangeText={value => updateField('annualCouponRate', value)}
            placeholder="8"
            keyboardType="decimal-pad"
            errorMessage={validation.errors.annualCouponRate}
          />
          <InputField
            label="Market Price"
            value={formValues.marketPrice}
            onChangeText={value => updateField('marketPrice', value)}
            placeholder="950"
            keyboardType="decimal-pad"
            errorMessage={validation.errors.marketPrice}
          />
          <InputField
            label="Years to Maturity"
            value={formValues.yearsToMaturity}
            onChangeText={value => updateField('yearsToMaturity', value)}
            placeholder="5"
            keyboardType="decimal-pad"
            errorMessage={validation.errors.yearsToMaturity}
          />
          <FrequencySelector
            label="Coupon Frequency"
            options={FREQUENCY_OPTIONS}
            selectedValue={formValues.frequency}
            onSelect={frequency =>
              setFormValues(currentValues => ({
                ...currentValues,
                frequency,
              }))
            }
          />
          <View style={styles.buttonRow}>
            <Pressable
              accessibilityRole="button"
              disabled={!validation.isValid}
              onPress={handleCalculate}
              style={({pressed}) => [
                styles.primaryButton,
                !validation.isValid && styles.primaryButtonDisabled,
                pressed && validation.isValid && styles.pressedButton,
              ]}>
              <Text style={styles.primaryButtonText}>Calculate Bond Metrics</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={handleReset}
              style={({pressed}) => [
                styles.secondaryButton,
                pressed && styles.pressedButton,
              ]}>
              <Text style={styles.secondaryButtonText}>Reset</Text>
            </Pressable>
          </View>
          {!validation.isValid ? (
            <View style={styles.validationBanner}>
              <Text style={styles.validationTitle}>Action needed</Text>
              <Text style={styles.validationText}>
                Enter valid bond inputs to unlock calculation.
              </Text>
            </View>
          ) : null}
        </SectionCard>

        <SectionCard
          title="Calculated Results"
          subtitle="These cards summarize the active scenario after you press Calculate."
          eyebrow="Performance Snapshot">
          <View style={styles.resultsGrid}>
            <ResultCard
              label="Current Yield"
              value={formatPercent(bondResult.currentYield)}
              tone="blue"
            />
            <ResultCard
              label="Yield to Maturity"
              value={formatPercent(bondResult.yieldToMaturity)}
              tone="teal"
            />
            <ResultCard
              label="Total Interest"
              value={formatCurrency(bondResult.totalInterestEarned)}
              tone="gold"
            />
            <ResultCard
              label="Price Indicator"
              value={bondResult.priceIndicator}
              accent={bondResult.priceIndicator}
            />
          </View>
        </SectionCard>

        <SectionCard
          title="Cash Flow Schedule"
          subtitle="A period-by-period view of coupon payments, cumulative interest, and principal runoff."
          eyebrow="Payment Timeline">
          <CashFlowTable rows={bondResult.cashFlowSchedule} />
        </SectionCard>
      </ScrollView>
      <ConfirmationModal
        visible={isResetModalVisible}
        title="Reset to demo values?"
        message="Your current edits will be cleared and the original sample bond scenario will be restored."
        confirmLabel="Reset"
        cancelLabel="Keep Editing"
        onConfirm={handleConfirmReset}
        onCancel={handleCancelReset}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 32,
    gap: 18,
  },
  heroCard: {
    overflow: 'hidden',
    backgroundColor: COLORS.hero,
    borderRadius: 32,
    padding: 24,
    shadowColor: '#07101f',
    shadowOpacity: 0.3,
    shadowRadius: 24,
    shadowOffset: {width: 0, height: 14},
    elevation: 8,
  },
  heroOrbLarge: {
    position: 'absolute',
    top: -18,
    right: -8,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(73, 197, 182, 0.2)',
  },
  heroOrbSmall: {
    position: 'absolute',
    bottom: -24,
    left: -20,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 209, 102, 0.15)',
  },
  heroHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  overline: {
    color: '#9fd8d0',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    color: '#ffffff',
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '800',
    maxWidth: 240,
  },
  heroChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  heroChipText: {
    color: '#dbeafe',
    fontSize: 12,
    fontWeight: '700',
  },
  subtitle: {
    color: '#d8e6ff',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 16,
  },
  heroStatsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  heroStatCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    padding: 14,
  },
  heroStatLabel: {
    color: '#9fc0e9',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  heroStatValue: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  primaryButton: {
    flex: 1,
    minHeight: 56,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    shadowColor: '#1565d8',
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 8},
    elevation: 5,
  },
  primaryButtonDisabled: {
    backgroundColor: COLORS.primaryMuted,
    shadowOpacity: 0,
    elevation: 0,
  },
  secondaryButton: {
    minHeight: 56,
    paddingHorizontal: 18,
    borderRadius: 18,
    backgroundColor: COLORS.secondarySurface,
    borderWidth: 1,
    borderColor: '#cfe0fb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressedButton: {
    opacity: 0.92,
    transform: [{scale: 0.99}],
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '800',
  },
  validationBanner: {
    backgroundColor: '#fff1f2',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#fecdd3',
    padding: 14,
    marginTop: 4,
  },
  validationTitle: {
    color: COLORS.danger,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 4,
  },
  validationText: {
    color: '#9f1239',
    fontSize: 13,
    lineHeight: 19,
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});

export default App;
