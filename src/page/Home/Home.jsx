import React, { useState } from "react";
import BannerCarousel from "../../Components/BannerCarousel/BannerCarousel";
import CategorySection from "../../Components/CategorySection/CategorySection";
import Promosection from "../../Components/PromoSection/Promosection";
import ProductsSection from "../../Components/ProductsSection/ProductsSection";
import ProductDetails from "../../Components/Shared/ProductDetails";


export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductDetails, setShowProductDetails] = useState(false);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  const handleCloseDetails = () => {
    setShowProductDetails(false);
    setSelectedProduct(null);
  };

  if (showProductDetails && selectedProduct) {
    return (
      <ProductDetails 
        productId={selectedProduct.id}
        onClose={handleCloseDetails}
      />
    );
  }

  return (
    <div className="space-y-2 pb-12 dark:!bg-[#141414]">
      <div className="dark:!bg-[#141414]">
        <BannerCarousel />
        <CategorySection />
        <Promosection />
        <ProductsSection onViewDetails={handleViewDetails} />
      </div>
    </div>
  );
}