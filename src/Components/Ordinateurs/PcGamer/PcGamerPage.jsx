import React from 'react';
import PcGamerFilter from './PcGamerFilter';

import PcGamerList from './PcGamerList';


const PcGamerPage = () => {
  const products = [
    { id: 1, name: "Gaming PC 1", price: 9999, image_url: "..." },
    { id: 2, name: "Gaming PC 2", price: 12999, image_url: "..." },
   
  ];

  return (
    <div className="flex py-6 px-2 dark:bg-[#141414] flex-col md:flex-row">
      <PcGamerFilter />
      <div className="flex-1 px-4">
      
        <PcGamerList products={products} /> 
      </div>
    </div>
  );
};

export default PcGamerPage;
