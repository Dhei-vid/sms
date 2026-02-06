"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Icon } from "@/components/general/huge-icon";
import { cn } from "@/lib/utils";

export interface Category {
  id: string;
  label: string;
  icon: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  className?: string;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  className,
}: CategoryFilterProps) {
  return (
    <div className={cn("grid grid-cols-4 gap-3", className)}>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "rounded-md px-4 py-2 flex items-center gap-2 h-18",
            selectedCategory === category.id
              ? "bg-main-blue text-white hover:bg-main-blue/90"
              : "bg-white hover:bg-gray-50",
          )}
        >
          <Image
            width={30}
            height={30}
            src={category.icon}
            alt={"icon"}
            className="object-cover"
          />
          <span>{category.label}</span>
        </Button>
      ))}
    </div>
  );
}
