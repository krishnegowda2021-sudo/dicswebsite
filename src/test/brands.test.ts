import { describe, expect, it } from "vitest";
import { brands } from "@/lib/site";

describe("Manufacturer sequence", () => {
  it("keeps the requested eight manufacturers in exact order", () => {
    expect(brands.map((brand) => brand.slug)).toEqual(["fuji-electric", "omron", "pro-face", "autonics", "ckd", "wohner", "idec", "patlite"]);
  });
});