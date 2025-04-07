import { useState } from 'react';
import './css/ProductGrid.css';

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

  return (
    <div className="product-grid-container">
      <div className="category-filter">
        <label htmlFor="category-select">Filter by Category:</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product, index) => (
          <div key={index} className="product-card">
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
              <div className="product-info">
                <h3 className="product-title">{product.Name}</h3>
                <p className="product-price">{product.Price}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}