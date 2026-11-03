import controlPanel from "@/assets/control-panel.jpg";
import heroPlant from "@/assets/hero-plant.jpg";
import indAuto from "@/assets/ind-auto.jpg";
import indPharma from "@/assets/ind-pharma.jpg";
import indWater from "@/assets/ind-water.jpg";
import indFood from "@/assets/ind-food.jpg";

/** Verified from dicsglobal.com (contact-us and about-us pages). */
export const company = {
  name: "Digital Instruments & Control Systems",
  short: "DICS",
  founded: 1996,
  tagline: "Empowering Industries… Through Automation",
  phones: [
    { label: "+91-80-23235465", href: "tel:+918023235465" },
    { label: "+91-80-23232773", href: "tel:+918023232773" },
  ],
  email: "bangalore@dicsglobal.com",
  address: "B-261, 6th Main, 2nd Stage, Peenya Industrial Estate, Bangalore, Karnataka 560058",
  mapUrl: "https://maps.google.com/?q=Digital+Instruments+%26+Control+Systems,+B-261,+6th+Main+Rd,+Peenya,+Bengaluru+560058",
  socials: [
    { name: "LinkedIn", href: "https://www.linkedin.com/company/digital-instruments-&-control-systems" },
    { name: "Facebook", href: "https://www.facebook.com/dicsglobal" },
    { name: "Instagram", href: "https://www.instagram.com/dics_global/" },
    { name: "YouTube", href: "https://www.youtube.com/@DICS_GLOBAL" },
    { name: "X", href: "https://x.com/dicsglobal" },
  ],
};

export type Office = { city: string; address: string; phone?: string; phoneHref?: string; email: string; note?: string };
export const offices: Office[] = [
  { city: "Bangalore (Head Office)", address: "B-261, 6th Main, 2nd Stage, Peenya Industrial Estate, Bangalore, Karnataka 560058", phone: "+91-80-23235465 / 23232773", phoneHref: "tel:+918023235465", email: "bangalore@dicsglobal.com" },
  { city: "Chennai", address: "A4/3, Krishna Tower, III Phase, Thiru-vi-ka Industrial Estate, Guindy, Chennai, Tamil Nadu 600032", phone: "+91-44-22501141 / 22501142", phoneHref: "tel:+914422501141", email: "chennai@dicsglobal.com" },
  { city: "Coimbatore", address: "No. 1054, Ground Floor, Gowtham Centre Annexe, Near Anna Statue, Avinashi Road, Coimbatore, Tamil Nadu 641018", phone: "+91-422-2236446", phoneHref: "tel:+914222236446", email: "coimbatore@dicsglobal.com" },
  { city: "Lucknow", address: "Shop No. UGF-4, Parijat Palace, Near Ishwarpuri Colony, Sector-12, Indira Nagar, Lucknow, Uttar Pradesh 226016", phone: "+91-522-4624154", phoneHref: "tel:+915224624154", email: "lucknow@dicsglobal.com" },
  { city: "Belagavi", address: "Plot No. 77, 1st Floor, 2nd Stage, Rani Chennamma Nagar, Belagavi, Karnataka 590006", phone: "+91-95358 74333", phoneHref: "tel:+919535874333", email: "belagavi@dicsglobal.com" },
  { city: "Mysore", address: "1065/11, F-49/1, Sewage Farm Road, Vidyaranyapuram, 1st Main Road, Mysore, Karnataka 570008", phone: "+91-90081 01101", phoneHref: "tel:+919008101101", email: "mysore@dicsglobal.com" },
  { city: "Penukonda", address: "D. No. 1-99/9D, GIC Colony, Sri Sathya Sai District, Penukonda, Andhra Pradesh 515110", phone: "+91-81973 54053", phoneHref: "tel:+918197354053", email: "rahim@dicsglobal.com" },
  { city: "Hyderabad", address: "Plot No. 16/1/25, 1st Floor, Road No. 7, IDA Nacharam, Hyderabad, Telangana 500076", phone: "+91-40-27179400", phoneHref: "tel:+914027179400", email: "hyderabad@sansree.com", note: "Listed on dicsglobal.com (Sansree Automation)" },
  { city: "Navi Mumbai", address: "101, Mayuresh Chambers, Plot No. 60, Sector 11, CBD Belapur, Navi Mumbai, Maharashtra 400614", phone: "+91-22-27562007", phoneHref: "tel:+912227562007", email: "mumbai@sansree.com", note: "Listed on dicsglobal.com (Sansree Automation)" },
  { city: "Pune", address: "Plot No. 165, 1/14, 3rd Floor, T Block, MIDC Chowk, Bhosari, Pune, Maharashtra 411026", phone: "+91-20-29982001", phoneHref: "tel:+912029982001", email: "pune@sansree.com", note: "Listed on dicsglobal.com (Sansree Automation)" },
  { city: "Visakhapatnam", address: "D. No. 27-1-77, Ground Floor, Plot No. 16, Vidyanagar, Sri Nagar, Gajuwaka, Visakhapatnam, Andhra Pradesh 530026", phone: "+91-99897 44811", phoneHref: "tel:+919989744811", email: "vizag@sansree.com", note: "Listed on dicsglobal.com (Sansree Automation)" },
];

