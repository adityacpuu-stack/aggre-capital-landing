import { sendEmail } from "@/lib/resend-email";
import {
  adminApplicationEmail,
  applicationEmail,
  isAllowedStatus,
} from "@/lib/email-templates";
export { sendEmail, getEmailConfiguration } from "@/lib/resend-email";

export interface ApplicationNotificationData {
  applicationId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  amount: number;
  purpose: string;
  status: string;
  submittedAt: Date;
  additionalDetails?: {
    address?: string;
    occupation?: string;
    workplace?: string;
    collateralType?: string;
    collateralAddress?: string;
  };
}

export async function sendApplicationNotification(
  data: ApplicationNotificationData,
) {
  return sendEmail({
    to: process.env.ADMIN_EMAIL || "",
    ...adminApplicationEmail(data),
  });
}

export async function sendCustomerConfirmation(
  data: ApplicationNotificationData,
) {
  return sendEmail({
    to: data.customerEmail,
    ...applicationEmail({
      ...data,
      status: isAllowedStatus(data.status) ? data.status : "pending",
    }),
  });
}
