import photo0 from "@/assets/catalog/product-7027.jpg.asset.json";
import photo1 from "@/assets/catalog/product-7025.jpg.asset.json";
import photo2 from "@/assets/catalog/product-7023.jpg.asset.json";
import photo3 from "@/assets/catalog/product-7021.jpg.asset.json";
import photo4 from "@/assets/catalog/product-7019.jpg.asset.json";
import photo5 from "@/assets/catalog/product-7017.jpg.asset.json";
import photo6 from "@/assets/catalog/product-7015.jpg.asset.json";
import photo7 from "@/assets/catalog/product-7013.jpg.asset.json";
import photo8 from "@/assets/catalog/product-6510.jpg.asset.json";
import photo9 from "@/assets/catalog/product-6508.jpg.asset.json";
import photo10 from "@/assets/catalog/product-6490.jpg.asset.json";
import photo11 from "@/assets/catalog/product-6432.jpg.asset.json";
import photo12 from "@/assets/catalog/product-6428.jpg.asset.json";
import photo13 from "@/assets/catalog/product-6424.jpg.asset.json";
import photo14 from "@/assets/catalog/product-6421.jpg.asset.json";
import photo15 from "@/assets/catalog/product-6417.jpg.asset.json";
import photo16 from "@/assets/catalog/product-6413.jpg.asset.json";
import photo17 from "@/assets/catalog/product-6407.jpg.asset.json";
import photo18 from "@/assets/catalog/product-6404.jpg.asset.json";
import photo19 from "@/assets/catalog/product-6402.jpg.asset.json";
import photo20 from "@/assets/catalog/product-6400.jpg.asset.json";
import { catalogAssetUrl } from "./catalog-asset-url";

// Matched source product photos, hosted locally to avoid WordPress image failures.
const productAssets = {
  "fuji-frenic-solar-pump-controller-mini": photo0,
  "fuji-frenic-lift-lm1s": photo1,
  "fuji-frenic-ehvac-specialized-application-inverters-fanpump-inverter": photo2,
  "fuji-franic-mega": photo3,
  "fuji-franic-ace": photo4,
  "fuji-frenic-mini": photo5,
  "fuji-alpha5-smart": photo6,
  "fuji-alpha7": photo7,
  "omron-high-function-general-purpose-inverters-3g3rx-v1": photo8,
  "omron-high-function-general-purpose-inverters-3g3rx2": photo9,
  "omron-multi-function-compact-inverter-3g3mx2-v1": photo10,
  "omron-g5-series-pulse-train-input-type-ac-servomotors-servo-drives-r88m-ker88d-kp": photo11,
  "omron-ac-servomotors-and-smartstep-2-series-servo-drives-with-pulse-string-inputs-r88m-gr7d-bp": photo12,
  "omron-g-series-ac-servomotors-servo-drives-with-general-purpose-pulse-string-or-analog-inputs-r88m-gr88d-gt": photo13,
  "omron-g-series-ac-servomotors-servo-drives-with-built-in-mechatrolink-ii-communications-r88m-gr88d-gn-ml2": photo14,
  "omron-g5-series-ac-servomotors-servo-drives-with-general-purpose-pulse-train-or-analog-inputs-r88m-kr88d-kt": photo15,
  "omron-g5-series-ac-servomotors-servo-drives-with-built-in-mechatrolink-ii-communications-r88m-kr88d-kn-ml2": photo16,
  "omron-g5-series-linear-motor-servo-drives-with-built-in-ethercat-communications-linear-motor-type-r88l-ecr88d-kn-ect-l": photo17,
  "omron-g5-series-ac-servomotor-servo-drives-with-built-in-ethercat-communications-r88m-kr88d-kn-ect": photo18,
  "omron-c-servo-system-1s-series-r88m-1-r88d-1sn-ect": photo19,
  "omron-c-servo-system-1s-series-with-safety-functionality-r88m-1a-r88d-1san-ect": photo20,
};

export const productImages: Record<string, string> = Object.fromEntries(
  Object.entries(productAssets).map(([slug, asset]) => [slug, catalogAssetUrl(asset)]),
);
