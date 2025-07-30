import {
  ProductList,
  ProductListSkeleton,
} from "@/modules/products/ui/components/product-list";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  params: Promise<{ subCategory: string }>;
}
export default async function SubCategoryPage({ params }: Props) {
  const { subCategory } = await params;

  const queryClient = getQueryClient();

  // Prefetch with category filter
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({ category: subCategory })
  );

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList category={subCategory} />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
