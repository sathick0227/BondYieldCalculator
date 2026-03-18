import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {CashFlowRow} from '../types/bond';
import {formatCurrency} from '../utils/formatters';

interface CashFlowTableProps {
  rows: CashFlowRow[];
}

const CashFlowTable = ({rows}: CashFlowTableProps) => {
  if (rows.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>No cash flows yet</Text>
        <Text style={styles.emptyText}>
          Enter valid inputs and calculate to generate the payment schedule.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.tableShell}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <View style={[styles.row, styles.headerRow]}>
            <Text style={[styles.cell, styles.headerCell, styles.periodCell]}>Period</Text>
            <Text style={[styles.cell, styles.headerCell, styles.dateCell]}>Payment Date</Text>
            <Text style={[styles.cell, styles.headerCell, styles.valueCell]}>Coupon</Text>
            <Text style={[styles.cell, styles.headerCell, styles.valueCell]}>
              Cumulative Interest
            </Text>
            <Text style={[styles.cell, styles.headerCell, styles.valueCell]}>
              Remaining Principal
            </Text>
          </View>
          {rows.map((row, index) => (
            <View
              key={row.period}
              style={[styles.row, index % 2 === 0 ? styles.oddRow : styles.evenRow]}>
              <Text style={[styles.cell, styles.periodCell, styles.periodText]}>
                {row.period}
              </Text>
              <Text style={[styles.cell, styles.dateCell]}>{row.paymentDate}</Text>
              <Text style={[styles.cell, styles.valueCell]}>
                {formatCurrency(row.couponPayment)}
              </Text>
              <Text style={[styles.cell, styles.valueCell]}>
                {formatCurrency(row.cumulativeInterest)}
              </Text>
              <Text style={[styles.cell, styles.valueCell, styles.principalText]}>
                {formatCurrency(row.remainingPrincipal)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tableShell: {
    overflow: 'hidden',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#dbe3ef',
    backgroundColor: '#f8fbff',
  },
  emptyState: {
    borderRadius: 22,
    padding: 18,
    backgroundColor: '#f8fbff',
    borderWidth: 1,
    borderColor: '#dbe3ef',
  },
  emptyTitle: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  emptyText: {
    color: '#64748b',
    fontSize: 14,
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
  },
  oddRow: {
    backgroundColor: '#ffffff',
  },
  evenRow: {
    backgroundColor: '#f8fbff',
  },
  headerRow: {
    backgroundColor: '#eaf2ff',
    borderBottomWidth: 1,
    borderBottomColor: '#dbe3ef',
  },
  cell: {
    paddingVertical: 15,
    paddingHorizontal: 14,
    color: '#0f172a',
    fontSize: 13,
  },
  headerCell: {
    fontWeight: '800',
    color: '#33517a',
  },
  periodCell: {
    width: 74,
  },
  dateCell: {
    width: 142,
  },
  valueCell: {
    width: 150,
  },
  periodText: {
    fontWeight: '800',
    color: '#1565d8',
  },
  principalText: {
    fontWeight: '700',
  },
});

export default CashFlowTable;
