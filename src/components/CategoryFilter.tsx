
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  className?: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  className,
}) => {
  return (
    <div className={cn("flex flex-wrap gap-2 pb-6", className)}>
      <Button
        variant={selectedCategory === "all" ? "default" : "outline"}
        className={cn(
          selectedCategory === "all" 
            ? "bg-primary text-primary-foreground" 
            : "bg-background/50 border-border/50 text-muted-foreground hover:text-foreground",
          "rounded-full text-sm"
        )}
        onClick={() => onSelectCategory("all")}
      >
        Toutes les vidéos
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          className={cn(
            selectedCategory === category.id 
              ? "bg-primary text-primary-foreground" 
              : "bg-background/50 border-border/50 text-muted-foreground hover:text-foreground",
            "rounded-full text-sm"
          )}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
