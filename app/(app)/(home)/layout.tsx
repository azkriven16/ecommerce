import { PropsWithChildren, Suspense } from "react";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { SearchFilters, SearchFiltersLoading } from "./search-filters";

export default async function Layout({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersLoading />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
