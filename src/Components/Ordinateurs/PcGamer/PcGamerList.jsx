import PcGamerCard from './PcGamerCard';

const PcGamerList = ({ products }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
      {products.map(product => (
        <PcGamerCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default PcGamerList;
