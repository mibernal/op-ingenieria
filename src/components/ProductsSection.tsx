import ProductCard from "./ProductCard";
import cargadorImg from "@/assets/product-cargador.jpg";
import reguladorImg from "@/assets/product-regulador.jpg";
import planta30Img from "@/assets/product-planta30.jpg";
import planta20Img from "@/assets/product-planta20.jpg";

const products = [
  {
    title: "Cargador de Alta Frecuencia 48Vcc-3200W",
    image: cargadorImg,
    href: "#productos",
  },
  {
    title: "Regulador Trifásico 30kVA",
    image: reguladorImg,
    href: "#productos",
  },
  {
    title: "Planta Eléctrica 30KW",
    image: planta30Img,
    href: "#productos",
  },
  {
    title: "Planta Eléctrica 20KW",
    image: planta20Img,
    href: "#productos",
  },
];

const ProductsSection = () => {
  return (
    <section id="productos" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-12">Nuestros Productos</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <div
              key={product.title}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
