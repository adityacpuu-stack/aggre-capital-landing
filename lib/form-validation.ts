export function isValidPhone(value: unknown): value is string {
  if (typeof value !== "string" || value.length > 30) return false;
  const phone = value.trim();
  const digits = phone.replace(/\D/g, "");
  return /^\+?[0-9 ()-]+$/.test(phone) && digits.length >= 8 && digits.length <= 15;
}
