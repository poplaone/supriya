export function cn(...inputs) {
  // Simple className concatenation without Tailwind utilities
  return inputs.filter(Boolean).join(' ');
}