export type Brand = {
  slug: string;
  name: string;
  catalogName: string; // matches product.brand
  logo: string;
  origin: string;
  website: string;
  intro: string;
};
/** Brands named on dicsglobal.com/about-us as associations. No distributorship is claimed. */
export const brands: Brand[] = [
  { slug: "omron", name: "OMRON", catalogName: "OMRON", origin: "Japan", website: "https://industrial.omron.in/", intro: "OMRON Industrial Automation develops controllers, sensors, safety devices, motion and robotics products used across discrete and process manufacturing. The DICS catalogue includes OMRON PLCs, safety PLCs, temperature controllers, timers, sensors, vision systems, servo systems and robots." },
  { slug: "fuji-electric", name: "Fuji Electric", catalogName: "Fuji Electric", origin: "Japan", website: "https://www.fujielectric.com/", intro: "Fuji Electric manufactures power electronics and automation equipment including inverters, servo systems, PLCs, HMIs, temperature controllers and UPS systems. DICS lists Fuji Electric drives, controllers, HMIs and power products in its catalogue." },
  { slug: "pro-face", name: "Pro-face", catalogName: "Pro-face", origin: "Japan", website: "https://www.proface.com/", intro: "Pro-face, a Schneider Electric brand, specialises in HMI operator interfaces and industrial PCs that give operators clear visibility and control of machines and processes." },
  { slug: "autonics", name: "Autonics", catalogName: "Autonics", origin: "South Korea", website: "https://www.autonics.com/", intro: "Autonics produces sensors, controllers and motion devices — including photoelectric and proximity sensors, rotary encoders, counters, timers, panel meters and stepper motor systems." },
  { slug: "ckd", name: "CKD", catalogName: "CKD", origin: "Japan", website: "https://www.ckd.co.jp/english/", intro: "CKD Corporation manufactures pneumatic and fluid control components and automation devices, including actuators, pressure and flow sensors and related tools." },
  { slug: "idec", name: "IDEC", catalogName: "IDEC", origin: "Japan", website: "https://us.idec.com/", intro: "IDEC designs human-machine interface components and safety products, including pushbuttons, pilot lights, emergency stop and interlock switches and control boxes." },
  { slug: "wohner", name: "Wöhner", catalogName: "Wöhner", origin: "Germany", website: "https://www.woehner.com/", intro: "Wöhner develops busbar systems and power distribution components for control panels, helping panel builders create compact and safe energy distribution." },
  { slug: "patlite", name: "PATLITE", catalogName: "PATLITE", origin: "Japan", website: "https://www.patlite.com/", intro: "PATLITE manufactures visual and audible signalling devices — signal towers, beacons, LED lighting, audible alarms and networked signalling products for factory status indication." },
];

