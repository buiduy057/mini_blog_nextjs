import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProductsList from "./products-list";

async function getProducts() {
  const res = await fetch("/api/products", {
    next: { revalidate: 60 }, // SSG + ISR
  });
  return res.json();
}
export default async function Post() {
  const queryClient = new QueryClient();

  // Prefetch ở server → React Query không phải loading
  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: getProducts,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsList />
    </HydrationBoundary>
  );
}
