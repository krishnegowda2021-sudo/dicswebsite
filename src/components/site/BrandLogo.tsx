type BrandLogoProps = {
  brand: { name: string; logo: string };
  loading?: "eager" | "lazy";
};

/** Fixed artwork area keeps manufacturers' original proportions intact. */
export function BrandLogo({ brand, loading = "lazy" }: BrandLogoProps) {
  return (
    <img
      src={brand.logo}
      alt={`${brand.name} logo`}
      width={160}
      height={56}
      loading={loading}
      className="h-14 w-40 max-w-full object-contain"
    />
  );
}