import { sendEmail } from "@/lib/email-service";
import {
  applicationEmail,
  type ApplicationStatus,
} from "@/lib/email-templates";
export { ALLOWED_STATUSES, isAllowedStatus } from "@/lib/email-templates";
export type { ApplicationStatus } from "@/lib/email-templates";

interface StatusEmailInput {
  applicationId: string;
  status: ApplicationStatus;
  email: string;
  customerName?: string;
}

export async function sendStatusEmail(input: StatusEmailInput) {
  return sendEmail({ to: input.email, ...applicationEmail(input) });
}
