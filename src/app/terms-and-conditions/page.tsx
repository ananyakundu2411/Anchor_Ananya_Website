import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using the Anchor Ananya Kundu website and booking anchoring services.",
  alternates: { canonical: "/terms-and-conditions/" },
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="July 2026"
      intro="By using this website or making a booking enquiry, you agree to the following terms. Please read them carefully."
      sections={[
        {
          heading: "Services",
          body: [
            "Anchor Ananya Kundu provides professional anchoring, emcee and event-hosting services for weddings, corporate events, brand launches, college and cultural events, private celebrations and live shows.",
            "All information on this website is provided for general information about these services and does not constitute a binding offer.",
          ],
        },
        {
          heading: "Enquiries & Bookings",
          body: [
            "Submitting an enquiry does not confirm a booking. Bookings are confirmed only after mutual written agreement (including via WhatsApp or email) on the date, scope and fee, and any agreed advance payment.",
            "Event dates are allocated on a first-confirmed basis.",
          ],
        },
        {
          heading: "Cancellations & Changes",
          body: [
            "Cancellation and rescheduling terms, including any advance-payment adjustments, are agreed at the time of booking and communicated in writing.",
          ],
        },
        {
          heading: "Website Use",
          body: [
            "You agree not to misuse this website, attempt to gain unauthorised access, or use its content in ways that infringe the rights described in the Copyright Policy.",
          ],
        },
        {
          heading: "Limitation of Liability",
          body: [
            "While every effort is made to keep this website accurate and available, no guarantee is given that it will be error-free or uninterrupted. To the maximum extent permitted by law, liability for indirect or consequential loss arising from use of this website is excluded.",
          ],
        },
        {
          heading: "Governing Law",
          body: [
            "These terms are governed by the laws of India. Any disputes are subject to the jurisdiction of the courts of Maharashtra, India.",
          ],
        },
        {
          heading: "Contact",
          body: [`Questions about these terms? Write to ${site.email}.`],
        },
      ]}
    />
  );
}
