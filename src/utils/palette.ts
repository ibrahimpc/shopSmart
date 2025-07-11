export const colors = {
  primary: '#059669',
  primaryLight: '#dbeafe',
  primaryDark: '#047857',
  secondary: '#2563EB',
  secondaryLight: '#dbeafe',
  accent: '#DC2626',
  accentLight: '#fef2f2',
  white: '#ffffff',
  black: '#000000',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  background: '#f8f9fa',
  cardBackground: '#ffffff',
  textPrimary: '#1f2937',
  textSecondary: '#6b7280',
  textLight: '#9ca3af',
  textWhite: '#ffffff',
  success: '#059669',
  error: '#dc2626',
  warning: '#f59e0b',
  info: '#3b82f6',
  border: '#e5e7eb',
  borderLight: '#d1d5db',
  shadow: '#000000',
  overlay: '#000000',
} as const;

export type ColorKey = keyof typeof colors;
