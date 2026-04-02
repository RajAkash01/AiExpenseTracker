import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, shadows, typography, spacing, categoryEmojis } from '../theme';
import { Expense } from '../types';

interface Props {
  expense: Expense;
}

export default function SuccessCard({ expense }: Props) {
  const emoji = categoryEmojis[expense.category] || categoryEmojis['Other'];
  const currencySymbol = expense.currency === 'INR' ? '\u20B9' : expense.currency === 'USD' ? '$' : expense.currency;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'\u2713'} Added Successfully!</Text>
      <View style={styles.details}>
        <Text style={styles.amount}>
          {currencySymbol}{expense.amount.toLocaleString()}
        </Text>
        <Text style={styles.category}>
          {emoji} {expense.category}
        </Text>
        <Text style={styles.description}>{expense.description}</Text>
        {expense.merchant && (
          <Text style={styles.merchant}>at {expense.merchant}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.successSurface,
    borderRadius: radius.card,
    padding: spacing.cardPadding,
    marginHorizontal: spacing.screenH,
    marginVertical: spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
    ...shadows.success,
  },
  title: {
    color: colors.successDark,
    fontSize: typography.subtitle.fontSize,
    fontWeight: '600',
  },
  details: {
    marginTop: spacing.md,
  },
  amount: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  category: {
    fontSize: typography.subtitle.fontSize,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  description: {
    fontSize: typography.subtitle.fontSize,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  merchant: {
    fontSize: typography.bodySmall.fontSize,
    color: colors.textTertiary,
    fontStyle: 'italic',
    marginTop: spacing.xs,
  },
});
