import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Cookies Policy",
  description: "How cookies and similar technologies are used on the Anchor Ananya Kundu website.",
  alternates: { canonical: "/cookies-policy/" },
  robots: { index: false },
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookies Policy"
      updated="July 2026"
      intro="This website keeps things light — it does not set tracking cookies of its own. Here is exactly what happens in your browser when you visit."
      sections={[
        {
          heading: "First-Party Cookies",
          body: [
            "This website does not use its own advertising or analytics cookies. Basic technical storage may be used by your browser to remember display preferences.",
          ],
        },
        {
          heading: "Third-Party Content",
          body: [
            "Some sections link out to or embed content from third-party platforms such as WhatsApp, Instagram, YouTube, Facebook and Google Maps. When you interact with those links or embeds, those platforms may set their own cookies according to their policies.",
          ],
        },
        {
          heading: "Analytics (If Enabled Later)",
          body: [
            "If privacy-friendly analytics are added in the future, this page will be updated to describe what is collected and how to opt out.",
          ],
        },
        {
          heading: "Managing Cookies",
          body: [
            "You can control and delete cookies through your browser settings. Blocking third-party cookies will not affect your ability to browse this website.",
          ],
        },
        {
          heading: "Contact",
          body: [`Questions about this policy? Write to ${site.email}.`],
        },
      ]}
    />
  );
}
