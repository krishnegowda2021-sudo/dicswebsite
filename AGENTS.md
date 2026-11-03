<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Imported app architecture
- Catalogue data lives in src/data/*.json, exported from the live WooCommerce Store API; regenerate rather than hand-edit, so it stays the source of truth.
- Storefront taxonomy and representative-image corrections live in a browser-safe presentation layer over the untouched WooCommerce export, so verified family separation can be maintained without altering source data or losing legacy slug lookup.
- Resolve catalogue CDN pointer paths through the shared public asset-origin helper; external hosts cannot serve Lovable's host-relative asset endpoint.
- Brand artwork is static CDN-backed media referenced in the shared brand catalogue and rendered by BrandLogo; resolve pointers through the public asset-origin helper so logos also work on external deployments.
- Page URLs mirror the old WordPress site (/product/<slug>, /product-category/<path>, /about-us, /contact-us) so links and SEO carry over; old paths that changed get redirect routes.
- Enquiries go through a validated server function into the enquiries table (insert-only for visitors) — never write to it from the browser.
- After storing an enquiry, notify through the existing FormSubmit service with the request's real origin/referrer; report notification failures instead of claiming email delivery.
- Careers listings and validation live in a browser-safe module; applications are stored through a validated server function with insert-only visitor access, while résumés use private email rather than public uploads.

- Keep this project’s generated Cloud clients and migration history separate from imported source configuration to avoid connecting to the original app’s private data.
- Public insert-only submission clients fall back to the project's compiled VITE public configuration when server bindings are absent, so external deployments retain submission access without embedding private credentials.
