import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Copyright Policy",
  description: "Copyright and content-usage policy for the Anchor Ananya Kundu website.",
  alternates: { canonical: "/copyright-policy/" },
  robots: { index: false },
};

export default function CopyrightPage() {
  return (
    <LegalPage
      title="Copyright Policy"
      updated="July 2026"
      intro="All content on this website is protected. This policy explains what you may and may not do with it."
      sections={[
        {
          heading: "Ownership of Content",
          body: [
            "All photographs, videos, text, logos, graphics and design elements on this website are the property of Ananya Kundu or are used with permission from the respective photographers, videographers and event hosts.",
          ],
        },
        {
          heading: "Permitted Use",
          body: [
            "You may view and share links to this website for personal, non-commercial purposes. Sharing published social-media posts using the platforms' built-in share features is welcome.",
          ],
        },
        {
          heading: "Prohibited Use",
          body: [
            "Content from this website may not be copied, reproduced, edited, republished or used for commercial purposes without prior written permission. This includes using event photographs or videos in promotional material for other services.",
          ],
        },
        {
          heading: "Client & Event Imagery",
          body: [
            "Event photos and videos are displayed to showcase professional work, with care taken to respect the events and people featured. If you appear in any image or video and would like it removed, please write in — removal requests are honoured promptly.",
          ],
        },
        {
          heading: "Requests & Permissions",
          body: [
            `For usage permissions, credits or removal requests, contact ${site.email}.`,
          ],
        },
      ]}
    />
  );
}
