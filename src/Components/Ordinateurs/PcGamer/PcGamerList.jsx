import PcGamerCard from './PcGamerCard';

const PcGamerList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <PcGamerCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default PcGamerList;
