import ProductGrid from "./ProductGrid";
import React, { useEffect } from 'react';
import loading from '../assets/img/loading.jpg';
import { webScrape } from "@/services/Scrape";

export default function ProductSearch() {
    const [isDataLoaded, setIsDataLoaded] = React.useState(false);
    const [productData, setProductData] = React.useState({});

    useEffect(() => {
        const fetchData = async () => {
          const response = await webScrape();
 
          setProductData(response);
          setIsDataLoaded(true);
        };
        fetchData();
    }, []);

    if (!isDataLoaded) {
        return (
        <div className="w-full h-full overflow-hidden">
            <div className="h-full overflow-y-auto scrollbar-hide py-3 px-5">
            <div className='flex flex-col items-center justify-center h-full'>
                <img
                src={loading}
                alt="Image"
                className="animate-spin w-16 h-16 mb-4"
                />
                <p className='text-gray-500 pt-5'>Hang tight! We’re getting things ready for you...</p>
            </div>
            </div>
        </div>
        );
    }

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="h-full overflow-y-auto scrollbar-hide py-3 px-5">
        <ProductGrid data={productData}/>
      </div>
    </div>
  )
}
