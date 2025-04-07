"use client";

import { useState } from 'react';
import './css/ProductGrid.css';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Product {
  Name: string;
  Price: string;
  URL: string;
  Image_URL: string;
}

interface CategoryData {
  Category: string;
  Products: Product[];
}

interface ProductGridProps {
  data: {
    Result: CategoryData[];
  };
}

export default function ProductGrid({ data }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const categories = data.Result.map(item => item.Category);
  const getFilteredProducts = (): Product[] => {
    if (selectedCategory === 'all') {
      return data.Result.flatMap(category => category.Products);
    }
    const category = data.Result.find(cat => cat.Category === selectedCategory);
    return category ? category.Products : [];
  };
  const filteredProducts = getFilteredProducts();
  const formatImageUrl = (url: string) => {
    return url.startsWith('//') ? `https:${url}` : url;
  };
  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="product-grid-container">
      <div className="category-filter">
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-2">
              {selectedCategory === 'all' ? 'All Categories' : formatCategoryName(selectedCategory)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Product Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup 
              value={selectedCategory} 
              onValueChange={setSelectedCategory}
            >
              <DropdownMenuRadioItem value="all">All Categories</DropdownMenuRadioItem>
              {categories.map((category) => (
                <DropdownMenuRadioItem key={category} value={category}>
                  {formatCategoryName(category)}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product, index) => (
          <div key={index} className="product-card cursor-pointer">
            <a href={product.URL} target="_blank" rel="noopener noreferrer">
              <div className="product-image-container">
                <img 
                  src={formatImageUrl(product.Image_URL)} 
                  alt={product.Name} 
                  className="product-image"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Image+Not+Available';
                  }}
                />
              </div>
            </a>
              <div className="product-info">
                <h3 className="product-title">{product.Name}</h3>
                <p className="product-price text-blue-800">{product.Price}</p>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}