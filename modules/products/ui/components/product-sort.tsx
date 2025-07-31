"use client";

import { Button } from "@/components/ui/button";
import { useProductFilters } from "../../search-params";
import { cn } from "@/lib/utils";

export const ProductsSort = () => {
  const [filters, setFilters] = useProductFilters();
  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="reverse"
        className={cn(
          "rounded-md bg-lime-500",
          filters.sort !== "curated" &&
            "bg-white border-transparent hover:border-border"
        )}
        onClick={() => setFilters({ sort: "curated" })}
      >
        Curated
      </Button>

      <Button
        size="sm"
        variant="reverse"
        className={cn(
          "rounded-md bg-lime-500",
          filters.sort !== "trending" &&
            "bg-white border-transparent hover:border-border"
        )}
        onClick={() => setFilters({ sort: "trending" })}
      >
        Trending
      </Button>

      <Button
        size="sm"
        variant="reverse"
        className={cn(
          "rounded-md bg-lime-500",
          filters.sort !== "hot_and_new" &&
            "bg-white border-transparent hover:border-border"
        )}
        onClick={() => setFilters({ sort: "hot_and_new" })}
      >
        Hot and New
      </Button>
    </div>
  );
};
