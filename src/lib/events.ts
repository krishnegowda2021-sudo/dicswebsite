import { catalogAssetUrl } from "@/lib/catalog-asset-url";
import cover30 from "@/assets/events/dics-30-years.jpg.asset.json";
import automationControl from "@/assets/events/automation-control.jpg.asset.json";
import plcHmi from "@/assets/events/plc-hmi-scada.jpg.asset.json";
import drives from "@/assets/events/drives-motion.jpg.asset.json";
import integration from "@/assets/events/system-integration.jpg.asset.json";
import ind1 from "@/assets/events/industry-1.jpg.asset.json";
import ind2 from "@/assets/events/industry-2.jpg.asset.json";
import ind3 from "@/assets/events/industry-3.jpg.asset.json";
import expo1 from "@/assets/events/automation-expo-chennai-1.jpg.asset.json";
import expo2 from "@/assets/events/automation-expo-chennai-2.jpg.asset.json";
import expo3 from "@/assets/events/automation-expo-chennai-3.jpg.asset.json";
import expo4 from "@/assets/events/automation-expo-chennai-4.jpg.asset.json";
import expo5 from "@/assets/events/automation-expo-chennai-5.jpg.asset.json";

export type EventFeature = { title: string; text: string; image?: string };

export type SiteEvent = {
  slug: string;
  title: string;
  eyebrow: string;
  tagline: string;
  summary: string;
  cover: string;
  intro: string[];
  callout?: { lines: string[]; signature?: string };
  stats?: { value: string; label: string }[];
  featuresTitle: string;
  features: EventFeature[];
  gallery: string[];
  listTitle?: string;
  listIntro?: string;
  list?: string[];
  closing: string[];
};

const u = catalogAssetUrl;

export const events: SiteEvent[] = [
  {
    slug: "30-years-of-engineering-progress",
    title: "30 Years of Engineering Progress",
    eyebrow: "Since 1996",
    tagline: "Building the Future of Industrial Automation",
    summary: "Three decades of engineering, innovation and customer trust — celebrating 30 years of DICS Global & Sansree Automations.",
    cover: u(cover30),
    intro: [
      "For three decades, our journey has been driven by a passion for engineering, a commitment to innovation, and the trust of our customers. Since 1996, we have continuously evolved alongside the changing industrial landscape, delivering reliable automation technologies, industrial control systems, and engineering solutions that help businesses move forward.",
      "From simplifying complex industrial processes to supporting smarter, more efficient operations, our focus has always been on combining proven technology with practical engineering expertise. Every project, partnership, and milestone has strengthened our commitment to quality, reliability, and customer satisfaction.",
      "Over the years, we have built lasting relationships with customers, technology partners, and industry professionals who share our vision for progress. Their trust and collaboration remain at the heart of everything we do.",
      "As we celebrate this remarkable milestone, we look back with pride on the journey that has shaped us and look ahead with renewed ambition to embrace new technologies, explore new possibilities, and contribute to the future of industrial automation.",
    ],
    callout: {
      lines: ["30 Years of Innovation.", "30 Years of Trust.", "30 Years of Progress."],
      signature: "DICS Global & Sansree Automations",
    },
    featuresTitle: "What we do",
    features: [
      { title: "Industrial Automation & Control", text: "Control architectures and automation solutions designed to support efficient, reliable manufacturing operations.", image: u(automationControl) },
      { title: "PLC, HMI & SCADA Systems", text: "Monitoring, machine control and process visualisation solutions for industrial applications.", image: u(plcHmi) },
      { title: "Drives & Motion Control", text: "Drive and motion technologies that support machine performance and precise control.", image: u(drives) },
      { title: "Engineering & System Integration", text: "Engineering, control panel solutions, commissioning and technical support for industrial automation projects.", image: u(integration) },
    ],
    gallery: [u(ind1), u(ind2), u(ind3)],
    listTitle: "Supporting diverse industrial applications",
    listIntro: "Our industrial automation solutions serve a broad range of applications across manufacturing and process industries, including:",
    list: [
      "Automotive and discrete manufacturing",
      "Food, beverage and pharmaceutical processing",
      "Steel, metal and textile industries",
      "Printing, packaging and material handling",
      "Power, solar and energy applications",
      "Water treatment and process industries",
      "Hoist, crane and elevator applications",
    ],
    closing: [
      "We focus on understanding each application’s requirements and delivering suitable products, engineering expertise and technical support.",
    ],
  },
  {
    slug: "automation-expo-south-dics-chennai",
    title: "Automation Expo South – Chennai",
    eyebrow: "Exhibition · Chennai Trade Centre",
    tagline: "DICS Showcases Industrial Automation Excellence at Automation Expo South",
    summary: "DICS showcased PLC, SCADA and DCS integrations, Industrial IoT, custom control panels and turnkey projects at the Chennai Trade Centre.",
    cover: u(expo4),
    intro: [
      "Digital Instrument and Control Systems (DICS) proudly marked its presence at the prestigious Automation Expo South, held at the Chennai Trade Centre — an event that brought together innovators, solution providers, and industry leaders from across the automation and process control landscape.",
      "As a frontrunner in industrial automation and control system integration, DICS utilized this platform to showcase its latest innovations, engage with industry stakeholders, and demonstrate its commitment to driving intelligent automation across core industrial sectors.",
    ],
    stats: [
      { value: "100%", label: "Quality Service" },
      { value: "100%", label: "Plan Execution" },
      { value: "100%", label: "Service Commitment" },
    ],
    featuresTitle: "Highlighting next-gen automation capabilities",
    features: [
      { title: "Advanced PLC, SCADA & DCS Integrations", text: "Visitors experienced real-time demos of our scalable control architectures designed for seamless plant automation and supervisory control, ensuring operational transparency, safety, and precision." },
      { title: "Industrial IoT Solutions", text: "We presented our capabilities in sensor-based data acquisition, predictive maintenance, and cloud-integrated monitoring systems, aligning with Industry 4.0 and smart factory initiatives." },
      { title: "Custom Control Panels & Engineering Excellence", text: "Attendees explored our precision-engineered MCCs, PCCs, and automation panels, all built to international standards and deployed across critical infrastructure projects nationwide." },
      { title: "Turnkey Project Execution", text: "Our team shared case studies highlighting successful implementations of end-to-end automation projects, underscoring our strength in system design, installation, commissioning, and lifecycle support." },
    ],
    gallery: [u(expo1), u(expo2), u(expo3), u(expo5)],
    listTitle: "Engaging with industry leaders",
    listIntro: "Our booth attracted professionals from sectors including manufacturing, energy, infrastructure, water treatment, pharmaceuticals, and oil & gas. The event provided an exceptional opportunity for DICS to connect with technology partners, industrial clients, and fellow innovators through detailed technical discussions, live demonstrations, and one-on-one consultations.",
    closing: [
      "From discussions around energy optimization and digital twins, to exploring the future of AI-powered control systems, Automation Expo South was not just an exhibition — it was a platform for shaping the future of automation together.",
      "Participation in Automation Expo South was a key milestone that validated our mission to empower industries through intelligent, integrated, and future-ready automation solutions. We extend our sincere thanks to all visitors, collaborators, and the organizers of Automation Expo South for making this event a success.",
      "Stay connected with Digital Instrument and Control Systems as we continue to transform industrial landscapes — one intelligent system at a time.",
    ],
  },
];

export function getEvent(slug: string): SiteEvent | undefined {
  return events.find((e) => e.slug === slug);
}
