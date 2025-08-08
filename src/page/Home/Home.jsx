import React from "react";
import BannerCarousel from "../../Components/BannerCarousel/BannerCarousel";
import CategorySection from "../../Components/CategorySection/CategorySection";
import Promosection from "../../Components/PromoSection/Promosection";
import ProductsSection from "../../Components/ProductsSection/ProductsSection";

export default function Home() {
  return (
    <div className="space-y-2 pb-12 dark:!bg-[#141414]">
      <div className="dark:!bg-[#141414]">
        <BannerCarousel />
        <CategorySection />
        <Promosection />
        <ProductsSection />
      </div>
    </div>
  );
}
