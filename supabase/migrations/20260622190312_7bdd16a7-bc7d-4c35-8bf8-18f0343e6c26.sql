CREATE TABLE public.products (
  id text PRIMARY KEY,
  name text NOT NULL,
  collection_slug text NOT NULL,
  category text NOT NULL,
  price integer NOT NULL DEFAULT 0,
  original_price integer NOT NULL DEFAULT 0,
  fabric text NOT NULL DEFAULT '',
  colors jsonb NOT NULL DEFAULT '[]'::jsonb,
  image text NOT NULL DEFAULT '',
  gallery jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_best_seller boolean NOT NULL DEFAULT false,
  description text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read products"
  ON public.products
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER products_set_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_products_collection_slug ON public.products (collection_slug);
CREATE INDEX idx_products_category ON public.products (category);