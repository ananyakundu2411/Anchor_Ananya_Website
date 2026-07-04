import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Anchor Ananya Kundu's website collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy-policy/" },
  robots: { index: false },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="July 2026"
      intro="This Privacy Policy explains how this website collects, uses and protects the personal information you share when you browse the site or send an enquiry. Your privacy matters, and only the information needed to respond to you is collected."
      sections={[
        {
          heading: "Information We Collect",
          body: [
            "When you submit the enquiry form or contact us via WhatsApp or email, we collect the details you provide — typically your name, phone number, email address, event type, event date, location, expected audience size and message.",
            "We do not collect payment information through this website.",
          ],
        },
        {
          heading: "How Your Information Is Used",
          body: [
            "Your details are used solely to respond to your enquiry, discuss your event requirements, prepare quotations and coordinate bookings. Your information is never sold or rented to third parties.",
          ],
        },
        {
          heading: "Third-Party Services",
          body: [
            "Enquiries may be delivered through trusted third-party form or email services. Links to WhatsApp, Instagram, YouTube, Facebook and Google Maps are governed by those platforms' own privacy policies once you leave this site.",
          ],
        },
        {
          heading: "Data Retention & Security",
          body: [
            "Enquiry details are kept only as long as needed to manage your event conversation and reasonable follow-up. Reasonable technical measures are used to protect data in transit.",
          ],
        },
        {
          heading: "Your Rights",
          body: [
            `You may request access to, correction of, or deletion of your personal information at any time by writing to ${site.email}.`,
          ],
        },
        {
          heading: "Contact",
          body: [
            `For any privacy-related questions, contact ${site.email} or WhatsApp ${site.whatsapp.number}.`,
          ],
        },
      ]}
    />
  );
}
