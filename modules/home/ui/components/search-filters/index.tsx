"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Categories } from "./categories";
import { SearchInput } from "./search-input";
import { useParams } from "next/navigation";
import { DEFAULT_BG_COLOR } from "@/modules/home/constants";
import { BreadcrumbNavigation } from "./breadcrumb-navigation";

export const SearchFilters = () => {
  const trpc = useTRPC();
  const params = useParams();
  const categoryParam = params.category as string | undefined;
  const activeCategory = categoryParam || "all";

  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  const activeCategoryData = data.find(
    (category) => category.slug === activeCategory
  );
  // const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR;
  const activeCategoryName = activeCategoryData?.name || null;

  const activeSubCategory = params.subcategory as string | undefined;

  const activeSubCategoryName =
    activeCategoryData?.subcategories?.find(
      (subcategory) => subcategory.slug === activeSubCategory
    )?.name || null;

  console.log(activeCategoryName, "1");
  console.log(activeSubCategoryName, "3");

  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{
        backgroundColor: DEFAULT_BG_COLOR,
      }}
    >
      <SearchInput />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
      <BreadcrumbNavigation
        activeCategoryName={activeCategoryName}
        activeCategory={activeCategory}
        activeSubCategoryName={activeSubCategoryName}
      />
    </div>
  );
};

export const SearchFiltersLoading = () => {
  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{
        backgroundColor: "#f5f5f5",
      }}
    >
      <SearchInput disabled={true} />
      <div className="hidden lg:block">
        <div className="h-11"></div>
      </div>
    </div>
  );
};
