import { queryOptions } from "@tanstack/react-query";
import { listProducts } from "./products.functions";
import { rowToProduct, type Product } from "@/data/products";

export const productsQueryOptions = queryOptions({
  queryKey: ["products"],
  queryFn: async (): Promise<Product[]> => {
    const rows = await listProducts();
    return rows.map(rowToProduct);
  },
  staleTime: 60_000,
});
