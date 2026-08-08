/**
 * All page copy in one place, so it can be rewritten without touching layout.
 */
export const site = {
  name: "Altura",
  eyebrow: "Package tours, end to end",
  headline: {
    lead: "The world,",
    accent: "already planned.",
  },
  subhead:
    "Curated package tours — flights, hotels, and local guides in a single booking. You just show up.",
  cta: "Request a trip",
  /* 555-01xx is the reserved fictional range — it cannot ring a real person. */
  contact: {
    phone: "+1 (415) 555-0142",
    phoneHref: "tel:+14155550142",
    hours: "Mon–Fri, 9–6 PT",
  },
  highlights: [
    "Small groups",
    "Flights + hotels included",
    "40+ destinations",
  ],
  dialog: {
    title: "Request a trip",
    description:
      "Tell us roughly what you have in mind. A trip planner replies within one business day with two or three options.",
    submit: "Send request",
    successTitle: "Request received",
    successBody:
      "Thanks — we have your details. A trip planner will be in touch within one business day.",
    closeLabel: "Close",
  },
} as const

export const destinationOptions = [
  "Not sure yet",
  "Japan",
  "Vietnam & Cambodia",
  "Italy",
  "Portugal & Spain",
  "Iceland",
  "Morocco",
  "Peru",
  "New Zealand",
] as const
