/**
 * Testimonials — safe fallback for Google Reviews (no scraping).
 * Replace text with verified Google review text when available.
 * Video testimonials are the client's own recorded review videos.
 */
export type Testimonial = {
  name: string;
  event: string;
  rating: number;
  text: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Wedding Client",
    event: "Friend's Wedding",
    rating: 5,
    text: "Ananya did an impressive job hosting the wedding. Everything was excellent and handled beautifully. She looked stunning and her energy was so encouraging that the event felt different after she arrived. A truly memorable host.",
  },
  {
    name: "Corporate Client",
    event: "Family Day",
    rating: 5,
    text: "Professional, punctual and completely in command of the stage. She kept every segment on time and the audience engaged from start to finish.",
  },
  {
    name: "Baby Shower Host",
    event: "Baby Shower, Airoli",
    rating: 5,
    text: "She turned our baby shower into the most beautiful blend of tradition and fun. The games, the emotions, the flow — everything felt effortless.",
  },
  {
    name: "Sangeet Family",
    event: "Sangeet Night",
    rating: 5,
    text: "From family performances to couple games, Ananya carried the whole night with so much warmth and glamour. Our guests are still talking about it.",
  },
  {
    name: "Event Agency",
    event: "Brand Launch",
    rating: 5,
    text: "Sharp, camera-ready and brilliant with brand messaging. She kept the spotlight on the product while keeping the crowd energised.",
  },
];

export const videoTestimonials = [
  { src: "/media/reviews/review-1.mp4", poster: "/media/reviews/review-1-poster.jpg", label: "Client Review — Wedding" },
  { src: "/media/reviews/review-2.mp4", poster: "/media/reviews/review-2-poster.jpg", label: "Client Review — Celebration" },
  { src: "/media/reviews/review-3.mp4", poster: "/media/reviews/review-3-poster.jpg", label: "Client Review — Event" },
  { src: "/media/reviews/review-4.mp4", poster: "/media/reviews/review-4-poster.jpg", label: "Client Review — Function" },
  { src: "/media/reviews/review-5.mp4", poster: "/media/reviews/review-5-poster.jpg", label: "Client Review — Party" },
];
