import { createFileRoute, redirect } from "@tanstack/react-router";

// Preserves the old WooCommerce shop URL.
export const Route = createFileRoute("/shop")({
  beforeLoad: () => { throw redirect({ to: "/products", statusCode: 301 }); },
});
