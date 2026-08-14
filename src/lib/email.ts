/** RFC 5321 practical upper bound for an email address. */
export const EMAIL_MAX_LENGTH = 254;

/** MailerLite default `name` field limit. */
export const NAME_MAX_LENGTH = 255;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  const email = value.trim();
  return email.length > 0 && email.length <= EMAIL_MAX_LENGTH && EMAIL_REGEX.test(email);
}

export function isValidName(value: string): boolean {
  const name = value.trim();
  return name.length > 0 && name.length <= NAME_MAX_LENGTH;
}
