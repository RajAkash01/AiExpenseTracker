import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, radius, shadows } from '../theme';
import { Expense } from '../types';
import { addExpense, getExpenses, deleteExpense } from '../services/api';
import ExpenseInput from '../components/ExpenseInput';
import SuccessCard from '../components/SuccessCard';
import ExpenseList from '../components/ExpenseList';

export default function ExpenseTrackerScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [successExpense, setSuccessExpense] = useState<Expense | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to fetch expenses');
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchExpenses();
    setRefreshing(false);
  };

  const handleAddExpense = async (input: string) => {
    setLoading(true);
    setError(null);
    setSuccessExpense(null);

    try {
      const expense = await addExpense(input);
      setSuccessExpense(expense);
      setExpenses((prev) => [expense, ...prev]);
      setTimeout(() => setSuccessExpense(null), 3000);
    } catch (err: any) {
      const message = err.message || 'Failed to add expense';
      setError(message);
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExpense = async (id: number) => {
    const previousExpenses = expenses;
    setDeletingId(id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));

    try {
      await deleteExpense(id);
    } catch (err: any) {
      setExpenses(previousExpenses);
      Alert.alert('Error', err.message || 'Failed to delete expense');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient
        colors={['#6C5CE7', '#8B7CF6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>AI Expense Tracker</Text>
        <Text style={styles.headerSubtitle}>Add expenses in plain English</Text>
      </LinearGradient>

      <ExpenseInput onSubmit={handleAddExpense} loading={loading} />

      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {successExpense && <SuccessCard expense={successExpense} />}

      <ExpenseList
        expenses={expenses}
        onDelete={handleDeleteExpense}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        deletingId={deletingId}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 52,
    paddingBottom: 20,
    paddingHorizontal: spacing.screenH,
    ...shadows.lg,
  },
  headerTitle: {
    ...typography.h1,
    color: colors.textInverse,
  },
  headerSubtitle: {
    fontSize: typography.bodySmall.fontSize,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.75)',
    marginTop: spacing.xs,
  },
  errorBanner: {
    marginHorizontal: spacing.screenH,
    marginTop: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.errorSurface,
    borderLeftWidth: 3,
    borderLeftColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.bodySmall.fontSize,
    fontWeight: '500',
  },
});
