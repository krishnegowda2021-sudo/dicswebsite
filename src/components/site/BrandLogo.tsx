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
      width={224}
      height={80}
      loading={loading}
      className="h-20 w-56 max-w-full object-contain"
    />
  );
}