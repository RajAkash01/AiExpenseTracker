import React from 'react';
import {
  View,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { colors, radius, shadows, typography, spacing, categoryColors, categoryEmojis } from '../theme';
import { Expense } from '../types';

interface Props {
  expense: Expense;
  onDelete: (id: number) => void;
  deleting: boolean;
}

function formatTimeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr + 'Z').getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
  if (diffHr < 24) return `${diffHr} hour${diffHr > 1 ? 's' : ''} ago`;
  if (diffDay < 2) return 'Yesterday';
  return `${diffDay} days ago`;
}

export default function ExpenseItem({ expense, onDelete, deleting }: Props) {
  const catColor = categoryColors[expense.category] || categoryColors['Other'];
  const emoji = categoryEmojis[expense.category] || categoryEmojis['Other'];
  const currencySymbol = expense.currency === 'INR' ? '\u20B9' : expense.currency === 'USD' ? '$' : expense.currency;

  const handleDelete = () => {
    Alert.alert(
      'Delete Expense?',
      'Are you sure you want to delete this expense?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDelete(expense.id) },
      ]
    );
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: catColor.bg }]}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description} numberOfLines={1}>
          {expense.description}
        </Text>
        <Text style={styles.category} numberOfLines={1}>
          {expense.category}{expense.merchant ? ` \u00B7 ${expense.merchant}` : ''}
        </Text>
        <Text style={styles.time}>{formatTimeAgo(expense.created_at)}</Text>
      </View>

      <View style={styles.rightColumn}>
        <Text style={styles.amount}>
          {currencySymbol}{expense.amount.toLocaleString()}
        </Text>
        <Pressable
          style={({ pressed }) => [
            styles.deleteButton,
            pressed && styles.deleteButtonPressed,
          ]}
          onPress={handleDelete}
          disabled={deleting}
        >
          {deleting ? (
            <ActivityIndicator size="small" color={colors.error} />
          ) : (
            <Text style={styles.deleteIcon}>{'\u2715'}</Text>
          )}
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingVertical: 14,
    paddingHorizontal: spacing.base,
    borderRadius: 14,
    marginHorizontal: spacing.screenH,
    marginBottom: spacing.listItemGap,
    ...shadows.sm,
  },
  containerPressed: {
    backgroundColor: colors.background,
    transform: [{ scale: 0.99 }],
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: radius.iconContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  emoji: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  description: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 3,
  },
  category: {
    fontSize: typography.bodySmall.fontSize,
    color: colors.textSecondary,
  },
  time: {
    fontSize: 11,
    color: colors.textTertiary,
    marginTop: 2,
  },
  rightColumn: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.error,
    letterSpacing: -0.2,
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.errorSurface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  deleteButtonPressed: {
    backgroundColor: colors.errorLight,
    transform: [{ scale: 0.92 }],
  },
  deleteIcon: {
    fontSize: 14,
    color: colors.error,
  },
});
