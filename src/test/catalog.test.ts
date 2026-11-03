import { describe, expect, it } from "vitest";
import { childrenOf, getCategory, productsIn, searchProducts } from "@/lib/catalog";

function category(slug: string) {
  const result = getCategory(slug);
  if (!result) throw new Error(`Missing category: ${slug}`);
  return result;
}

describe("Manufacturer drive and servo separation", () => {
  it("shows only Fuji FRENIC and Omron 3G3 inverters in AC Drives", () => {
    const list = productsIn(category("ac-drives"));
    expect(list).toHaveLength(9);
    expect(list.filter((p) => p.brand === "Fuji Electric")).toHaveLength(6);
    expect(list.filter((p) => p.brand === "OMRON").map((p) => p.name).sort()).toEqual(["3G3MX2-V1", "3G3RX V1", "3G3RX2"]);
    expect(list.some((p) => /R88|ALPHA|servo/i.test(p.name))).toBe(false);
    expect(searchProducts({ category: "ac-drives", brand: "OMRON" })).toHaveLength(3);
  });

  it("shows Fuji and Omron servo systems under Motion Controller instead of AC Drives", () => {
    const children = childrenOf(category("motion-controller")).map((c) => c.slug);
    expect(children).toContain("fuji-electric-servo-system");
    expect(children).toContain("omron-servomotors-servo-drivers");
    const motion = productsIn(category("motion-controller"));
    expect(motion.filter((p) => p.categories.includes("fuji-electric-servo-system"))).toHaveLength(2);
    expect(motion.filter((p) => p.categories.includes("omron-servomotors-servo-drivers"))).toHaveLength(10);
    expect(motion.some((p) => /FRENIC|3G3/.test(p.name))).toBe(false);
  });

  it("keeps AC drive navigation limited to the two inverter manufacturers", () => {
    expect(childrenOf(category("ac-drives")).map((c) => c.slug)).toEqual(["fuji-drives-inverters", "omron-drives-inverters"]);
    expect(productsIn(category("variable-frequency-drives"))).toHaveLength(9);
    expect(productsIn(category("servos"))).toHaveLength(12);
  });
});