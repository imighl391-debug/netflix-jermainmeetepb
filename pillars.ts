// src/data/pillars.ts
export interface Proof {
  title: string;
  content: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface Pillar {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  trailer: string;
  proofs: Proof[];
  faqs: FAQ[];
  GHLForm: string;
}

export const pillars: Pillar[] = [
  {
    id: "ai-strategist",
    title: "AI Strategist",
    description: "Jermaine helps businesses leverage AI...",
    bullets: ["Bullet 1", "Bullet 2", "Bullet 3"],
    trailer: "/videos/ai-trailer.jpg",
    proofs: [
      { title: "Company X", content: "Implemented AI workflows" },
      { title: "Startup Y", content: "Built AI dashboard" },
    ],
    faqs: [
      { q: "How can AI help?", a: "It automates processes." },
      { q: "Do you provide support?", a: "Yes." },
    ],
    GHLForm: "<iframe src='https://your-ghl-form-link.com'></iframe>",
  },
  // Add other pillars
];
