const PcGamerCard = ({ product }) => {
  return (
    <div className="border rounded p-4 shadow-sm hover:shadow-md">
      <img src={product.image_url} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.price} MAD</p>
      {/* bouton d’ajout panier, lien détails, etc. */}
    </div>
  );
};

export default PcGamerCard;
