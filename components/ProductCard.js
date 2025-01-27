const ProductCard = ({ product }) => {
    return (
      <div className="border rounded-lg p-4">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p>{product.description}</p>
        <p className="text-xl font-semibold">${product.price}</p>
        <a href={`/products/${product.id}`} className="text-blue-500">View Details</a>
      </div>
    );
  };
  
  export default ProductCard;