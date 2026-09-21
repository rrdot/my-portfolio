// Small process-wide budget protects email delivery without trusting client IP headers.
// For multiple instances, enforce a shared limit at the edge or use a shared store.
let windowStart = Date.now();
let submissions = 0;
export function allowContactSubmission(now = Date.now()) {
  if (now - windowStart >= 60000) {
    windowStart = now;
    submissions = 0;
  }
  if (submissions >= 5) return false;
  submissions++;
  return true;
}
