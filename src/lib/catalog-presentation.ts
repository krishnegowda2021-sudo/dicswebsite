import fujiInverter from "@/assets/catalog/fuji-frenic-mini.jpg.asset.json";
import omronInverter from "@/assets/catalog/omron-rx2-inverter.jpg.asset.json";
import fujiServo from "@/assets/catalog/fuji-alpha5-servo.jpg.asset.json";
import omronServo from "@/assets/catalog/omron-1s-servo.jpg.asset.json";
import stackLight from "@/assets/catalog/patlite-lr6-direct-mount.jpg.asset.json";
import { catalogAssetUrl } from "./catalog-asset-url";

/** Display-only corrections: leave the WooCommerce export unchanged.
 * Families verified against Omron RX2/MX2 and G5/1S documentation,
 * Fuji FRENIC and ALPHA5 documentation, and PATLITE LR6 documentation.
 */
export const categoryPresentation: Record<string, { parentSlug?: string; name?: string; image?: string }> = {
  "ac-drives": { image: catalogAssetUrl(omronInverter) },
  "fuji-drives-inverters": { parentSlug: "ac-drives", image: catalogAssetUrl(fujiInverter) },
  "omron-drives-inverters": { parentSlug: "ac-drives", image: catalogAssetUrl(omronInverter) },
  "brushless-motors": { parentSlug: "motion-controller" },
  "stepper-motors": { parentSlug: "motion-controller" },
  "fuji-electric-servo-system": { parentSlug: "motion-controller", image: catalogAssetUrl(fujiServo) },
  "omron-servomotors-servo-drivers": { parentSlug: "motion-controller", image: catalogAssetUrl(omronServo) },
  "servos": { image: catalogAssetUrl(omronServo) },
  "patlite": { name: "Tower Lamps & Signalling", image: catalogAssetUrl(stackLight) },
  "signal-tower": { image: catalogAssetUrl(stackLight) },
};

export const driveCategorySlugs = new Set(["ac-drives", "variable-frequency-drives", "fuji-drives-inverters", "omron-drives-inverters"]);
export const inverterBrandCategories = ["fuji-drives-inverters", "omron-drives-inverters"];
export const servoBrandCategories = ["fuji-electric-servo-system", "omron-servomotors-servo-drivers"];