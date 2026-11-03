import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/our-brand")({
  beforeLoad: () => { throw redirect({ to: "/our-brands", statusCode: 301 }); },
});