export type Service = {
  slug: string;
  title: string;
  short: string;
  body: string[];
  challenges: string[];
  related: string[]; // category slugs
};
export const services: Service[] = [
  { slug: "plc-services", title: "PLC Services", short: "PLC programming, retrofits and troubleshooting for machines and process lines.", body: ["DICS engineers design, program and commission PLC-based control architectures for individual machines and complete process lines.", "Work covers new application programming, migration of obsolete controllers, I/O expansion, communication networking and fault diagnosis on running systems."], challenges: ["Ageing or unsupported controllers", "Unplanned downtime caused by logic faults", "Integrating new equipment into existing lines"], related: ["plc", "safety-components", "automation-systems"] },
  { slug: "hmi-services", title: "HMI Services", short: "Operator panel design, screen development and HMI replacement.", body: ["We develop clear operator screens, alarm handling and recipe management so operators can run machines confidently.", "Services include HMI application development, replacement of failed or obsolete panels, and connection to PLCs and drives."], challenges: ["Unclear or cluttered operator screens", "Failed panels with no backup program", "Poor visibility of alarms and production data"], related: ["hmi-ipc"] },
  { slug: "vfd-services", title: "VFD & AC Drive Services", short: "Selection, parameterisation, commissioning and repair of variable frequency drives.", body: ["DICS supports variable frequency drive applications from motor and drive selection through parameter setup, commissioning and repair.", "Correct drive configuration helps control motor speed, reduce mechanical stress and support energy-efficient operation."], challenges: ["Motor speed control and soft starting", "Drive trips and parameter errors", "Replacing failed drives on critical equipment"], related: ["variable-frequency-drives", "ac-drives"] },
  { slug: "servo-drive-services", title: "Servo AC/DC Drive Services", short: "Servo system tuning, commissioning and service for precise motion.", body: ["Our team configures and tunes servo motors and drives for positioning, indexing and synchronised motion applications.", "We also support motion controllers, stepper systems and linear and rotary actuators."], challenges: ["Positioning accuracy and repeatability", "Vibration and tuning problems", "Multi-axis coordination"], related: ["servos", "motion-controllers", "stepper-motors"] },
  { slug: "factory-automation", title: "Factory Automation & System Integration", short: "Turnkey automation: electrical design, panels, software and commissioning.", body: ["From system retrofits to greenfield deployments, DICS provides end-to-end project execution — electrical design, panel fabrication, software development, field commissioning and lifecycle support.", "Solutions combine PLC, HMI, SCADA, motion control, sensors and instrumentation into one working system."], challenges: ["Connecting islands of automation", "Limited in-house engineering bandwidth", "Delivering upgrades within tight shutdown windows"], related: ["automation-systems", "scada", "busbar"] },
  { slug: "robotics", title: "Robotics", short: "Robot application support for handling, assembly and inspection.", body: ["DICS supports robotics deployment including articulated, SCARA, collaborative and mobile robots, together with machine vision for inspection and guidance.", "We help define the application, integrate the robot with machine controls and commission the cell."], challenges: ["Repetitive manual handling", "Consistent quality inspection", "Flexible production changeovers"], related: ["robotics", "vision-sensors-machine-vision-systems"] },
  { slug: "smps-services", title: "SMPS Services", short: "Diagnosis and service of switch-mode power supplies.", body: ["Switch-mode power supplies keep controllers, sensors and HMIs running. DICS diagnoses power supply faults and supports repair or replacement.", "Our test facility in Bangalore supports investigation of product-related issues."], challenges: ["Intermittent control-system resets", "Failed power supplies in panels", "Electrical noise and voltage issues"], related: ["control-components"] },
  { slug: "operator-panel-services", title: "Operator Panel Services", short: "Repair, replacement and upgrade of operator panels and interfaces.", body: ["We support operator panels, pushbutton stations and signalling devices that operators rely on every shift.", "This includes replacement of obsolete panels, emergency stop and interlock devices, and visual signalling."], challenges: ["Worn or damaged operator stations", "Safety device upgrades", "Unclear machine status indication"], related: ["switches", "patlite"] },
];

export type Industry = { slug: string; name: string; image?: string; text: string };
/** Sectors named on dicsglobal.com/about-us. */
export const industries: Industry[] = [
  { slug: "automobile", name: "Automobile", image: indAuto, text: "Body shop, assembly and test lines that depend on PLCs, servo motion, robotics and reliable sensing." },
  { slug: "food-pharma", name: "Food & Pharma", image: indPharma, text: "Hygienic processing and packaging lines requiring accurate temperature control, vision inspection and traceability." },
  { slug: "printing-packaging", name: "Printing & Packaging", image: indFood, text: "High-speed machines needing synchronised motion, registration sensing and dependable drives." },
  { slug: "power-solar", name: "Power & Solar", image: indWater, text: "Instrumentation, power distribution and monitoring for generation and utility installations." },
  { slug: "material-handling", name: "Material Handling", image: heroPlant, text: "Conveyors and logistics systems using VFDs, encoders, proximity sensors and safety components." },
  { slug: "hoist-crane", name: "Hoist & Crane", text: "Drive control, limit switches and signalling for safe lifting operations." },
  { slug: "textile", name: "Textile", text: "Speed, tension and temperature control across spinning, weaving and processing machines." },
  { slug: "steel", name: "Steel", text: "Rugged instrumentation, drives and controls for demanding plant environments." },
  { slug: "semiconductor", name: "Semiconductor", text: "Precision motion, displacement measurement and clean signalling for sensitive processes." },
  { slug: "elevator", name: "Elevator", text: "Drives, controllers and safety devices for vertical transportation systems." },
];

export const images = { heroPlant, controlPanel };

export const featuredCategorySlugs = [
  "automation-systems",
  "ac-drives",
  "busbar",
  "control-components",
  "instrumentation",
  "motion-controller",
  "robotics",
  "sensors-switches",
  "ups-servo-stabilizers",
  "patlite",
  "switches",
];
