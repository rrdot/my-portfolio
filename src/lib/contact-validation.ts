export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
}
export function validateContact(value: unknown): {
  data?: ContactInput;
  error?: string;
} {
  if (!value || typeof value !== "object")
    return { error: "Please complete all fields." };
  const input = value as Record<string, unknown>;
  const limits = { name: 100, email: 254, subject: 150, message: 5000 };
  for (const [key, limit] of Object.entries(limits)) {
    if (
      typeof input[key] !== "string" ||
      !input[key].trim() ||
      input[key].length > limit
    )
      return {
        error: `Please enter a valid ${key} (up to ${limit} characters).`,
      };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email as string))
    return { error: "Please enter a valid email address." };
  return {
    data: {
      name: (input.name as string).trim(),
      email: (input.email as string).trim(),
      subject: (input.subject as string).trim(),
      message: (input.message as string).trim(),
      website: typeof input.website === "string" ? input.website : "",
    },
  };
}
