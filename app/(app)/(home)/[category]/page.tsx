import { ProductFilters } from "@/modules/products/ui/components/product-filters";
import {
  ProductList,
  ProductListSkeleton,
} from "@/modules/products/ui/components/product-list";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import type { SearchParams } from "nuqs/server";
import { loadProductFilters } from "@/modules/products/search-params";
import { ProductsSort } from "@/modules/products/ui/components/product-sort";

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<SearchParams>;
}
export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const filters = await loadProductFilters(searchParams);

  console.log(filters, "server");

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({ category, ...filters })
  );

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="px-4 lg:px-12 py-8 flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-y-0 justify-between">
            <p className="text font-medim">Curated for you</p>
            <ProductsSort />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12">
            <div className="lg:col-span-2 xl:col-span-2">
              <ProductFilters />
            </div>
            <div className="lg:col-span-4 xl:col-span-6">
              <Suspense fallback={<ProductListSkeleton />}>
                <ProductList category={category} />
              </Suspense>
            </div>
          </div>
        </div>
      </HydrationBoundary>
    </div>
  );
}
