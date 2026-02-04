interface ProductCardProps {
  title: string;
  image: string;
  href?: string;
}

const ProductCard = ({ title, image, href = "#" }: ProductCardProps) => {
  return (
    <a href={href} className="product-card group block">
      <div className="product-card-image overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="product-card-content">
        <h3 className="product-card-title text-sm md:text-base">{title}</h3>
      </div>
    </a>
  );
};

export default ProductCard;
