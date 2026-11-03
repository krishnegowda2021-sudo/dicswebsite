import { createFileRoute, redirect } from "@tanstack/react-router";

// Preserves old WordPress service URLs (/service/plc-services/).
export const Route = createFileRoute("/service/$slug")({
  beforeLoad: ({ params }) => { throw redirect({ to: "/services/$slug", params: { slug: params.slug }, statusCode: 301 }); },
});
