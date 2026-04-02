export const colors = {
  // Primary — Rich Purple (brand identity)
  primary: '#6C5CE7',
  primaryDark: '#5A4BD1',
  primaryLight: '#A29BFE',
  primarySurface: '#F0EDFF',

  // Semantic — Success
  success: '#00B894',
  successDark: '#00A381',
  successLight: '#D5F5ED',
  successSurface: '#EAFAF5',

  // Semantic — Error
  error: '#E17055',
  errorDark: '#CC5E45',
  errorLight: '#FDECEA',
  errorSurface: '#FFF5F3',

  // Neutrals
  background: '#F8F9FD',
  surface: '#FFFFFF',
  border: '#E8ECF4',
  borderLight: '#F0F3F9',
  textPrimary: '#2D3436',
  textSecondary: '#636E72',
  textTertiary: '#B2BEC3',
  textInverse: '#FFFFFF',
};

export const categoryColors: Record<string, { bg: string; text: string }> = {
  'Food & Dining':     { bg: '#FFE8E5', text: '#FF7675' },
  'Transport':         { bg: '#E5F2FF', text: '#74B9FF' },
  'Shopping':          { bg: '#F0EDFF', text: '#A29BFE' },
  'Entertainment':     { bg: '#FFE5F0', text: '#FD79A8' },
  'Bills & Utilities': { bg: '#FFF6E0', text: '#FDCB6E' },
  'Health':            { bg: '#E5FFF5', text: '#55EFC4' },
  'Travel':            { bg: '#FFE9E2', text: '#E17055' },
  'Other':             { bg: '#F0F3F9', text: '#B2BEC3' },
};

export const typography = {
  h1:        { fontSize: 26, fontWeight: '700' as const, lineHeight: 34, letterSpacing: -0.3 },
  h2:        { fontSize: 22, fontWeight: '600' as const, lineHeight: 30 },
  h3:        { fontSize: 18, fontWeight: '600' as const, lineHeight: 26 },
  subtitle:  { fontSize: 14, fontWeight: '500' as const, lineHeight: 20 },
  body:      { fontSize: 15, fontWeight: '400' as const, lineHeight: 22 },
  bodySmall: { fontSize: 13, fontWeight: '400' as const, lineHeight: 20 },
  caption:   { fontSize: 12, fontWeight: '400' as const, lineHeight: 16, letterSpacing: 0.3 },
  button:    { fontSize: 16, fontWeight: '600' as const, lineHeight: 24, letterSpacing: 0.3 },
  amount:    { fontSize: 20, fontWeight: '700' as const, lineHeight: 28, letterSpacing: -0.2 },
  amountLarge: { fontSize: 32, fontWeight: '700' as const, lineHeight: 40, letterSpacing: -0.5 },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  screenH: 20,
  screenV: 16,
  cardPadding: 16,
  sectionGap: 24,
  listItemGap: 10,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
  card: 16,
  button: 12,
  input: 12,
  badge: 20,
  iconContainer: 14,
};

export const shadows = {
  sm: {
    shadowColor: '#2D3436',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  md: {
    shadowColor: '#2D3436',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#2D3436',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  primary: {
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 12,
    elevation: 6,
  },
  success: {
    shadowColor: '#00B894',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  error: {
    shadowColor: '#E17055',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
};

export const categoryEmojis: Record<string, string> = {
  'Food & Dining': '\u{1F354}',
  'Transport': '\u{1F697}',
  'Shopping': '\u{1F6D2}',
  'Entertainment': '\u{1F4FA}',
  'Bills & Utilities': '\u{1F4C4}',
  'Health': '\u{1F48A}',
  'Travel': '\u{2708}\u{FE0F}',
  'Other': '\u{1F4E6}',
};
