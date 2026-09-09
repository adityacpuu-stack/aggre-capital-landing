import { applicationEmail, isAllowedStatus } from "@/lib/email-templates";
export { sendEmail } from "@/lib/resend-email";

export const emailTemplates = {
  applicationReceived: (customerName: string, applicationId: string) =>
    applicationEmail({ customerName, applicationId, status: "pending" }),
  applicationStatusUpdate: (
    customerName: string,
    applicationId: string,
    status: string,
    message?: string,
  ) => {
    if (!isAllowedStatus(status)) throw new Error("Invalid application status");
    return applicationEmail({ customerName, applicationId, status, message });
  },
};
