import heroBg from "@/assets/images/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-primary/85" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground mb-6 animate-fade-in">
          O&P INGENIERIA SAS
        </h1>
        <p className="text-base md:text-lg text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Somos una empresa líder en proveer soluciones integrales desarrollando ingeniería y ejecutando proyectos, 
          comercializando productos eléctricos, electromecánicos, acumuladores de energía, de iluminación e instrumentación, 
          tableros eléctricos, telecomunicaciones, sistemas de energía fotovoltaica, así como prestadora de servicios de 
          mantenimientos e instalaciones. Brindamos soluciones integrales para el logro de la satisfacción de nuestros clientes, 
          a través de la diferenciación, innovación, calidad en nuestros productos y servicios, generando valor en todas nuestras 
          acciones, promoviendo las relaciones de beneficio mutuo para sus clientes, accionistas y proveedores.
        </p>
      </div>
    </section>
  );
};

export default Hero;
