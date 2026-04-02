import React, { useState } from 'react';
import {
  View,
  TextInput,
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { colors, radius, shadows, typography, spacing } from '../theme';

interface Props {
  onSubmit: (input: string) => void;
  loading: boolean;
}

export default function ExpenseInput({ onSubmit, loading }: Props) {
  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);

  const canSubmit = text.trim().length > 0 && !loading;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit(text.trim());
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          focused && styles.inputFocused,
        ]}
        placeholder="e.g., Spent 500 on groceries at BigBazaar"
        placeholderTextColor={colors.textTertiary}
        value={text}
        onChangeText={setText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        multiline={false}
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
        editable={!loading}
      />
      <Pressable
        style={({ pressed }) => [
          styles.button,
          canSubmit && shadows.primary,
          !canSubmit && styles.buttonDisabled,
          pressed && canSubmit && styles.buttonPressed,
        ]}
        onPress={handleSubmit}
        disabled={!canSubmit}
      >
        {loading ? (
          <ActivityIndicator color={colors.textInverse} />
        ) : (
          <Text style={[styles.buttonText, !canSubmit && styles.buttonTextDisabled]}>
            Add Expense
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.screenH,
    paddingVertical: spacing.md,
  },
  input: {
    height: 52,
    backgroundColor: colors.background,
    borderRadius: radius.input,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: spacing.base,
    fontSize: typography.body.fontSize,
    color: colors.textPrimary,
  },
  inputFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.surface,
    ...shadows.primary,
  },
  button: {
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  buttonDisabled: {
    backgroundColor: colors.border,
  },
  buttonPressed: {
    backgroundColor: colors.primaryDark,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: colors.textInverse,
    fontSize: typography.button.fontSize,
    fontWeight: typography.button.fontWeight,
    letterSpacing: typography.button.letterSpacing,
  },
  buttonTextDisabled: {
    color: colors.textTertiary,
  },
});
