import { Category } from "@/payload-types";
import { CategoryDropdown } from "./category-dropdown";

interface CategoriesProps {
  data: Category[];
}

export const Categories = ({ data }: CategoriesProps) => {
  return (
    <div className="relative w-full">
      <div className="flex flex-nowrap items-center gap-2">
        {data.map((category: Category) => {
          return (
            <div key={category.id}>
              <CategoryDropdown
                category={category}
                isActive={false}
                isNavigationHovered={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
