# Self-Service Product Management

Right now every product is hard-coded in `src/data/products.ts`, so changing the catalog requires a developer. This plan adds a real backend (database + image storage) and a simple password-protected admin area, then switches the storefront to read live data — so your client can manage items with no code.

## What your client gets

- A private **Admin** page (`/admin`) protected by a single password.
- Add a new product: name, category/collection, price, original price, fabric, colours, description, "best seller" toggle, and **photo upload**.
- Edit or delete any existing product.
- Changes appear instantly on the live site (catalog, collections, product pages, best sellers).

> Note: adding a product needs a photo, so I'm including image upload even though it wasn't ticked — without it new items can't have pictures. If you'd rather have admins reuse the existing bundled images instead of uploading, tell me and I'll swap that part.

## How it works

```text
Client → /admin (enter password) → add/edit/delete product + upload photo
                                          │
                                   Lovable Cloud
                              ┌───────────┴───────────┐
                         products table        image storage
                                          │
Visitors → catalog / collections / product pages  ← live data
```

## Build steps

### 1. Enable Lovable Cloud
Provision the managed database + file storage (no external accounts).

### 2. Database
Create a `products` table mirroring today's product shape:
`id`, `name`, `collection_slug`, `category`, `price`, `original_price`, `fabric`, `colors` (JSON list of `{name,hex}`), `image`, `gallery` (JSON list), `is_best_seller`, `description`, `created_at`.

Security:
- Public read access (so the storefront can show products to everyone).
- Writes (insert/update/delete) only allowed from trusted server code used by the admin — never from the browser directly.

### 3. Import existing products
A one-time seed migration loads all the currently generated items into the table, so the catalog stays full from day one. Collections stay defined in code (the `collectionSlug` links products to them).

### 4. Image storage
Create a public storage bucket for product photos. The admin upload saves the file and stores its URL on the product.

### 5. Admin login (single password)
- Generate a secure admin password (stored as a secret, not in code).
- A server check validates the entered password and issues a short-lived signed session token kept in the browser.
- All add/edit/delete actions require a valid token, so the public can't modify data.
- I'll share the generated password with you after setup; it can be changed anytime.

### 6. Admin panel (`/admin`)
- Password screen, then a product list with Search.
- "Add product" and "Edit" forms with validation (required fields, numeric prices, at least one colour, one image).
- Delete with confirmation.

### 7. Switch storefront to live data
Update the catalog, collection, product detail, and home best-seller sections to read from the database instead of the static array. Helper functions (`formatPrice`, related-products logic, filtering/sorting) are preserved; only the data source changes.

## Technical details

- **Stack fit:** Reads use a public server function (publishable key, read-only) called from route loaders with TanStack Query; writes use server functions guarded by the admin session token. No business logic in the browser.
- **Colours/gallery** stored as JSON columns to match the existing `Product` interface, so the UI components need minimal changes.
- **`src/data/products.ts`** keeps its `Product` type, `formatPrice`, and pure helpers (`getRelatedProducts` logic) but no longer hard-codes the array; collections remain in `src/data/collections.ts`.
- **Admin auth** is intentionally lightweight (one shared password + signed token). If you later want individual staff logins, we can upgrade to full accounts without redoing the catalog.
- **Validation** with zod on both the form and the server before writing.

## Out of scope (unless you want it)
- Managing collections from the admin (they stay code-defined for now).
- Multiple staff accounts / roles.
- Orders or checkout (site stays WhatsApp-enquiry based).

After you approve, I'll set up Cloud, build the admin area, import your products, and verify the storefront reads live data.